import { Module } from '@nestjs/common';
import { FaqsService } from './faqs.service';
import { FaqsController } from './faqs.controller';
import { PrismaService } from 'src/prisma/prisma.service';

/**
 * @module FaqsModule
 *
 * The `FaqsModule` is responsible for handling the FAQ (Frequently Asked Questions) feature of the application.
 * It includes the necessary controllers and providers to manage FAQs.
 *
 * @remarks
 * This module uses the `FaqsController` to handle incoming requests and the `FaqsService` to implement the business logic.
 * The `PrismaService` is used for database interactions.
 *
 * @see FaqsController
 * @see FaqsService
 * @see PrismaService
 */
@Module({
  controllers: [FaqsController],
  providers: [FaqsService, PrismaService],
})
export class FaqsModule {}
