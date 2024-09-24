import { HttpException, Injectable } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { addDays } from 'date-fns';
import { Coupon, Prisma } from '@prisma/client';

@Injectable()
export class CouponsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Creates a new coupon.
   * @param {CreateCouponDto} createCouponDto - Data transfer object for creating a coupon.
   * @returns {Promise<Coupon>} The created coupon.
   */
  create(createCouponDto: CreateCouponDto): Promise<Coupon> {
    return this.prisma.coupon.create({
      data: createCouponDto,
    });
  }

  /**
   * Retrieves a birthday coupon valid for the next week.
   * @param {number} userId - The ID of the user.
   * @returns {Promise<Coupon>} The birthday coupon.
   * @throws {HttpException} If no valid birthday coupon is found.
   */
  async getBirthdayCoupon(userId: number): Promise<Coupon> {
    const today = new Date();
    const nextWeek = addDays(today, 6);

    const coupon = await this.prisma.coupon.findFirst({
      where: {
        userId,
        code: {
          startsWith: 'BDAY-',
        },
        redeemed: 0,
        validFrom: {
          lte: today,
        },
        validUntil: {
          gte: nextWeek,
        },
      },
    });

    if (coupon === null) {
      throw new HttpException('Birthday coupon not found', 404);
    }

    return coupon;
  }

  /**
   * Checks if a birthday coupon has been redeemed in the last year.
   * @param {number} userId - The ID of the user.
   * @returns {Promise<Coupon | null>} The redeemed birthday coupon or null if not found.
   */
  isBirthdayCouponRedeemed(userId: number): Promise<Coupon | null> {
    const oneYearAgo = addDays(new Date(), -360);

    return this.prisma.coupon.findFirst({
      where: {
        userId,
        code: {
          startsWith: 'BDAY-',
        },
        validFrom: {
          gte: oneYearAgo,
        },
        redeemed: 1,
      },
    });
  }

  /**
   * Checks coupon validity and returns the discount.
   * @param {string} code - The coupon code.
   * @param {number} userId - The ID of the user.
   * @returns {Promise<number>} The discount value.
   * @throws {HttpException} If the coupon is not found, does not belong to the user, has been redeemed, or is not valid for the current date.
   */
  async checkValidities(code: string, userId: number): Promise<number> {
    if (code === undefined || code.trim() === '') return 0;

    const coupon = await this.prisma.coupon.findUnique({
      where: {
        code,
      },
    });

    if (coupon === null) {
      throw new HttpException('Coupon not found', 404);
    }

    if (coupon.userId !== userId) {
      throw new HttpException('Coupon does not belong to user', 400);
    }

    if (coupon.redeemed >= coupon.maxRedemption) {
      throw new HttpException('Coupon has been redeemed already', 400);
    }

    const now = new Date();
    if (coupon.validFrom > now || coupon.validUntil < now) {
      throw new HttpException('Coupon is not valid for current date', 400);
    }

    return coupon.discount;
  }

  /**
   * Redeems a coupon.
   * @param {string} code - The coupon code.
   * @param {number} userId - The ID of the user.
   * @returns {Promise<void>}
   * @throws {HttpException} If the coupon is not found.
   */
  async redeemCoupon(code: string, userId: number): Promise<void> {
    const coupon = await this.prisma.coupon.update({
      where: {
        code,
        userId,
      },
      data: {
        redeemed: {
          increment: 1,
        },
      },
    });

    if (coupon === null) {
      throw new HttpException('Coupon not found', 404);
    }
  }

  /**
   * Finds all coupons.
   * @returns {Promise<Coupon[]>} A list of all coupons.
   */
  findAll(): Promise<Coupon[]> {
    return this.prisma.coupon.findMany();
  }

  /**
   * Finds a coupon by ID.
   * @param {number} id - The ID of the coupon.
   * @returns {Promise<Coupon | null>} The coupon or null if not found.
   */
  findOne(id: number): Promise<Coupon | null> {
    return this.prisma.coupon.findUnique({
      where: {
        id,
      },
    });
  }

  /**
   * Updates a coupon.
   * @param {number} id - The ID of the coupon.
   * @param {UpdateCouponDto} updateCouponDto - Data transfer object for updating a coupon.
   * @returns {Promise<Coupon>} The updated coupon.
   */
  update(id: number, updateCouponDto: UpdateCouponDto): Promise<Coupon> {
    return this.prisma.coupon.update({
      where: {
        id,
      },
      data: updateCouponDto,
    });
  }

  /**
   * Removes a coupon.
   * @param {number} id - The ID of the coupon.
   * @returns {Promise<Coupon>} The removed coupon.
   */
  remove(id: number): Promise<Coupon> {
    return this.prisma.coupon.delete({
      where: {
        id,
      },
    });
  }

  /**
   * Removes all coupons.
   * @returns {Promise<Prisma.BatchPayload>} The result of the delete operation.
   */
  removeAll(): Promise<Prisma.BatchPayload> {
    return this.prisma.coupon.deleteMany();
  }
}
