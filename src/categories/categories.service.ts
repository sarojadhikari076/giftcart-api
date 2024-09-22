import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  // Retrieve all categories
  findAll() {
    return this.prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }
}
