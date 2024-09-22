import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaymentsService } from 'src/payments/payments.service';

@Module({
  controllers: [CartsController],
  providers: [CartsService, PrismaService, PaymentsService],
})
export class CartsModule {}
