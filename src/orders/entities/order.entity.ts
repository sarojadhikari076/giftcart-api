export class OrderEntity {
  id: number;
  total: number;
  discount: number;
  shippingFee: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
