import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { CouponsService } from 'src/coupons/coupons.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, UsersService, PrismaService, CouponsService],
})
export class ProductsModule {}
