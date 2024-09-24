// Cart summary entity

import { ApiProperty } from '@nestjs/swagger';

export class CartSummary {
  /**
   * The subtotal of the cart.
   * @example 100
   */
  @ApiProperty({
    description: 'The subtotal of the cart.',
    example: 100,
  })
  subtotal: number;

  /**
   * The total cost of the cart.
   * @example 110
   */

  @ApiProperty({
    description: 'The total cost of the cart.',
    example: 110,
  })
  total: number;

  /**
   * The shipping fee for the cart.
   * @example 10
   */

  @ApiProperty({
    description: 'The shipping fee for the cart.',
    example: 10,
  })
  shippingFee: number;

  /**
   * The client secret for the payment intent.
   * @example 'pi_1J4f4sDFGf4sdfg4sdfg4sdfg'
   */

  @ApiProperty({
    description: 'The client secret for the payment intent.',
    example: 'pi_1J4f4sDFGf4sdfg4sdfg4sdfg',
  })
  clientSecret: string;

  /**
   * The discount applied to the cart.
   * @example 0
   */

  @ApiProperty({
    description: 'The discount applied to the cart.',
    example: 0,
  })
  discount: number;
}
