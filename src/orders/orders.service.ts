import { HttpException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SHIPPING_FEE } from 'src/constants/app.constants';
import { CouponsService } from 'src/coupons/coupons.service';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly couponService: CouponsService,
  ) {}

  /**
   * Creates a new order for a user.
   *
   * @async
   * @param {CreateOrderDto} createOrderDto - The data transfer object containing the order details.
   * @param {number} userId - The ID of the user creating the order.
   * @returns {Promise<any>} A promise that resolves to the created order object.
   * @throws {HttpException} Throws an exception if the user's cart is empty (status 400).
   * @example
   * const order = await ordersService.create(createOrderDto, userId);
   * // order contains the newly created order details.
   */
  async create(createOrderDto: CreateOrderDto, userId: number) {
    const discount = await this.couponService.checkValidities(
      createOrderDto.coupon,
      userId,
    );

    if (discount > 0) {
      await this.couponService.redeemCoupon(createOrderDto.coupon, userId);
    }

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

    if (carts.length === 0) {
      throw new HttpException('Cart is empty', 400);
    }

    const subtotal = carts.reduce(
      (acc, cart) => acc + cart.quantity * cart.product.price,
      0,
    );
    const totalAmount = parseFloat(
      (subtotal + SHIPPING_FEE - discount * subtotal * 0.01).toFixed(2),
    );

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

    await this.prisma.cart.deleteMany({ where: { userId } });

    return order;
  }

  /**
   * Retrieves all orders for a specific user.
   *
   * @param {number} userId - The ID of the user whose orders are to be retrieved.
   * @returns {Promise<Order[]>} A promise that resolves to a list of orders for the user.
   * @example
   * const orders = await ordersService.findAll(userId);
   * // orders contains an array of the user's orders.
   */
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
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Retrieves a specific order by its ID for a user.
   *
   * @param {number} id - The ID of the order to retrieve.
   * @param {number} userId - The ID of the user who owns the order.
   * @returns {Promise<Order | null>} A promise that resolves to the order object if found, otherwise null.
   * @example
   * const order = await ordersService.findOne(orderId, userId);
   * // order contains the order details if found.
   */
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

  /**
   * Updates the status of an existing order.
   *
   * @param {number} id - The ID of the order to update.
   * @param {UpdateOrderDto} updateOrderDto - The data transfer object containing the new order status.
   * @returns {Promise<Order>} A promise that resolves to the updated order object.
   * @example
   * const updatedOrder = await ordersService.update(orderId, updateOrderDto);
   * // updatedOrder contains the details of the updated order.
   */
  update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.prisma.order.update({
      where: { id },
      data: { orderStatus: updateOrderDto.orderStatus },
    });
  }

  /**
   * Removes an order by its ID for a specific user.
   *
   * @param {number} id - The ID of the order to remove.
   * @param {number} userId - The ID of the user who owns the order.
   * @returns {Promise<Order>} A promise that resolves to the removed order object.
   * @example
   * const removedOrder = await ordersService.remove(orderId, userId);
   * // removedOrder contains the details of the deleted order.
   */
  remove(id: number, userId: number) {
    return this.prisma.order.delete({
      where: { id, userId },
    });
  }
}
