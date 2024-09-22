import { Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/users/get-user.decorator';
import { User } from '@prisma/client';
import { SearchProductDto } from './dto/search-product.dto';

@Controller('products')
@ApiTags('Products') // Tag for grouping in Swagger
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all products with optional filters' })
  @ApiQuery({
    name: 'query',
    required: false,
    description: 'Search term for product names',
  })
  @ApiQuery({
    name: 'category',
    required: false,
    description: 'Filter by product category',
  })
  @ApiQuery({
    name: 'sort',
    required: false,
    description: 'Sort order for the products',
  })
  @ApiQuery({
    name: 'priceRange',
    required: false,
    description: 'Price range filter (e.g., "10-50")',
  })
  @ApiQuery({
    name: 'take',
    required: false,
    description: 'Number of products to return',
  })
  findAll(@Query() queries: SearchProductDto) {
    return this.productsService.findAll(queries);
  }

  @Get('new-arrivals')
  @ApiOperation({ summary: 'Retrieve new arrivals' })
  findNewArrivals() {
    return this.productsService.findNewArrivals();
  }

  @Get('best-selling')
  @ApiOperation({ summary: 'Retrieve best-selling products' })
  findBestSelling() {
    return this.productsService.findBestSelling();
  }

  @Get('featured')
  @ApiOperation({ summary: 'Retrieve featured products' })
  findFeatured() {
    return this.productsService.findFeatured();
  }

  @UseGuards(JwtAuthGuard) // Protects route with JWT authentication
  @Get('birthday')
  @ApiOperation({
    summary: 'Retrieve birthday products for the logged-in user',
  })
  @ApiResponse({
    status: 200,
    description: 'Birthday products retrieved successfully',
  })
  findBirthdayProducts(@GetUser() user: User) {
    return this.productsService.findBirthdayProducts(user.id);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Retrieve a single product by its slug' })
  @ApiResponse({ status: 200, description: 'Product retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async findOne(@Param('slug') slug: string) {
    return this.productsService.findOne(slug);
  }

  @UseGuards(JwtAuthGuard) // Protects route with JWT authentication
  @Post(':id/search-history')
  @ApiOperation({ summary: 'Upsert search history for a product' })
  @ApiResponse({
    status: 200,
    description: 'Search history updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async upsertSearchHistory(@Param('id') id: string, @GetUser() user: User) {
    return this.productsService.upsertSearchHistory(user.id, +id);
  }
}
