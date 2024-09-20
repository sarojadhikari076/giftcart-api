import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartsService {
  constructor(private prisma: PrismaService) {}
  create(createCartDto: CreateCartDto, userId: number) {
    return this.prisma.cart.create({
      data: {
        ...createCartDto,
        userId,
      },
    });
  }

  findAll(userId: number) {
    return this.prisma.cart.findMany({
      where: {
        userId,
      },
      include: {
        product: true,
      },
    });
  }

  async summary(userId: number) {
    const carts = await this.prisma.cart.findMany({
      where: {
        userId,
      },
      include: {
        product: {
          select: {
            price: true,
          },
        },
      },
    });

    const subtotal = carts.reduce((acc, cart) => {
      return acc + cart.quantity * cart.product.price;
    }, 0);

    const shippingFee = 10;
    const total = subtotal + shippingFee;

    return {
      subtotal,
      total,
      shippingFee,
      clientSecret: 'fake-secret',
    };
  }

  findOne(id: number, userId: number) {
    return this.prisma.cart.findUnique({
      where: {
        id,
        userId,
      },
    });
  }

  update(id: number, updateCartDto: UpdateCartDto, userId: number) {
    return this.prisma.cart.update({
      where: {
        id,
        userId,
      },
      data: {
        quantity: updateCartDto.quantity,
      },
    });
  }

  remove(id: number, userId: number) {
    return this.prisma.cart.delete({
      where: {
        id,
        userId,
      },
    });
  }
}
