import { Injectable } from '@nestjs/common';
import { CouponsService } from 'src/coupons/coupons.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { SearchProductDto } from './dto/search-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService,
    private userService: UsersService,
    private couponService: CouponsService,
  ) {}

  findAll(queries: SearchProductDto) {
    const { query, category, sort, priceRange, take } = queries;

    const where = {};
    if (query) {
      where['name'] = {
        contains: query,
        mode: 'insensitive',
      };
    }

    if (category) {
      where['categoryId'] = +category;
    }

    const orderBy = {};

    if (sort) {
      const [field, order] = sort.split(':');
      orderBy[field || 'name'] = order || 'asc';
    }

    const priceRangeFilter = {};

    if (priceRange) {
      const [min, max] = priceRange.split(',');
      priceRangeFilter['price'] = {
        gte: +min,
        lte: +max,
      };
    }

    return this.prisma.product.findMany({
      where,
      orderBy,
      take: +take || 10,
    });
  }

  findNewArrivals() {
    return this.prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    });
  }

  findFeatured() {
    return this.prisma.product.findMany({
      where: {
        averageRating: {
          gte: 4,
        },
      },
      take: 10,
    });
  }

  findBestSelling() {
    return this.prisma.product.findMany({
      where: {
        averageRating: {
          gte: 4,
        },
      },
      orderBy: {
        availableQuantity: 'desc',
      },
      take: 8,
    });
  }

  async upsertSearchHistory(userId: number, productId: number) {
    const searchHistory = await this.prisma.searchHistory.findFirst({
      where: {
        userId,
        productId,
      },
    });

    if (searchHistory) {
      return this.prisma.searchHistory.update({
        where: {
          id: searchHistory.id,
        },
        data: {
          searchCount: {
            increment: 1,
          },
        },
      });
    }

    return this.prisma.searchHistory.create({
      data: {
        userId,
        productId,
        searchCount: 1,
      },
    });
  }

  async findBirthdayProducts(userId: number) {
    const isBirthdayWithinNextWeek =
      await this.userService.isBirthdayWithinNextWeek(userId);
    const isRedeemed =
      await this.couponService.isBirthdayCouponRedeemed(userId);

    if (isBirthdayWithinNextWeek === false || isRedeemed) {
      return [];
    }

    const topSearchedProductIds = await this.getTopSearchedProductIds(userId);
    const favoriteCategoryId = await this.getUserFavoriteCategory(userId);
    const commonTags = await this.getCommonTags(userId);

    const recommendedProducts = await this.prisma.product.findMany({
      where: {
        OR: [
          { id: { in: topSearchedProductIds } },
          { tags: { hasSome: commonTags } },
          { categoryId: favoriteCategoryId },
        ],
      },
      orderBy: { averageRating: 'desc' },
      take: 10,
    });

    if (recommendedProducts.length === 0) {
      return await this.findFeatured();
    }

    return recommendedProducts;
  }

  private async getTopSearchedProductIds(userId: number) {
    const searchHistory = await this.prisma.searchHistory.findMany({
      where: { userId },
      orderBy: { searchCount: 'desc' },
      take: 5,
    });

    return searchHistory.map((history) => history.productId);
  }

  private async getCommonTags(userId: number) {
    const searchHistory = await this.prisma.searchHistory.findMany({
      where: { userId },
      include: { product: true },
    });

    const tags = searchHistory.flatMap((history) => history.product.tags);
    const tagFrequency = tags.reduce((acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(tagFrequency)
      .sort((a, b) => tagFrequency[b] - tagFrequency[a])
      .slice(0, 5);
  }

  private async getUserFavoriteCategory(userId: number) {
    const orderProducts = await this.prisma.orderProduct.findMany({
      where: { order: { userId } },
      include: { product: true },
    });

    if (orderProducts.length === 0) return undefined;

    const categoryFrequency = orderProducts.reduce((acc, order) => {
      acc[order.product.categoryId] = (acc[order.product.categoryId] || 0) + 1;
      return acc;
    }, {});

    return parseInt(
      Object.keys(categoryFrequency).reduce((a, b) =>
        categoryFrequency[a] > categoryFrequency[b] ? a : b,
      ),
    );
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
}
