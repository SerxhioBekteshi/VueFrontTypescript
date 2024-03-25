export default interface IOrderDetails {
  id: number;
  orderId?: number;
  orderIdGenerated?: string;
  payer?: any;
  create_time: Date;
  intent?: string;
  link?: string;
  items?: any;
  description?: string;
  currency?: string;
  valuePaid?: string;
  address?: string;
}
