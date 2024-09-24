import { PartialType } from '@nestjs/swagger';
import { CreateCouponDto } from './create-coupon.dto';

/**
 * Data Transfer Object (DTO) for updating a coupon.
 *
 * This class extends the `PartialType` of `CreateCouponDto`,
 */
export class UpdateCouponDto extends PartialType(CreateCouponDto) {}
