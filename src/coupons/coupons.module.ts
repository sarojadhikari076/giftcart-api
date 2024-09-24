import { Module } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CouponsController } from './coupons.controller';
import { PrismaService } from 'src/prisma/prisma.service';

/**
 * @module CouponsModule
 *
 * The `CouponsModule` is responsible for managing the coupons feature within the application.
 * It imports the necessary controllers and providers required for handling coupon-related operations.
 *
 * @description
 * This module includes:
 * - `CouponsController`: Handles incoming requests related to coupons.
 * - `CouponsService`: Contains the business logic for managing coupons.
 * - `PrismaService`: Provides database access and operations.
 */
@Module({
  controllers: [CouponsController],
  providers: [CouponsService, PrismaService],
})
export class CouponsModule {}
