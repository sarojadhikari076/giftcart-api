import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}
  async create(createOrderDto: CreateOrderDto, userId: number) {
    const coupon = await this.prisma.coupon.findFirst({
      where: {
        code: createOrderDto.couponCode,
      },
    });

    const carts = await this.prisma.cart.findMany({
      where: {
        userId,
      },
      include: {
        product: {
          select: {
            price: true,
            availableQuantity: true,
          },
        },
      },
    });

    const subtotal = carts.reduce((acc, cart) => {
      return acc + cart.quantity * cart.product.price;
    }, 0);

    await this.prisma.order.create({
      data: {
        userId,
        discount: 0,
        shippingFee: 0,
        couponId: coupon ? coupon.id : null,
        totalAmount: subtotal,
        products: {
          createMany: {
            data: carts.map(({ productId, quantity }) => ({
              productId,
              quantity,
            })),
          },
        },
      },
    });

    await this.prisma.cart.deleteMany({
      where: {
        userId,
      },
    });

    return {
      message: 'Order created successfully',
    };
  }

  findAll(userId: number) {
    return this.prisma.order.findMany({
      where: {
        userId,
      },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.prisma.order.update({
      where: {
        id,
      },
      data: {},
    });
  }

  remove(id: number, userId: number) {
    return this.prisma.order.delete({
      where: {
        id,
        userId,
      },
    });
  }
}
