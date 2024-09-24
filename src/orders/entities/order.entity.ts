/**
 * Represents an order entity in the gift cart system.
 */
export class OrderEntity {
  /**
   * Unique identifier for the order.
   */
  id: number;

  /**
   * Total amount for the order.
   */
  total: number;

  /**
   * Discount applied to the order.
   */
  discount: number;

  /**
   * Shipping fee for the order.
   */
  shippingFee: number;

  /**
   * Current status of the order.
   */
  status: string;

  /**
   * Timestamp when the order was created.
   */
  createdAt: Date;

  /**
   * Timestamp when the order was last updated.
   */
  updatedAt: Date;
}
