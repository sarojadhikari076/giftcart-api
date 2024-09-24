import { OrderStatus } from '@prisma/client';
import { IsString } from 'class-validator';

export class UpdateOrderDto {
  /**
   * Represents the status of the order being updated.
   *
   * @type {OrderStatus}
   * @example
   * const updateOrderDto = new UpdateOrderDto();
   * updateOrderDto.orderStatus = OrderStatus.SHIPPED;
   */
  @IsString()
  orderStatus: OrderStatus;
}
