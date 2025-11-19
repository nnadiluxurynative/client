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
    }),

    {
      name: "orders-storage",
      partialize: (state) => ({
        orders: state.orders,
      }),
    }
  )
);
