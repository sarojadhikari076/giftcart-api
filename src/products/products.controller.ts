import { Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/users/get-user.decorator';
import { User } from '@prisma/client';
import { SearchProductDto } from './dto/search-product.dto';

/**
 * Controller responsible for handling product-related requests.
 * Provides various endpoints for retrieving, filtering, and managing products.
 */
@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  /**
   * Retrieve a list of all products with optional filters for search, category, sorting, and price range.
   *
   * @param {SearchProductDto} queries - Query parameters for filtering and sorting products.
   * @returns {Promise<Product[]>} - A list of filtered and sorted products.
   */
  @Get()
  @ApiOperation({
    summary: 'Retrieve all products',
    description:
      'Retrieve a list of all products with optional filters for search, category, sorting, and price range.',
  })
  @ApiQuery({
    name: 'query',
    required: false,
    description: 'Search term to filter products by name',
  })
  @ApiQuery({
    name: 'category',
    required: false,
    description: 'Filter products by their category',
  })
  @ApiQuery({
    name: 'sort',
    required: false,
    description: 'Sort the products by criteria (e.g., price, popularity)',
  })
  @ApiQuery({
    name: 'priceRange',
    required: false,
    description: 'Filter products by price range (e.g., "10-50")',
  })
  @ApiQuery({
    name: 'take',
    required: false,
    description: 'Limit the number of products returned (pagination)',
  })
  @ApiResponse({
    status: 200,
    description: 'List of products retrieved successfully',
  })
  findAll(@Query() queries: SearchProductDto) {
    return this.productsService.findAll(queries);
  }

  /**
   * Retrieve new arrival products.
   *
   * @returns {Promise<Product[]>} - A list of newly arrived products.
   */
  @Get('new-arrivals')
  @ApiOperation({
    summary: 'Retrieve new arrival products',
    description:
      'Fetch the list of products that have recently arrived in the store.',
  })
  @ApiResponse({
    status: 200,
    description: 'New arrival products retrieved successfully',
  })
  findNewArrivals() {
    return this.productsService.findNewArrivals();
  }

  /**
   * Retrieve best-selling products.
   *
   * @returns {Promise<Product[]>} - A list of best-selling products.
   */
  @Get('best-selling')
  @ApiOperation({
    summary: 'Retrieve best-selling products',
    description:
      'Fetch the list of products that are the best sellers in the store.',
  })
  @ApiResponse({
    status: 200,
    description: 'Best-selling products retrieved successfully',
  })
  findBestSelling() {
    return this.productsService.findBestSelling();
  }

  /**
   * Retrieve featured products.
   *
   * @returns {Promise<Product[]>} - A list of featured products.
   */
  @Get('featured')
  @ApiOperation({
    summary: 'Retrieve featured products',
    description: 'Fetch the list of featured products in the store.',
  })
  @ApiResponse({
    status: 200,
    description: 'Featured products retrieved successfully',
  })
  findFeatured() {
    return this.productsService.findFeatured();
  }

  /**
   * Retrieve personalized birthday products for the logged-in user.
   * Requires JWT authentication.
   *
   * @param {User} user - The authenticated user.
   * @returns {Promise<Product[]>} - A list of personalized products or discounts for the user's birthday.
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth() // Indicates that the route requires JWT auth
  @Get('birthday')
  @ApiOperation({
    summary: 'Retrieve birthday products for logged-in user',
    description:
      'Fetch personalized products or discounts for the user around their birthday.',
  })
  @ApiResponse({
    status: 200,
    description: 'Birthday products retrieved successfully',
  })
  findBirthdayProducts(@GetUser() user: User) {
    return this.productsService.findBirthdayProducts(user.id);
  }

  /**
   * Retrieve product details by slug.
   *
   * @param {string} slug - The product slug.
   * @returns {Promise<Product>} - Detailed information of the requested product.
   * @throws {NotFoundException} - If the product is not found.
   */
  @Get(':slug')
  @ApiOperation({
    summary: 'Retrieve product by slug',
    description: 'Fetch detailed information for a single product by its slug.',
  })
  @ApiResponse({ status: 200, description: 'Product retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async findOne(@Param('slug') slug: string) {
    return this.productsService.findOne(slug);
  }

  /**
   * Create or update search history for a product based on user actions.
   * Requires JWT authentication.
   *
   * @param {string} id - The product ID.
   * @param {User} user - The authenticated user.
   * @returns {Promise<void>} - Confirmation of the search history update.
   * @throws {NotFoundException} - If the product is not found.
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth() // Indicates that the route requires JWT auth
  @Post(':id/search-history')
  @ApiOperation({
    summary: 'Upsert search history for a product',
    description:
      'Create or update the search history for a specific product based on user actions.',
  })
  @ApiResponse({
    status: 200,
    description: 'Search history updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async upsertSearchHistory(@Param('id') id: string, @GetUser() user: User) {
    return this.productsService.upsertSearchHistory(user.id, +id);
  }
}
