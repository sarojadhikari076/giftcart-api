import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaymentsService } from 'src/payments/payments.service';
import { SHIPPING_FEE } from 'src/constants/app.constants';
import { Cart } from '@prisma/client';
import { CartSummary } from './entity/cart.entity';

@Injectable()
export class CartsService {
  constructor(
    private prisma: PrismaService,
    private payment: PaymentsService,
  ) {}

  /**
   * Creates a new cart entry for a user.
   *
   * @param {CreateCartDto} createCartDto - Data transfer object containing cart item details.
   * @param {number} userId - ID of the user creating the cart.
   * @returns {Promise<Cart>} The created cart entry.
   * @example
   * const cartEntry = await cartsService.create({ productId: 1, quantity: 2 }, userId);
   */
  create(createCartDto: CreateCartDto, userId: number): Promise<Cart> {
    return this.prisma.cart.create({
      data: {
        ...createCartDto,
        userId,
      },
    });
  }

  /**
   * Retrieves all carts associated with a specific user.
   *
   * @param {number} userId - ID of the user whose carts are to be retrieved.
   * @returns {Promise<Cart[]>} An array of cart entries for the specified user.
   * @example
   * const userCarts = await cartsService.findAll(userId);
   */
  findAll(userId: number): Promise<Cart[]> {
    return this.prisma.cart.findMany({
      where: { userId },
      include: { product: true },
    });
  }

  /**
   * Gets a summary of the user's cart, including subtotal, total, and payment intent.
   *
   * @param {number} userId - ID of the user whose cart summary is to be retrieved.
   * @returns {Promise<CartSummary>} The cart summary containing subtotal, total, shipping fee, and payment intent client secret.
   * @example
   * const cartSummary = await cartsService.summary(userId);
   */
  async summary(userId: number): Promise<CartSummary> {
    const carts = await this.prisma.cart.findMany({
      where: { userId },
      include: { product: true },
    });

    const subtotal = carts.reduce((acc, cart) => {
      return acc + cart.quantity * cart.product.price;
    }, 0);

    const total = subtotal + SHIPPING_FEE;
    const intent = await this.payment.createPaymentIntent(total, 'GBP');

    return {
      subtotal,
      total,
      shippingFee: SHIPPING_FEE,
      clientSecret: intent.client_secret,
      discount: 0,
    };
  }

  /**
   * Finds a specific cart entry by its ID for a user.
   *
   * @param {number} id - ID of the cart entry to be retrieved.
   * @param {number} userId - ID of the user who owns the cart.
   * @returns {Promise<Cart>} The found cart entry.
   * @throws {NotFoundException} If the cart entry is not found for the specified user.
   * @example
   * const cartItem = await cartsService.findOne(cartId, userId);
   */
  async findOne(id: number, userId: number): Promise<Cart> {
    const cart = await this.prisma.cart.findUnique({
      where: { id, userId },
    });

    if (!cart) {
      throw new NotFoundException(
        `Cart with ID ${id} not found for user ${userId}`,
      );
    }

    return cart;
  }

  /**
   * Updates an existing cart entry.
   *
   * @param {number} id - ID of the cart entry to be updated.
   * @param {UpdateCartDto} updateCartDto - Data transfer object containing updated cart details.
   * @param {number} userId - ID of the user who owns the cart.
   * @returns {Promise<Cart>} The updated cart entry.
   * @example
   * const updatedCart = await cartsService.update(cartId, { quantity: 3 }, userId);
   */
  async update(
    id: number,
    updateCartDto: UpdateCartDto,
    userId: number,
  ): Promise<Cart> {
    await this.findOne(id, userId); // Check if cart exists
    return this.prisma.cart.update({
      where: { id, userId },
      data: {
        quantity: updateCartDto.quantity,
      },
    });
  }

  /**
   * Removes a cart entry by its ID.
   *
   * @param {number} id - ID of the cart entry to be removed.
   * @param {number} userId - ID of the user who owns the cart.
   * @returns {Promise<Cart>} The removed cart entry.
   * @example
   * const removedCart = await cartsService.remove(cartId, userId);
   */
  async remove(id: number, userId: number): Promise<Cart> {
    await this.findOne(id, userId); // Check if cart exists
    return this.prisma.cart.delete({
      where: { id, userId },
    });
  }
}
