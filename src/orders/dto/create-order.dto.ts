import { IsOptional, IsString, Length } from 'class-validator';

/**
 * Data Transfer Object for creating an order.
 */
export class CreateOrderDto {
  /**
   * Optional coupon code for the order.
   * Must be a string with a length between 5 and 20 characters.
   */
  @IsString()
  @IsOptional()
  @Length(5, 20)
  coupon: string;
}
