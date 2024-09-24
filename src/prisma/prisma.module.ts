import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/**
 * The `PrismaModule` is a NestJS module that provides and exports the `PrismaService`.
 *
 * This module is responsible for encapsulating the Prisma service, making it available
 * for dependency injection throughout the application.
 *
 * @module PrismaModule
 * @providers [PrismaService] - The service provided by this module.
 * @exports [PrismaService] - The service exported by this module.
 */
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
