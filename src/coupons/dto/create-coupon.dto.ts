import {
  IsString,
  IsNumber,
  IsNotEmpty,
  Min,
  IsISO8601,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Data Transfer Object for creating a coupon.
 */
export class CreateCouponDto {
  /**
   * @property {string} code
   * @description Unique code for the coupon.
   * @example 'SUMMER21'
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Unique code for the coupon',
    example: 'SUMMER21',
  })
  code: string;

  /**
   * @property {number} discount
   * @description Discount value of the coupon in percentage or fixed amount.
   * @example 20
   */
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @ApiProperty({
    description: 'Discount value of the coupon in percentage or fixed amount',
    example: 20,
    minimum: 0,
  })
  discount: number;

  /**
   * @property {Date} validFrom
   * @description Start date from which the coupon is valid.
   * @example '2024-01-01T00:00:00Z'
   */
  @IsISO8601()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Start date from which the coupon is valid',
    example: '2024-01-01T00:00:00Z',
    type: String,
    format: 'date-time',
  })
  validFrom: Date;

  /**
   * @property {Date} validUntil
   * @description End date until which the coupon is valid.
   * @example '2024-12-31T23:59:59Z'
   */
  @IsISO8601()
  @IsNotEmpty()
  @ApiProperty({
    description: 'End date until which the coupon is valid',
    example: '2024-12-31T23:59:59Z',
    type: String,
    format: 'date-time',
  })
  validUntil: Date;

  /**
   * @property {number} userId
   * @description ID of the user associated with the coupon.
   * @example 1
   */
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'ID of the user associated with the coupon',
    example: 1,
  })
  userId: number;

  /**
   * @property {number} maxRedemption
   * @description Maximum number of times the coupon can be redeemed.
   * @example 100
   */
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @ApiProperty({
    description: 'Maximum number of times the coupon can be redeemed',
    example: 100,
    minimum: 1,
  })
  maxRedemption: number;

  /**
   * @property {number} redeemed
   * @description Number of times the coupon has been redeemed.
   * @example 0
   */
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @ApiProperty({
    description: 'Number of times the coupon has been redeemed',
    example: 0,
    minimum: 0,
  })
  redeemed: number;
}
