import { Address } from "./address";
import { CartItem } from "./Cart";

export type Order = {
  status: "completed" | "pending" | "cancelled";
  email: string;
  ref: string;
  shippingAddress: Omit<Address, "user" | "isDefault" | "_id">;
  measurement: any;
  total: number;
  createdAt: string;
  items: CartItem[];
};

export type OrdersState = {
  orders: Order[];
  fetchOrders: () => Promise<void>;
  getOrder: (id: string) => Order | undefined;
  createOrder: (payload: { [key: string]: any }) => Promise<string>;
  verifyPayment: (
    _data: undefined,
    transactionId: string,
    txRef: string
  ) => Promise<Order | void>;
};
