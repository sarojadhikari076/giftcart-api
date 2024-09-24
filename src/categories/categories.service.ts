import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

/**
 * Service responsible for handling operations related to categories.
 */
@Injectable()
export class CategoriesService {
  /**
   * Constructs a new instance of CategoriesService.
   *
   * @param prisma - The PrismaService instance used for database operations.
   */
  constructor(private prisma: PrismaService) {}

  /**
   * Retrieves all categories from the database.
   *
   * @returns A promise that resolves to an array of category objects, each containing an `id` and `name`.
   */
  findAll(): Promise<{ id: number; name: string }[]> {
    return this.prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }
}
