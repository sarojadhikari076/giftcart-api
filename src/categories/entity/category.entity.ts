import { IsString, IsArray, IsDate, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * @class Category
 * @classdesc Category entity representing a category of products.
 * @example
 * const category = {
 *   id: 1,
 *   name: 'Fruits',
 *   description: 'All kinds of fruits.',
 *   tags: ['fresh', 'organic'],
 *   createdAt: new Date('2024-01-01T00:00:00Z'),
 *   updatedAt: new Date('2024-01-02T00:00:00Z'),
 * };
 */
export class Category {
  /**
   * @property {number} id - The unique identifier of the category.
   * @example 1
   */
  @IsNumber()
  @ApiProperty({ description: 'The unique identifier of the category.' })
  id: number;

  /**
   * @property {string} name - The name of the category.
   * @example 'Fruits'
   */
  @IsString()
  @ApiProperty({ description: 'The name of the category.' })
  name: string;

  /**
   * @property {string} description - The description of the category.
   * @example 'All kinds of fruits.'
   */
  @IsString()
  @ApiProperty({ description: 'The description of the category.' })
  description: string;

  /**
   * @property {string[]} tags - The tags associated with the category.
   * @example ['fresh', 'organic']
   */
  @IsArray()
  @ApiProperty({ description: 'The tags associated with the category.' })
  tags: string[];

  /**
   * @property {Date} createdAt - The date when the category was created.
   * @example '2024-01-01T00:00:00Z'
   */
  @IsDate()
  @ApiProperty({ description: 'The date when the category was created.' })
  createdAt: Date;

  /**
   * @property {Date} updatedAt - The date when the category was last updated.
   * @example '2024-01-02T00:00:00Z'
   */
  @IsDate()
  @ApiProperty({ description: 'The date when the category was last updated.' })
  updatedAt: Date;
}

/**
 * @class TinyCategory
 * @classdesc A lightweight representation of a category.
 * @example
 * const tinyCategory = {
 *   id: 1,
 *   name: 'Fruits',
 * };
 */
export class TinyCategory {
  /**
   * @property {number} id - The unique identifier of the category.
   * @example 1
   */
  @IsNumber()
  @ApiProperty({ description: 'The unique identifier of the category.' })
  id: number;

  /**
   * @property {string} name - The name of the category.
   * @example 'Fruits'
   */
  @IsString()
  @ApiProperty({ description: 'The name of the category.' })
  name: string;
}
