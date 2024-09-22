import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCartDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'ID of the product to be added to the cart',
    example: 123,
  })
  productId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Quantity of the product to be added to the cart',
    example: 2,
  })
  quantity: number;
}
