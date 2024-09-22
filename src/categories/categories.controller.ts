import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Category } from './entities/category.entity';

@Controller('categories')
@ApiTags('Categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // Retrieve all categories
  @Get()
  @ApiOperation({
    summary: 'Retrieve all categories',
    description: 'Fetch a list of all available product categories.',
  })
  @ApiOkResponse({
    description: 'Successfully retrieved all categories.',
    type: [Category],
  })
  findAll() {
    return this.categoriesService.findAll();
  }
}
