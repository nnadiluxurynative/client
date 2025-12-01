import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartState } from "../_types/cart";

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      addItem: (item) => {
        set((state) => {
          // Check if item already exists (same product, color, material, and size)
          const existingItemIndex = state.items.findIndex(
            (i) =>
              i.product._id === item.product._id &&
              i.color === item.color &&
              i.material === item.material &&
              i.size === item.size
          );

          if (existingItemIndex >= 0) {
            // Increment quantity if item exists
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              quantity: updatedItems[existingItemIndex].quantity + 1,
            };
            return { items: updatedItems };
          } else {
            // Add new item with quantity 1
            return {
              items: [...state.items, { ...item, quantity: 1 }],
            };
          }
        });
      },

      removeItem: (productId, color, material, size) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.product._id === productId &&
                item.color === color &&
                item.material === material &&
                item.size === size
              )
          ),
        }));
      },

      updateQuantity: (productId, color, material, size, quantity) => {
        set((state) => {
          if (quantity <= 0) {
            // Remove item if quantity is 0 or negative
            return {
              items: state.items.filter(
                (item) =>
                  !(
                    item.product._id === productId &&
                    item.color === color &&
                    item.material === material &&
                    item.size === size
                  )
              ),
            };
          }

          // Update quantity
          return {
            items: state.items.map((item) =>
              item.product._id === productId &&
              item.color === color &&
              item.material === material &&
              item.size === size
                ? { ...item, quantity }
                : item
            ),
          };
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getCartTotal: () => {
        const { items } = get();
        return items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getCartCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
