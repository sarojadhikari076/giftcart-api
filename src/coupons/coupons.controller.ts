import { Controller, Get, Post, Body, UseGuards, Delete } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/users/get-user.decorator';
import { User } from '@prisma/client';
import { Throttle } from '@nestjs/throttler';
import { ApiTags, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiTags('Coupons')
@Controller('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Coupon created successfully',
    type: CreateCouponDto,
  })
  create(@Body() createCouponDto: CreateCouponDto) {
    return this.couponsService.create(createCouponDto);
  }

  @Post('check-validities')
  @ApiOkResponse({ description: 'Validity status of the coupon' })
  checkValidities(@Body() body: { coupon: string }, @GetUser() user: User) {
    return this.couponsService.checkValidities(body.coupon, user.id);
  }

  @Throttle({ default: { limit: 10, ttl: 3600 } })
  @Get('birthday')
  @ApiOkResponse({ description: 'Birthday coupon details' })
  getBirthdayCoupon(@GetUser() user: User) {
    return this.couponsService.getBirthdayCoupon(user.id);
  }

  @Delete('/remove-all')
  @ApiOkResponse({ description: 'All coupons removed' })
  removeAll() {
    return this.couponsService.removeAll();
  }
}
