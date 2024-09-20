import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}
  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  findAll() {
    return this.prisma.product.findMany({
      take: 5,
    });
  }

  findFeatured() {
    return this.prisma.product.findMany({
      where: {
        averageRating: {
          gte: 4,
        },
      },
      take: 5,
    });
  }

  findBestSelling() {
    return this.prisma.product.findMany({
      orderBy: {
        price: 'asc',
      },
      take: 5,
    });
  }

  async findOne(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        slug,
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    const similarProducts = await this.prisma.product.findMany({
      where: {
        categoryId: product.categoryId,
        NOT: {
          id: product.id,
        },
      },
      take: 5,
    });

    return {
      product,
      similarProducts,
    };
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
