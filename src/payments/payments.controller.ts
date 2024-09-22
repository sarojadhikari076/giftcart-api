import { Controller, Post, Body, HttpException } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('stripe') // Base route for Stripe-related endpoints
export class StripeController {
  constructor(private readonly paymentsService: PaymentsService) {}

  // Create a payment intent with the specified amount
  @Post('create-payment-intent')
  async createPaymentIntent(@Body('amount') amount: number) {
    // Validate that the amount is a positive number
    if (amount <= 0) {
      throw new HttpException('Amount must be greater than zero', 400);
    }

    // Create the payment intent using the PaymentsService
    const paymentIntent = await this.paymentsService.createPaymentIntent(
      amount,
      'GBP', // Currency code
    );

    // Return the client secret for the payment intent
    return {
      clientSecret: paymentIntent.client_secret,
    };
  }
}
