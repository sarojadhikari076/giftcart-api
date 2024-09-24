import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

/**
 * @class PaymentsService
 * @classdesc Service responsible for handling payment-related operations.
 * This service provides methods to interact with the Stripe API for processing payments.
 */
@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  /**
   * @constructor
   * Initializes the PaymentsService and configures the Stripe instance with the secret key.
   */
  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-06-20',
    });
  }

  /**
   * Creates a new payment intent for the specified amount and currency.
   *
   * @async
   * @method createPaymentIntent
   * @param {number} amount - The amount to be charged in the smallest unit of the currency (e.g., pence for GBP).
   * @param {string} currency - The currency in which the payment is to be made (e.g., 'GBP').
   * @returns {Promise<Stripe.PaymentIntent>} A promise that resolves to the created payment intent object.
   * @throws {Stripe.StripeError} Throws an error if the payment intent creation fails.
   * @example
   * const paymentIntent = await paymentsService.createPaymentIntent(5000, 'GBP');
   * console.log(paymentIntent); // Output: Stripe PaymentIntent object
   */
  async createPaymentIntent(
    amount: number,
    currency: string,
  ): Promise<Stripe.PaymentIntent> {
    return await this.stripe.paymentIntents.create({
      amount,
      currency,
    });
  }
}
