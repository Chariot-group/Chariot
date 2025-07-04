// stripe.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import Stripe from 'stripe';
import { User, UserDocument } from '@/resources/user/schemas/user.schema';
import { UserService } from '@/resources/user/user.service';
import { Model } from 'mongoose';
import { generateRandomPassword } from '@/utils/utils.tools';
import { use } from 'passport';
import { Subscribe } from '../user/schemas/subscribe/subscribe.schema';

@Injectable()
export class StripeService {

    constructor(
        private readonly userService: UserService,
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) { }

    private readonly SERVICE_NAME = StripeService.name;
    private readonly logger = new Logger(this.SERVICE_NAME);

    private stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2025-05-28.basil',
    });

    verifySignature(payload: Buffer, signature: string): Stripe.Event {
        return this.stripe.webhooks.constructEvent(
            payload,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET,
        );
    }

    async handleEvent(event: Stripe.Event) {
        switch (event.type) {
            case 'customer.subscription.created': {
                const sub = event.data.object as Stripe.Subscription;

                const customer = await this.stripe.customers.retrieve(sub.customer.toString()) as Stripe.Customer;
                let user = await this.userService.findByEmail(customer.email);
                if (!user) {
                    user = await this.userService.create({
                        email: customer.email,
                        username: customer.name,
                        campaigns: [],
                        password: generateRandomPassword(),
                    }).then(user => user.data);
                }

                let item: Stripe.SubscriptionItem = sub.items.data[0];

                user.subscriptions.push({
                    id: sub.id,
                    expired_at: new Date(item.current_period_end * 1000),
                    started_at: new Date(item.current_period_start * 1000),
                    productId: item.price.product.toString(),
                    priceId: item.price.id
                });

                await user.save();

                this.logger.verbose(`🆕 Abonnement créé pour l'utilisateur : ${user.email}`, this.SERVICE_NAME);
                break;
            }

            case 'invoice.paid': {
                const invoice = event.data.object as Stripe.Invoice;
                this.logger.verbose('💰 Paiement reçu pour abonnement : ' + invoice.account_name, this.SERVICE_NAME);
                break;
            }


            /**
             * 2. Abonnement mis à jour (changement de plan / période)
             * - Mise à jour du plan et de la périodicité uniquement
             * - La mise à jour de la date de fin se fait uniquement à la validation du paiement (`invoice.paid`)
             */
            case 'customer.subscription.updated': {
                const sub = event.data.object as Stripe.Subscription;
                const previous = (event as any).previous_attributes;

                if (!previous?.items) break;

                const oldItem: Stripe.SubscriptionItem = previous.items.data[0];
                const newItem: Stripe.SubscriptionItem = sub.items.data[0];

                if (oldItem.price.id === newItem.price.id) break; // aucun changement

                const customer = await this.stripe.customers.retrieve(sub.customer.toString()) as Stripe.Customer;
                let user = await this.userService.findByEmail(customer.email);

                // Archiver l'abonnement précédent
                user.subscriptions = user.subscriptions.map((s) =>
                    s.id === sub.id
                        ? { ...s, expired_at: new Date() }
                        : s
                );

                // Ajouter le nouveau plan comme nouvel abonnement
                user.subscriptions.push({
                    id: sub.id,
                    priceId: newItem.price.id,
                    productId: newItem.price.product.toString(),
                    started_at: new Date(newItem.current_period_start * 1000),
                    expired_at: new Date(newItem.current_period_end * 1000)
                });

                await user.save();
                this.logger.verbose(`🔄 Plan mis à jour pour ${user.email}`, this.SERVICE_NAME);
                break;
            }

            default:
                this.logger.error(`📦 Event non géré : ${event.type}`, null, this.SERVICE_NAME);
                return;
        }
    }
}