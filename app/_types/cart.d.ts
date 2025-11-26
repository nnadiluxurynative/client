export type CartItem = {
  color: string;
  material: string;
  price: number;
  product: {
    _id: string;
    slug: string;
  };
  size: "XS" | "S" | "M" | "L" | "XL" | string;
  quantity: number;
  title: string;
  image?: string;
  measurement?: any;
};

export type CartState = {
  items: CartItem[];
  isOpen: boolean;
  toggleCart: () => void;
  addItem: (item: CartItem) => void;
  removeItem: (
    productId: string,
    color: string,
    material: string,
    size: string
  ) => void;
  updateQuantity: (
    productId: string,
    color: string,
    material: string,
    size: string,
    quantity: number
  ) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
};
