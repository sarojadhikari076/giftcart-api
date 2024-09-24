import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';

/**
 * The `StripeModule` is a NestJS module responsible for handling payment-related functionalities.
 *
 * @module StripeModule
 *
 * @description
 * This module imports necessary dependencies and provides the `PaymentsService` to be used
 * across the application.
 *
 * @imports
 * - No external modules are imported.
 *
 * @providers
 * - `PaymentsService`: The service responsible for payment processing logic.
 *
 * @exports
 * - `PaymentsService`: Makes the payment processing service available to other modules.
 */
@Module({
  imports: [],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class StripeModule {}
