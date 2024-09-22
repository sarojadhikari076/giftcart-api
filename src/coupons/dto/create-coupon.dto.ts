import { IsString, IsNumber, IsDate, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Data Transfer Object for creating a coupon.
 */
export class CreateCouponDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Unique code for the coupon',
    example: 'SUMMER21',
  })
  code: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Discount value of the coupon in percentage or fixed amount',
    example: 20,
  })
  discount: number;

  @IsDate()
  @ApiProperty({
    description: 'Start date from which the coupon is valid',
    example: '2024-01-01T00:00:00Z',
  })
  validFrom: Date;

  @IsDate()
  @ApiProperty({
    description: 'End date until which the coupon is valid',
    example: '2024-12-31T23:59:59Z',
  })
  validUntil: Date;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'ID of the user associated with the coupon',
    example: 1,
  })
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Maximum number of times the coupon can be redeemed',
    example: 100,
  })
  maxRedemption: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Number of times the coupon has been redeemed',
    example: 0,
  })
  redeemed: number;
}
