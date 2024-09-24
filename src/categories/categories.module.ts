import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { PrismaService } from 'src/prisma/prisma.service';

/**
 * @module CategoriesModule
 *
 * The CategoriesModule is responsible for managing the categories feature in the application.
 * It imports the necessary controllers and providers required for handling category-related operations.
 *
 * @category Module
 *
 * @controller CategoriesController - Handles incoming requests related to categories.
 * @provider CategoriesService - Contains the business logic for managing categories.
 * @provider PrismaService - Provides database access and operations.
 */
@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, PrismaService],
})
export class CategoriesModule {}
