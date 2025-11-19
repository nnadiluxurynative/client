export type CartItem = {
  color: string;
  material: string;
  price: number;
  product: {
    _id: string;
    slug: string;
  };
  quantity: number;
  title: string;
  image?: string;
};
