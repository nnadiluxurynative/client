"use client";
import Container from "@/app/_components/Container";
import ProductItem from "@/app/_components/product/ProductItem";
import useProductStore from "@/app/_stores/productStore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { formatNaira } from "@/app/_utils/helpers";
import type { Product } from "@/app/_types/product";
import { useParams } from "next/navigation";
import Button from "@/app/_components/Button";

export default function page() {
  const { slug } = useParams();
  const { getProduct, getRelatedProducts } = useProductStore.getState();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [mainIndex, setMainIndex] = useState(0);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const p = await getProduct(`${slug}`);
        if (!mounted) return;
        setProduct(p);
        if (p) {
          const rel = await getRelatedProducts(p._id ?? p.slug);
          if (!mounted) return;
          setRelated(rel);
        }
      } catch (err) {
        console.error(err);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [slug, getProduct, getRelatedProducts]);

  const images = product?.images?.map((i) => i.url) ?? [];

  const displayPrice = product?.materials?.[0]?.price ?? null;

  if (!product) {
    return (
      <div className="py-12">
        <Container>
          <p>Loading product...</p>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-12">
      <Container>
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-[#3b3b3b]">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="hover:underline">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span className="font-medium">{product.title}</span>
        </div>

        <Container.Row>
          {/* Left: Images grid */}
          <Container.Row.Column className="w-full lg:w-1/2">
            <div className="flex gap-6">
              <div className="w-1/5 flex flex-col gap-3">
                {images.map((src, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMainIndex(idx)}
                    className={`overflow-hidden bg-slate-100 cursor-pointer transition-shadow ${
                      mainIndex === idx ? "" : ""
                    }`}
                  >
                    <img
                      src={src}
                      alt={`${product.title} ${idx + 1}`}
                      className="w-full object-cover"
                    />
                  </button>
                ))}
              </div>
              <div className="flex-1">
                <div className="bg-slate-100 overflow-hidden">
                  <img
                    src={images[mainIndex] ?? images[0] ?? ""}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </Container.Row.Column>

          {/* Right: Details */}
          <Container.Row.Column className="w-full lg:w-1/2">
            <h1 className="text-3xl font-medium mb-2">{product.title}</h1>
            <p className="text-sm mb-4">{product.description}</p>

            <div className="mb-4">
              <span className="text-xl">
                {displayPrice !== null
                  ? formatNaira(Number(displayPrice))
                  : "—"}
              </span>
            </div>

            <div className="mb-6 flex gap-4">
              <Button color="white" size="lg">
                Add to Cart
              </Button>
              <Button size="lg">Buy Now</Button>
            </div>

            {/* Additional details */}
            <div className="text-sm text-slate-700">
              <div className="mb-2">
                <strong>Materials:</strong>
                <div className="mt-1">
                  {product.materials?.map((m, i) => (
                    <div key={i} className="text-sm">
                      {m.name} — {formatNaira(Number(m.price))}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <strong>Colors:</strong>
                <div className="mt-1 flex gap-2 items-center">
                  {product.colors?.map((c, i) => (
                    <div
                      key={i}
                      title={c.name}
                      className="w-6 h-6 rounded-full"
                      style={{ background: c.hex }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Container.Row.Column>
        </Container.Row>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-medium mb-4">Related products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductItem key={p._id} product={p} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
