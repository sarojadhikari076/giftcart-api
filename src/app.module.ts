import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FaqsModule } from './faqs/faqs.module';
import { CartsModule } from './carts/carts.module';
import { OrdersModule } from './orders/orders.module';
import { CouponsModule } from './coupons/coupons.module';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { BullModule } from '@nestjs/bull';

/**
 * The main application module for the Gift Cart API.
 *
 * This module imports and configures various feature modules and global services
 * required by the application, including:
 * - CategoriesModule
 * - ProductsModule
 * - UsersModule
 * - AuthModule
 * - FaqsModule
 * - CartsModule
 * - OrdersModule
 * - CouponsModule
 * - EmailModule
 * - ScheduleModule: Configured with default settings.
 * - ConfigModule: Configured to be global.
 * - BullModule: Configured for Redis with host and port from environment variables.
 * - ThrottlerModule: Configured with a time-to-live (ttl) of 3600 seconds and a limit of 10000 requests.
 *
 * It also defines the main application controller and service.
 *
 * @module AppModule
 */
@Module({
  imports: [
    CategoriesModule,
    ProductsModule,
    UsersModule,
    AuthModule,
    FaqsModule,
    CartsModule,
    OrdersModule,
    CouponsModule,
    EmailModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 3600,
        limit: 10000,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
