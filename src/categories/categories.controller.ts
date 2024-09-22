import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';

@Controller('categories')
@ApiTags('Categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // Retrieve all categories
  @Get()
  @ApiOkResponse()
  findAll() {
    return this.categoriesService.findAll();
  }
}
