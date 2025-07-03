// stripe.service.ts
import { Injectable, Logger } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {

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
                this.logger.verbose('🆕 Abonnement créé : ' + sub.id, this.SERVICE_NAME);
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

            case 'customer.subscription.deleted': {
                const deleted = event.data.object as Stripe.Subscription;
                this.logger.verbose('⛔ Abonnement supprimé : ' + deleted.id, this.SERVICE_NAME);
                break;
            }

            default:
                this.logger.error(`📦 Event non géré : ${event.type}`, null, this.SERVICE_NAME);
                return;
        }
    }
}