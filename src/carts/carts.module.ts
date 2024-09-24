import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaymentsService } from 'src/payments/payments.service';

/**
 * The CartsModule is a NestJS module that encapsulates the functionality related to carts.
 *
 * This module includes the following components:
 *
 * - `CartsController`: Handles incoming requests related to cart operations and returns appropriate responses.
 * - `CartsService`: Provides business logic and operations related to carts.
 * - `PrismaService`: Handles database interactions using Prisma ORM.
 * - `PaymentsService`: Manages payment-related operations.
 *
 * The `@Module` decorator is used to define the module's metadata, including its controllers and providers.
 */
@Module({
  controllers: [CartsController],
  providers: [CartsService, PrismaService, PaymentsService],
})
export class CartsModule {}
