import { HttpException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SHIPPING_FEE } from 'src/constants/app.constants';
import { CouponsService } from 'src/coupons/coupons.service';

@Injectable()
export class OrdersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly couponService: CouponsService,
  ) {}

  // Create a new order
  async create(createOrderDto: CreateOrderDto, userId: number) {
    // Check coupon validity and redeem if applicable
    const discount = await this.couponService.checkValidities(
      createOrderDto.coupon,
      userId,
    );

    if (discount > 0) {
      await this.couponService.redeemCoupon(createOrderDto.coupon, userId);
    }

    // Fetch the user's cart items
    const carts = await this.prisma.cart.findMany({
      where: { userId },
      include: {
        product: {
          select: {
            price: true,
            availableQuantity: true,
          },
        },
      },
    });

    // Validate cart is not empty
    if (carts.length === 0) {
      throw new HttpException('Cart is empty', 400);
    }

    // Calculate subtotal and total amount
    const subtotal = carts.reduce(
      (acc, cart) => acc + cart.quantity * cart.product.price,
      0,
    );
    const totalAmount = parseFloat(
      (subtotal + SHIPPING_FEE - discount * subtotal * 0.01).toFixed(2),
    );

    // Create the order in the database
    const order = await this.prisma.order.create({
      data: {
        userId,
        discount,
        shippingFee: SHIPPING_FEE,
        totalAmount,
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

    // Clear the user's cart after the order is created
    await this.prisma.cart.deleteMany({ where: { userId } });

    return order;
  }

  // Retrieve all orders for a user
  findAll(userId: number) {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' }, // Sort by latest order first
    });
  }

  // Retrieve a specific order by ID
  findOne(id: number, userId: number) {
    return this.prisma.order.findUnique({
      where: { id, userId },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  // Update the order status
  update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.prisma.order.update({
      where: { id },
      data: { orderStatus: updateOrderDto.orderStatus },
    });
  }

  // Remove an order by ID
  remove(id: number, userId: number) {
    return this.prisma.order.delete({
      where: { id, userId },
    });
  }
}
