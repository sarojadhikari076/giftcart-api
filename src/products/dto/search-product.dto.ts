import { IsOptional, IsString, IsNumberString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Data Transfer Object for searching products.
 */
export class SearchProductDto {
  /**
   * The search query to find products by name or description.
   * @example "laptop"
   */
  @ApiProperty({
    description: 'The search query to find products by name or description',
    required: false,
    type: String,
    example: 'laptop',
  })
  @IsString()
  @IsOptional()
  query?: string;

  /**
   * The category to filter products.
   * @example "electronics"
   */
  @ApiProperty({
    description: 'The category to filter products',
    required: false,
    type: String,
    example: 'electronics',
  })
  @IsString()
  @IsOptional()
  category?: string;

  /**
   * The criteria for sorting the results (e.g., price, popularity).
   * @example "price"
   */
  @ApiProperty({
    description:
      'The criteria for sorting the results (e.g., price, popularity)',
    required: false,
    type: String,
    example: 'price',
  })
  @IsString()
  @IsOptional()
  sort?: string;

  /**
   * The price range for filtering products (e.g., "10-50").
   * @example "10-50"
   */
  @ApiProperty({
    description: 'The price range for filtering products (e.g., "10-50")',
    required: false,
    type: String,
    example: '10-50',
  })
  @Matches(/^\d+-\d+$/, {
    message: 'priceRange must be in the format "min-max"',
  })
  @IsOptional()
  priceRange?: string;

  /**
   * The number of products to return.
   * @example "10"
   */
  @ApiProperty({
    description: 'The number of products to return (e.g., "10")',
    required: false,
    type: String,
    example: '10',
  })
  @IsNumberString({}, { message: 'take must be a numeric string' })
  @IsOptional()
  take?: string;
}
