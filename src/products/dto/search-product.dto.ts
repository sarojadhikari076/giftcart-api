import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SearchProductDto {
  // Search query for product names or descriptions
  @ApiProperty({
    description: 'The search query to find products by name or description',
    required: false, // This field is optional
    type: String,
  })
  @IsString()
  @IsOptional() // This field is optional
  query?: string;

  // Category to filter products
  @ApiProperty({
    description: 'The category to filter products',
    required: false, // This field is optional
    type: String,
  })
  @IsString()
  @IsOptional() // This field is optional
  category?: string;

  // Sorting criteria for the search results
  @ApiProperty({
    description:
      'The criteria for sorting the results (e.g., price, popularity)',
    required: false, // This field is optional
    type: String,
  })
  @IsString()
  @IsOptional() // This field is optional
  sort?: string;

  // Price range for filtering products
  @ApiProperty({
    description: 'The price range for filtering products (e.g., "10-50")',
    required: false, // This field is optional
    type: String,
  })
  @IsString()
  @IsOptional() // This field is optional
  priceRange?: string;

  // Number of products to return
  @ApiProperty({
    description: 'The number of products to return (e.g., "10")',
    required: false, // This field is optional
    type: String,
  })
  @IsString()
  @IsOptional() // This field is optional
  take?: string;
}
