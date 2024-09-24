import { IsNumber } from 'class-validator';

export class UpdateCartDto {
  /**
   * Represents the quantity of the product in the cart.
   *
   * @type {number}
   * @example 2
   */
  @IsNumber()
  quantity: number;

  /**
   * Represents the ID of the product in the cart.
   *
   * @type {number}
   * @example 1
   */
  @IsNumber()
  productId: number;
}
