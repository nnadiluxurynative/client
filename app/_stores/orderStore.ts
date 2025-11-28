import API from "../_lib/axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Order, OrdersState } from "../_types/order";
import { GenericAPIResponse } from "../_types/api";
import { handleErrorMessage } from "../_utils/helpers";

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [],

      fetchOrders: async () => {
        try {
          // Make axios call
          const res = await API.get<GenericAPIResponse<Order[]>>(
            "/orders/my-orders"
          );

          // Set orders
          set({ orders: res.data.data });
        } catch (err: any) {
          const message = handleErrorMessage(err, "Failed to fetch");
          throw Error(message);
        }
      },
      getOrder: (id) => {
        const { orders } = get();
        const order = orders.find((_order, i) => Number(id) === i + 1001);
        return order;
      },
      createOrder: async (payload) => {
        try {
          const res = await API.post<GenericAPIResponse<any>>(
            "/orders",
            payload
          );
          return res.data.url;
        } catch (err: any) {
          const message = handleErrorMessage(err, "Failed to create order");
          throw Error(message);
        }
      },
      verifyPayment: async (
        _data: undefined,
        transactionId: string,
        txRef: string
      ) => {
        try {
          const res = await API.get<GenericAPIResponse<Order>>(
            `/orders/verify-order?tx_ref=${txRef}&transaction_id=${transactionId}`
          );
          return res.data.data;
        } catch (err: any) {
          const message = handleErrorMessage(
            err,
            "Payment verification failed"
          );
          throw Error(message);
        }
      },
    }),

    {
      name: "orders-storage",
      partialize: (state) => ({
        orders: state.orders,
      }),
    }
  )
);
