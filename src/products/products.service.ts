import { Injectable } from '@nestjs/common';
import { CouponsService } from 'src/coupons/coupons.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { SearchProductDto } from './dto/search-product.dto';
import { Product, SearchHistory } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService,
    private userService: UsersService,
    private couponService: CouponsService,
  ) {}

  /**
   * Retrieves a list of products based on search and filter queries.
   *
   * @param {SearchProductDto} queries - Query parameters for search, category, sort, and price range.
   * @returns {Promise<Product[]>} - A promise that resolves to an array of products.
   */
  findAll(queries: SearchProductDto): Promise<Product[]> {
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

  /**
   * Retrieves the latest 10 products that are marked as new arrivals.
   *
   * @returns {Promise<Product[]>} - A promise that resolves to an array of new arrival products.
   */
  findNewArrivals(): Promise<Product[]> {
    return this.prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    });
  }

  /**
   * Retrieves up to 10 products that have an average rating of 4 or higher.
   *
   * @returns {Promise<Product[]>} - A promise that resolves to an array of featured products.
   */
  findFeatured(): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: {
        averageRating: {
          gte: 4,
        },
      },
      take: 10,
    });
  }

  /**
   * Retrieves up to 8 best-selling products based on available quantity and rating.
   *
   * @returns {Promise<Product[]>} - A promise that resolves to an array of best-selling products.
   */
  findBestSelling(): Promise<Product[]> {
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

  /**
   * Updates or creates search history for a specific product for the logged-in user.
   *
   * @param {number} userId - ID of the logged-in user.
   * @param {number} productId - ID of the product.
   * @returns {Promise<SearchHistory>} - A promise that resolves to the updated or created search history.
   */
  async upsertSearchHistory(
    userId: number,
    productId: number,
  ): Promise<SearchHistory> {
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

  /**
   * Retrieves personalized birthday products or discounts for the user.
   * If the user’s birthday is within a week and no birthday coupon has been redeemed,
   * products based on user’s search history, common tags, and favorite category will be recommended.
   *
   * @param {number} userId - ID of the user.
   * @returns {Promise<Product[]>} - A promise that resolves to an array of recommended birthday products.
   */
  async findBirthdayProducts(userId: number): Promise<Product[]> {
    const isBirthdayWithinNextWeek =
      await this.userService.isBirthdayWithinNextWeek(userId);
    const isRedeemed =
      await this.couponService.isBirthdayCouponRedeemed(userId);

    if (!isBirthdayWithinNextWeek || isRedeemed) {
      return [];
    }

    const topSearchedProductIds = await this.getTopSearchedProductIds(userId);
    const favoriteCategoryId = await this.getUserFavoriteCategory(userId);
    const commonTags = await this.getCommonTags(userId);

    const similarProducts = await this.findSimilarProducts(userId);

    const topRecommendedProducts = await this.prisma.product.findMany({
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

    const products = similarProducts.concat(topRecommendedProducts);

    if (products.length === 0) {
      return await this.findFeatured();
    }

    return products;
  }

  /**
   * Retrieves the top 5 most searched product IDs for the user.
   *
   * @param {number} userId - ID of the user.
   * @returns {Promise<number[]>} - A promise that resolves to an array of product IDs.
   */
  private async getTopSearchedProductIds(userId: number): Promise<number[]> {
    const searchHistory = await this.prisma.searchHistory.findMany({
      where: { userId },
      orderBy: { searchCount: 'desc' },
      take: 5,
    });

    return searchHistory.map((history) => history.productId);
  }

  /**
   * Retrieves the 5 most common tags from the user’s search history.
   *
   * @param {number} userId - ID of the user.
   * @returns {Promise<string[]>} - A promise that resolves to an array of common tags.
   */
  private async getCommonTags(userId: number): Promise<string[]> {
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

  /**
   * Retrieves the most frequently purchased product category by the user.
   *
   * @param {number} userId - ID of the user.
   * @returns {Promise<number | undefined>} - A promise that resolves to the user’s favourite category ID, or undefined if no orders exist.
   */
  private async getUserFavoriteCategory(
    userId: number,
  ): Promise<number | undefined> {
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

  // Write a function for fetching 5 similar products based on the user's purchase history.

  /**
   * Retrieves 5 similar products based on the user's purchase history.
   *
   * @param {number} userId - ID of the user.
   * @returns {Promise<Product[]>} - A promise that resolves to an array of similar products.
   */
  async findSimilarProducts(userId: number): Promise<Product[]> {
    const orderProducts = await this.prisma.orderProduct.findMany({
      where: { order: { userId } },
      include: { product: true },
    });

    const productIds = orderProducts.map((order) => order.product.id);

    const similarProducts = await this.prisma.product.findMany({
      where: {
        id: { in: productIds },
      },
      take: 5,
      orderBy: {
        availableQuantity: 'desc',
      },
    });

    return similarProducts;
  }

  /**
   * Retrieves product details by its slug, along with a list of similar products in the same category.
   *
   * @param {string} slug - The slug of the product.
   * @returns {Promise<{ product: Product, similarProducts: Product[] }>} - A promise that resolves to the product details and similar products.
   */
  async findOne(
    slug: string,
  ): Promise<{ product: Product; similarProducts: Product[] }> {
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
