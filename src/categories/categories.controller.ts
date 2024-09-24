import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { TinyCategory } from './entity/category.entity';

@Controller('categories')
@ApiTags('Categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  /**
   * Retrieve all categories
   *
   * @returns {Promise<TinyCategory[]>} A promise that resolves to an array of TinyCategory entities.
   *
   * @remarks
   * This method calls the CategoriesService to fetch all available product categories.
   *
   * @example
   * // Example response
   * [
   *   {
   *     id: 1,
   *     name: 'Fruits',
   *   },
   *   {
   *     id: 2,
   *     name: 'Vegetables',
   *   }
   * ]
   */
  @Get()
  @ApiOperation({
    summary: 'Retrieve all categories',
    description: 'Fetch a list of all available product categories.',
  })
  @ApiOkResponse({
    description: 'Successfully retrieved all categories.',
    type: [TinyCategory],
    isArray: true,
  })
  findAll(): Promise<TinyCategory[]> {
    return this.categoriesService.findAll();
  }
}
