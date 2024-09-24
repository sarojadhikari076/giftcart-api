import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

/**
 * StripeController handles Stripe-related payment operations.
 *
 * @param {PaymentsService} paymentsService - The service used to interact with Stripe's API.
 */
@ApiTags('Stripe')
@Controller('stripe')
export class StripeController {
  constructor(private readonly paymentsService: PaymentsService) {}

  /**
   * Create a new payment intent for the specified amount.
   *
   * @param {number} amount - The amount to be charged in pence (e.g., 5000 for £50.00).
   * @returns {object} The client secret for the payment intent.
   */

  @Post('create-payment-intent')
  @ApiOperation({
    summary: 'Create a Stripe payment intent',
    description:
      'Creates a new Stripe payment intent for the specified amount in GBP.',
  })
  @ApiBody({
    description:
      'Amount to be charged (in the smallest unit of the currency, e.g., pence for GBP).',
    schema: {
      type: 'object',
      properties: {
        amount: {
          type: 'number',
          example: 5000,
          description: 'The amount to charge in pence (e.g., 5000 for £50.00).',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Payment intent created successfully.',
  })
  @ApiResponse({ status: 400, description: 'Invalid amount or request data.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async createPaymentIntent(@Body('amount') amount: number) {
    // Validate that the amount is a positive number
    if (amount <= 0 || isNaN(amount)) {
      throw new HttpException(
        'Amount must be a positive number',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      // Create the payment intent using the PaymentsService
      const paymentIntent = await this.paymentsService.createPaymentIntent(
        amount,
        'GBP', // Currency code
      );

      // Return the client secret for the payment intent
      return {
        clientSecret: paymentIntent.client_secret,
      };
    } catch (error) {
      // Handle any Stripe or internal errors
      throw new HttpException(
        'Failed to create payment intent. Please try again later.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
