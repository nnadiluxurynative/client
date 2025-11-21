export type Product = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  createdAt: string;
  materials: {
    name: string;
    price: number;
  }[];
  images: {
    url: string;
    public_id: string;
  }[];
  colors: {
    name: string;
    hex: string;
  }[];
  isFeatured?: boolean;
};
export type ProductsState = {
  products: Product[];
  featuredProducts: Product[];
  getProduct: (idOrSlug: string) => Promise<Product | null>;
  getRelatedProducts: (idOrSlug: string) => Promise<Product[]>;
  getFeaturedProducts: () => Promise<Product[]>;
  fetchProducts: () => Promise<Product[]>;
};
