import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { CouponsService } from 'src/coupons/coupons.service';

/**
 * The ProductsModule is responsible for managing the products-related functionality
 * within the application. It imports and configures the necessary controllers and
 * services required for handling product operations.
 *
 * @module ProductsModule
 * @controller ProductsController - Handles incoming requests related to products.
 * @provider ProductsService - Provides business logic and operations for products.
 * @provider UsersService - Manages user-related operations.
 * @provider PrismaService - Facilitates database interactions.
 * @provider CouponsService - Manages coupon-related operations.
 */
@Module({
  controllers: [ProductsController],
  providers: [ProductsService, UsersService, PrismaService, CouponsService],
})
export class ProductsModule {}
