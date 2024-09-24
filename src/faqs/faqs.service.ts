import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

/**
 * Service responsible for handling FAQ-related operations.
 *
 * @class
 * @classdesc This service provides methods to interact with the FAQ data using Prisma.
 *
 * @example
 * const faqsService = new FaqsService(prismaService);
 * const faqs = await faqsService.findAll();
 */
@Injectable()
export class FaqsService {
  /**
   * Creates an instance of FaqsService.
   *
   * @constructor
   * @param {PrismaService} prisma - The Prisma service used to interact with the database.
   */
  constructor(private prisma: PrismaService) {}

  /**
   * Retrieves all FAQ entries from the database.
   *
   * @returns {Promise<Faq[]>} A promise that resolves to an array of FAQ objects.
   */
  findAll() {
    return this.prisma.faq.findMany();
  }
}
