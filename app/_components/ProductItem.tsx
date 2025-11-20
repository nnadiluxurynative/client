"use client";
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  images: string[];
  rating: number;
  reviews: number;
  badge?: string;
}

export default function ProductItem({ product }: { product: Product }) {
  const [hoverIndex, setHoverIndex] = useState(0);

  const handleMouseEnter = () => {
    if (product.images && product.images.length > 1) {
      setHoverIndex((i) => (i + 1) % product.images.length);
    }
  };

  const handleMouseLeave = () => setHoverIndex(0);

  const currentImage = product.images?.[hoverIndex] ?? product.image;

  return (
    <div
      className="group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative mb-4 overflow-hidden bg-slate-100 aspect-square">
        <img
          src={currentImage}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div>
        <h3 className="text-lg font-medium">{product.name}</h3>
        <p className="mt-1 font-semibold">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
}
