import { HttpException, Injectable } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { addDays } from 'date-fns';

@Injectable()
export class CouponsService {
  constructor(private prisma: PrismaService) {}

  // Create a new coupon
  create(createCouponDto: CreateCouponDto) {
    return this.prisma.coupon.create({
      data: createCouponDto,
    });
  }

  // Get a birthday coupon valid for the next week
  async getBirthdayCoupon(userId: number) {
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

  // Check if a birthday coupon has been redeemed in the last week
  isBirthdayCouponRedeemed(userId: number) {
    const lastWeek = addDays(new Date(), -7);

    return this.prisma.coupon.findFirst({
      where: {
        userId,
        code: {
          startsWith: 'BDAY-',
        },
        validFrom: {
          gte: lastWeek,
        },
        redeemed: 1,
      },
    });
  }

  // Check coupon validity and return discount
  async checkValidities(code: string, userId: number) {
    if (code.trim() === '') return 0;

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

  // Redeem a coupon
  async redeemCoupon(code: string, userId: number) {
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

  // Find all coupons
  findAll() {
    return this.prisma.coupon.findMany();
  }

  // Find a coupon by ID
  findOne(id: number) {
    return this.prisma.coupon.findUnique({
      where: {
        id,
      },
    });
  }

  // Update a coupon
  update(id: number, updateCouponDto: UpdateCouponDto) {
    return this.prisma.coupon.update({
      where: {
        id,
      },
      data: updateCouponDto,
    });
  }

  // Remove a coupon
  remove(id: number) {
    return this.prisma.coupon.delete({
      where: {
        id,
      },
    });
  }

  // Remove all coupons
  removeAll() {
    return this.prisma.coupon.deleteMany();
  }
}
