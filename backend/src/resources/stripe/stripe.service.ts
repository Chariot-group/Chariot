// stripe.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import Stripe from 'stripe';
import { User, UserDocument } from '@/resources/user/schemas/user.schema';
import { UserService } from '@/resources/user/user.service';
import { Model } from 'mongoose';
import { generateRandomPassword } from '@/utils/utils.tools';

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
                        password: generateRandomPassword()
                    }).then(user => user.data);
                }

                this.logger.verbose(`🆕 Abonnement créé pour l'utilisateur : ${user.email}`, this.SERVICE_NAME);
                break;
            }

            case 'invoice.paid': {
                const invoice = event.data.object as Stripe.Invoice;
                this.logger.verbose('💰 Paiement reçu pour abonnement : ' + invoice.account_name, this.SERVICE_NAME);
                break;
            }

            case 'customer.subscription.updated': {
                const updated = event.data.object as Stripe.Subscription;
                this.logger.verbose('🔄 Abonnement mis à jour :' + updated.id, this.SERVICE_NAME);
                break;
            }

            default:
                this.logger.error(`📦 Event non géré : ${event.type}`, null, this.SERVICE_NAME);
                return;
        }
    }
}