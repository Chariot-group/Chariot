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

    async handleEvent(event: Stripe.Event): Promise<void> {
        switch (event.type) {
            case 'checkout.session.completed':
                return this.handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);

            case 'customer.subscription.updated':
                return this.handleSubscriptionUpdated(event.data.object as Stripe.Subscription);

            case 'customer.subscription.created':
                return this.handleSubscriptionCreated(event.data.object as Stripe.Subscription);

            default:
                this.logger.log(`📦 Event non géré : ${event.type}`, this.SERVICE_NAME);
        }
    }

    private async handleCheckoutSessionCompleted(session: Stripe.Checkout.Session): Promise<void> {
        if (session.mode !== 'subscription') return;

        const customerId: string = session.customer as string;
        const subscriptionId: string = session.subscription as string;

        const customer: Stripe.Customer = await this.stripe.customers.retrieve(customerId) as Stripe.Customer;
        let user = await this.userService.findByEmail(customer.email);
        if (!user) {
            user = await this.userService.create({
                email: customer.email,
                username: customer.name,
                campaigns: [],
                password: generateRandomPassword(),

            }).then((user) => user.data);
        }

        const subscription: Stripe.Subscription = await this.stripe.subscriptions.retrieve(subscriptionId);
        const item: Stripe.SubscriptionItem = subscription.items.data[0];

        user.subscriptions.push({
            id: subscription.id,
            productId: item.price.product as string,
            priceId: item.price.id,
            started_at: new Date(item.current_period_start * 1000),
            expired_at: new Date(item.current_period_end * 1000),
        });

        await user.save();
    }

    private async handleSubscriptionUpdated(subscription: Stripe.Subscription): Promise<void> {
        const customerId: string = subscription.customer as string;
        const customer: Stripe.Customer = await this.stripe.customers.retrieve(customerId) as Stripe.Customer;

        const user = await this.userService.findByEmail(customer.email);
        if (!user) return;

        const newSubId = subscription.id;
        const item = subscription.items.data[0];
        const newProductId = item.price.product as string;
        const newPriceId = item.price.id;
        const startedAt = new Date(item.current_period_start * 1000);
        const expiredAt = new Date(item.current_period_end * 1000);

        const isExpired = (date: Date) => date.getTime() < Date.now();

        const activeSubs = user.subscriptions.filter((s) => !isExpired(s.expired_at));
        const existing = user.subscriptions.find((s) => s.id === newSubId);

        if (!existing) {
            if (activeSubs.length > 0) {
                await this.stripe.subscriptions.update(activeSubs[0].id, {
                    cancel_at: Math.floor(startedAt.getTime() / 1000),
                    proration_behavior: 'create_prorations',
                });

                activeSubs[0].expired_at = new Date(); // clôture immédiate
            }

            user.subscriptions.push({
                id: newSubId,
                productId: newProductId,
                priceId: newPriceId,
                started_at: startedAt,
                expired_at: expiredAt,
            });
        } else {
            existing.expired_at = expiredAt;
        }

        await user.save();
    }

    private async handleSubscriptionCreated(subscription: Stripe.Subscription): Promise<void> {
        const customerId = subscription.customer as string;
        const customer: Stripe.Customer = await this.stripe.customers.retrieve(customerId) as Stripe.Customer;

        const user = await this.userService.findByEmail(customer.email);
        if (!user) return;

        const item = subscription.items.data[0];
        const productId = item.price.product as string;
        const priceId = item.price.id;

        user.subscriptions.push({
            id: subscription.id,
            productId,
            priceId,
            started_at: new Date(item.current_period_start * 1000),
            expired_at: new Date(item.current_period_end * 1000),
        });

        await user.save();
    }
}