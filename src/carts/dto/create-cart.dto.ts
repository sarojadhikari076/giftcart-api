import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Data Transfer Object for creating a cart.
 */
export class CreateCartDto {
  /**
   * ID of the product to be added to the cart.
   * @example 123
   */
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'ID of the product to be added to the cart',
    example: 123,
  })
  productId: number;

  /**
   * Quantity of the product to be added to the cart.
   * Must be a positive integer.
   * @example 2
   */
  @IsNumber()
  @IsNotEmpty()
  @Min(1, { message: 'Quantity must be at least 1' })
  @ApiProperty({
    description: 'Quantity of the product to be added to the cart',
    example: 2,
    minimum: 1,
  })
  quantity: number;
}
