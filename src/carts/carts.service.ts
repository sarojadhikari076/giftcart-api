import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaymentsService } from 'src/payments/payments.service';
import { SHIPPING_FEE } from 'src/constants/app.constants';

@Injectable()
export class CartsService {
  constructor(
    private prisma: PrismaService,
    private payment: PaymentsService,
  ) {}

  // Create a new cart entry
  create(createCartDto: CreateCartDto, userId: number) {
    return this.prisma.cart.create({
      data: {
        ...createCartDto,
        userId,
      },
    });
  }

  // Retrieve all carts for a user
  findAll(userId: number) {
    return this.prisma.cart.findMany({
      where: { userId },
      include: { product: true },
    });
  }

  // Get cart summary with subtotal, total, and payment intent
  async summary(userId: number) {
    const carts = await this.findAll(userId);

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

  // Find a specific cart by ID for a user
  async findOne(id: number, userId: number) {
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

  // Update a cart entry
  async update(id: number, updateCartDto: UpdateCartDto, userId: number) {
    await this.findOne(id, userId); // Check if cart exists
    return this.prisma.cart.update({
      where: { id, userId },
      data: {
        quantity: updateCartDto.quantity,
      },
    });
  }

  // Remove a cart entry
  async remove(id: number, userId: number) {
    await this.findOne(id, userId); // Check if cart exists
    return this.prisma.cart.delete({
      where: { id, userId },
    });
  }
}
