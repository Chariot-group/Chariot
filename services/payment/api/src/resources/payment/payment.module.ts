import { Module } from '@nestjs/common';
import { PaymentService } from '@/resources/payment/payment.service';
import { PaymentController } from '@/resources/payment/payment.controller';
import { PromoCodeModule } from '@/resources/promo-code/promo-code.module';
import { AffiliationModule } from '@/resources/affiliation/affiliation.module';
import { InternalGuard } from '@/common/guards/internal.guard';
import { KeycloakAdminService } from '@/common/services/keycloak-admin.service';
import { MetricsModule } from '@/metrics/metrics.module';

@Module({
    imports: [PromoCodeModule, AffiliationModule, MetricsModule],
    controllers: [PaymentController],
    providers: [PaymentService, InternalGuard, KeycloakAdminService],
    exports: [PaymentService],
})
export class PaymentModule { }
