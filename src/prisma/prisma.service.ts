import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * PrismaService extends the PrismaClient and connects to the database when the module is initialized.
 * It is responsible for handling all database operations via Prisma ORM in the NestJS application.
 * Implements the `OnModuleInit` lifecycle hook to establish the database connection when the module is initialized.
 *
 * @class
 * @extends PrismaClient
 * @implements OnModuleInit
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  /**
   * Lifecycle method called when the module is initialized.
   * It establishes a connection to the database using Prisma ORM.
   *
   * @returns {Promise<void>} - A promise that resolves once the connection is established.
   */
  async onModuleInit(): Promise<void> {
    await this.$connect();
  }
}
