import API from "../_lib/axios";
import { create } from "zustand";
import { GenericAPIResponse } from "../_types/api";
import { handleErrorMessage } from "../_utils/helpers";
import { Product, ProductsState } from "../_types/product";

const CACHE_DURATION_MS = 15 * 60 * 1000; // 5 minutes

export const useProductStore = create<ProductsState>((set, get) => ({
  products: [],
  lastFetched: null,
  featuredProducts: [],

  fetchProducts: async () => {
    const { lastFetched } = get();
    const now = new Date();
    if (
      lastFetched &&
      now.getTime() - lastFetched.getTime() < CACHE_DURATION_MS
    ) {
      // Return cached products if within cache duration
      return get().products;
    }

    try {
      const res = await API.get<GenericAPIResponse<Product[]>>(`/products`);
      const data = res.data.data ?? [];
      set({ products: data, lastFetched: new Date() });
      return data;
    } catch (err: any) {
      const message = handleErrorMessage(err, "Failed to fetch products");
      throw Error(message);
    }
  },

  getProduct: async (idOrSlug) => {
    try {
      // Try to find in local cache first
      const { products } = get();
      const found = products.find(
        (p) =>
          String(p._id) === String(idOrSlug) ||
          p.slug === idOrSlug ||
          p._id === idOrSlug
      );
      if (found) return found;

      const res = await API.get<GenericAPIResponse<Product>>(
        `/products/${idOrSlug}`
      );
      return res.data.data ?? null;
    } catch (err: any) {
      const message = handleErrorMessage(err, "Failed to fetch product");
      throw Error(message);
    }
  },

  getRelatedProducts: async (idOrSlug) => {
    try {
      const res = await API.get<GenericAPIResponse<Product[]>>(
        `/products/related/${idOrSlug}`
      );
      return res.data.data ?? [];
    } catch (err: any) {
      const message = handleErrorMessage(
        err,
        "Failed to fetch related products"
      );
      throw Error(message);
    }
  },

  searchProducts: async (searchTerm: string) => {
    try {
      const res = await API.get<GenericAPIResponse<Product[]>>(
        `/products?search=${encodeURIComponent(searchTerm)}`
      );
      return res.data.data ?? [];
    } catch (err: any) {
      const message = handleErrorMessage(err, "Search failed");
      throw Error(message);
    }
  },

  getProductsByCategory: async (categorySlug: string) => {
    try {
      const res = await API.get<GenericAPIResponse<Product[]>>(
        `/products/category/${encodeURIComponent(categorySlug)}`
      );
      return res.data.data ?? [];
    } catch (err: any) {
      const message = handleErrorMessage(err, "Failed to fetch products");
      throw Error(message);
    }
  },

  getFeaturedProducts: async () => {
    try {
      const res = await API.get<GenericAPIResponse<Product[]>>(
        `/products?isFeatured=true`
      );
      const data = res.data.data ?? [];
      set({ featuredProducts: data });
      return data;
    } catch (err: any) {
      const message = handleErrorMessage(
        err,
        "Failed to fetch featured products"
      );
      throw Error(message);
    }
  },
}));

export default useProductStore;
