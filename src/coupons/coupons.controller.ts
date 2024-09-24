import { Controller, Get, Post, Body, UseGuards, Delete } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/users/get-user.decorator';
import { Role, User } from '@prisma/client';
import { Throttle } from '@nestjs/throttler';
import {
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@UseGuards(JwtAuthGuard)
@ApiTags('Coupons')
@Controller('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  /**
   * Create a new coupon.
   * @param createCouponDto - Data transfer object containing coupon details.
   * @returns The created coupon.
   */
  @Post()
  @ApiOperation({
    summary: 'Create a new coupon',
    description: 'Create and store a new discount coupon in the system.',
  })
  @ApiCreatedResponse({
    description: 'Coupon created successfully.',
    type: CreateCouponDto,
  })
  @ApiBadRequestResponse({
    description:
      'Invalid coupon data. Ensure all required fields are correctly filled.',
  })
  create(@Body() createCouponDto: CreateCouponDto) {
    return this.couponsService.create(createCouponDto);
  }

  /**
   * Check coupon validity for the current user.
   * @param body - Object containing the coupon code.
   * @param user - The current authenticated user.
   * @returns Validity status of the coupon.
   */
  @Post('check-validities')
  @ApiOperation({
    summary: 'Check coupon validity',
    description:
      "Verify if the provided coupon is valid for the current user. Valid coupons are based on the user's profile and the coupon's expiration date.",
  })
  @ApiOkResponse({ description: 'Coupon is valid or invalid.' })
  @ApiUnauthorizedResponse({ description: 'User is not authenticated.' })
  checkValidities(@Body() body: { coupon: string }, @GetUser() user: User) {
    return this.couponsService.checkValidities(body.coupon, user.id);
  }

  /**
   * Retrieve a special birthday coupon for the current user.
   * @param user - The current authenticated user.
   * @returns Birthday coupon details.
   */
  @Throttle({ default: { limit: 10, ttl: 3600 } })
  @Get('birthday')
  @ApiOperation({
    summary: 'Retrieve birthday coupon',
    description:
      'Fetch a special discount coupon tied to the user’s birthday. Each user is entitled to one birthday coupon per year.',
  })
  @ApiOkResponse({ description: 'Birthday coupon details.' })
  @ApiUnauthorizedResponse({ description: 'User is not authenticated.' })
  getBirthdayCoupon(@GetUser() user: User) {
    return this.couponsService.getBirthdayCoupon(user.id);
  }

  /**
   * Remove all coupons from the system.
   * @returns Confirmation of coupon removal.
   */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete('/remove-all')
  @ApiOperation({
    summary: 'Remove all coupons',
    description:
      'Delete all discount coupons from the system. This action is irreversible and should be used with caution.',
  })
  @ApiOkResponse({ description: 'All coupons have been removed successfully.' })
  @ApiUnauthorizedResponse({ description: 'User is not authorized.' })
  @ApiBadRequestResponse({ description: 'Invalid request.' })
  @ApiForbiddenResponse({
    description: 'User does not have the required role.',
  })
  removeAll() {
    return this.couponsService.removeAll();
  }
}
