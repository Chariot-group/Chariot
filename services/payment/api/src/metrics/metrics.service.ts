import { Injectable, Logger } from '@nestjs/common';
import {
    makeCounterProvider,
    makeHistogramProvider,
} from '@willsoto/nestjs-prometheus';

@Injectable()
export class MetricsService {
    private readonly logger = new Logger(MetricsService.name);

    constructor() {
        this.logger.verbose('Metrics service initialized');
    }
}

export const httpRequestsCounterProvider = makeCounterProvider({
    name: 'chariot_payment_http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status_code'],
});

export const httpRequestDurationProvider = makeHistogramProvider({
    name: 'chariot_payment_http_request_duration_seconds',
    help: 'HTTP request duration in seconds',
    labelNames: ['method', 'route'],
    buckets: [0.001, 0.01, 0.1, 0.5, 1, 2, 5],
});

export const errorsCounterProvider = makeCounterProvider({
    name: 'chariot_payment_errors_total',
    help: 'Total number of errors',
    labelNames: ['type', 'controller', 'severity'],
});

export const paymentsCreatedCounterProvider = makeCounterProvider({
    name: 'chariot_payments_created_total',
    help: 'Payments persisted (PENDING admin create, or COMPLETED fulfillment)',
    labelNames: ['status', 'currency'],
});

export const promoCodeUsagesCounterProvider = makeCounterProvider({
    name: 'chariot_promo_code_usages_total',
    help: 'Promo code usages recorded on completed payments',
});

export const affiliationUsagesCounterProvider = makeCounterProvider({
    name: 'chariot_affiliation_usages_total',
    help: 'Affiliation usages recorded on completed payments',
});

export const dbQueryDurationProvider = makeHistogramProvider({
    name: 'chariot_payment_db_query_duration_seconds',
    help: 'Database query duration in seconds',
    labelNames: ['table', 'operation'],
    buckets: [0.001, 0.005, 0.01, 0.05, 0.1, 0.5, 1],
});

export const stripePaymentsCounterProvider = makeCounterProvider({
    name: 'chariot_stripe_payments_total',
    help: 'Stripe / free-order fulfillments',
    labelNames: ['status'],
});

export const stripeWebhooksCounterProvider = makeCounterProvider({
    name: 'chariot_stripe_webhooks_total',
    help: 'Stripe webhooks received',
    labelNames: ['status', 'event_type'],
});

export const checkoutsCounterProvider = makeCounterProvider({
    name: 'chariot_payment_checkouts_total',
    help: 'Checkout attempts by flow (payment_intent, embedded, checkout, free_order)',
    labelNames: ['flow', 'status'],
});

export const codeResolutionsCounterProvider = makeCounterProvider({
    name: 'chariot_payment_code_resolutions_total',
    help: 'Promo / affiliation code lookups from checkout',
    labelNames: ['kind', 'status'],
});

export const tokenCreditsCounterProvider = makeCounterProvider({
    name: 'chariot_payment_token_credits_total',
    help: 'Token credits posted to Adventure after a paid order',
    labelNames: ['status'],
});

export const stripeOperationDurationProvider = makeHistogramProvider({
    name: 'chariot_payment_stripe_operation_duration_seconds',
    help: 'Outbound Stripe API duration in seconds',
    labelNames: ['operation'],
    buckets: [0.05, 0.1, 0.25, 0.5, 1, 2, 5, 10],
});
