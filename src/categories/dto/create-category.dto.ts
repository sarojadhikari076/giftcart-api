import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, ArrayNotEmpty, Length } from 'class-validator';

/**
 * Data Transfer Object for creating a new category.
 */
export class CreateCategoryDto {
  /**
   * The name of the category.
   * Must be a non-empty string between 3 and 50 characters.
   * @example "Electronics"
   */
  @ApiProperty({
    description: 'The name of the category',
    example: 'Electronics',
  })
  @IsString()
  @Length(3, 50)
  name: string;

  /**
   * The description of the category.
   * Must be a non-empty string between 10 and 200 characters.
   * @example "Category for electronic products"
   */
  @ApiProperty({
    description: 'The description of the category',
    example: 'Category for electronic products',
  })
  @IsString()
  @Length(10, 200)
  description: string;

  /**
   * Tags associated with the category.
   * Must be a non-empty array of non-empty strings.
   * @example ["gadgets", "devices"]
   */
  @ApiProperty({
    description: 'Tags associated with the category',
    example: ['gadgets', 'devices'],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  tags: string[];
}
