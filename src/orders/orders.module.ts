import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CouponsService } from 'src/coupons/coupons.service';

/**
 * @module OrdersModule
 *
 * The OrdersModule is responsible for managing the orders feature of the application.
 * It includes the OrdersController for handling HTTP requests related to orders and
 * the OrdersService for business logic related to orders. Additionally, it provides
 * the PrismaService for database interactions and the CouponsService for handling
 * coupon-related functionalities.
 */
@Module({
  controllers: [OrdersController],
  providers: [OrdersService, PrismaService, CouponsService],
})
export class OrdersModule {}
