import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CouponsService } from 'src/coupons/coupons.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, PrismaService, CouponsService],
})
export class OrdersModule {}
