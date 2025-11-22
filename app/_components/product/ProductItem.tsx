"use client";
import { useState } from "react";
import type { Product } from "@/app/_types/product";
import { formatNaira } from "@/app/_utils/helpers";
import Link from "next/link";

export default function ProductItem({ product }: { product: Product }) {
  const [hoverIndex, setHoverIndex] = useState(0);

  const handleMouseEnter = () => {
    if (product.images && product.images.length > 1) {
      setHoverIndex((i) => (i + 1) % product.images.length);
    }
  };

  const handleMouseLeave = () => setHoverIndex(0);

  // Product images in the shared type are objects { url, public_id }
  const currentImage =
    product.images?.[hoverIndex]?.url ?? product.images?.[0]?.url ?? "";

  // Derive a display price from the first material if present
  const displayPrice = product.materials?.[0]?.price ?? null;

  return (
    <div
      className="group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={`/shop/${product.slug}`}
        className="relative mb-2.5 block overflow-hidden bg-slate-100"
      >
        <img
          src={currentImage}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>
      <div>
        <h3 className="text-base font-medium">{product.title}</h3>
        <p className="mt-1 text-sm sm:text-base">
          {displayPrice !== null ? formatNaira(Number(displayPrice)) : "—"}
        </p>
      </div>
    </div>
  );
}
