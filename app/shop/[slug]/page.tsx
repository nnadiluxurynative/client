"use client";
import RequireLoginModal from "@/app/_components/auth/RequireLoginModal";
import Button from "@/app/_components/Button";
import Container from "@/app/_components/Container";
import SelectMeasurementModal from "@/app/_components/measurements/SelectMeasurementModal";
import Modal from "@/app/_components/modal/Modal";
import ProductItem from "@/app/_components/product/ProductItem";
import { useAuthStore } from "@/app/_stores/authStore";
import useProductStore from "@/app/_stores/productStore";
import type { Product } from "@/app/_types/product";
import { formatNaira, isLightColor } from "@/app/_utils/helpers";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

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
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const goPrev = () =>
    setMainIndex((i) => (i <= 0 ? images.length - 1 : i - 1));
  const goNext = () =>
    setMainIndex((i) => (i >= images.length - 1 ? 0 : i + 1));

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const endX = e.changedTouches[0].clientX;
    const delta = endX - touchStartX;
    const threshold = 50; // px
    if (delta > threshold) {
      goPrev();
    } else if (delta < -threshold) {
      goNext();
    }
    setTouchStartX(null);
  };

  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedMeasurementId, setSelectedMeasurementId] = useState<
    string | null
  >(null);
  const { user } = useAuthStore();

  // static sizes (use these instead of product-provided sizes)
  const SIZES = ["XS", "S", "M", "L", "XL"];

  useEffect(() => {
    if (!product) return;
    setSelectedMaterial(product.materials?.[0]?.name ?? null);
    setSelectedColor(product.colors?.[0]?.name ?? null);
    setSelectedSize(SIZES[0]);
  }, [product]);

  // price derived from selected material
  const displayPrice =
    product?.materials?.find((m) => m.name === selectedMaterial)?.price ??
    product?.materials?.[0]?.price ??
    null;

  // when color changes try to find a matching image url and show it
  useEffect(() => {
    if (!selectedColor) return;
    const lower = selectedColor.toLowerCase();
    const idx = images.findIndex((u) => u.toLowerCase().includes(lower));
    if (idx >= 0) setMainIndex(idx);
  }, [selectedColor, images]);

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
        <div className="mb-4 text-sm text-[#3b3b3b]">
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
        <Container.Row className="gap-y-4">
          <Container.Row.Column className="w-full lg:w-1/2">
            <div className="flex gap-6">
              {/* Thumbnails (desktop only) */}
              <div className="hidden sm:flex w-1/5 flex-col gap-3">
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

              {/* Main image / mobile slider */}
              <div className="flex-1 relative">
                <div
                  className="bg-slate-100 overflow-hidden relative"
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  <img
                    src={images[mainIndex] ?? images[0] ?? ""}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Mobile controls: left arrow, centered thumbnails (1/3 width), right arrow */}
                <div
                  className="sm:hidden text-xs gap-6 mt-4
                 w-full flex items-center justify-center"
                >
                  <button
                    type="button"
                    onClick={goPrev}
                    className="button"
                    aria-label="Previous image"
                  >
                    <BsChevronLeft size={14} />
                  </button>
                  <span>
                    {mainIndex + 1} / {images.length}
                  </span>
                  <button
                    type="button"
                    onClick={goNext}
                    aria-label="Next image"
                    className="button"
                  >
                    <BsChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </Container.Row.Column>

          {/* Right: Details */}
          <Container.Row.Column className="w-full lg:w-1/2">
            <div className="lg:pl-[30px]">
              <h1 className="text-2xl lg:text-3xl font-medium mb-3 lg:mb-4">
                {product.title}
              </h1>
              <div className="mb-4">
                <span className="text-xl">
                  {displayPrice !== null
                    ? formatNaira(Number(displayPrice))
                    : "—"}
                </span>
              </div>

              <div>
                <span className="font-medium">
                  Color: <span className="font-normal">{selectedColor}</span>
                </span>
                <div className="mt-2 mb-4 flex gap-2 items-center">
                  {product.colors?.map((c, i) => (
                    <button
                      key={i}
                      title={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={twMerge(
                        `w-8 h-8 cursor-pointer flex items-center border border-transparent justify-center overflow-hidden rounded-full`,
                        selectedColor === c.name && "border-[#121212]"
                      )}
                    >
                      <span
                        style={{ background: c.hex }}
                        className={twMerge(
                          "w-6 h-6 inline-block rounded-full",
                          isLightColor(c.hex) && "border-gray-400 border"
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="">
                <span className="font-medium">
                  Material:{" "}
                  <span className="font-normal">
                    {product.materials?.[0]?.name}
                  </span>
                </span>
                <div className="mt-2 mb-4 flex gap-2 items-center">
                  {product.materials?.map((m, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedMaterial(m.name)}
                      className={`cursor-pointer text-sm px-3 py-1 border ${
                        selectedMaterial === m.name
                          ? "border-black"
                          : "border-grey"
                      }`}
                    >
                      {m.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size selector (under materials) */}
              <div className="mb-6">
                <span className="font-medium block mb-2">Size</span>
                <div className="mt-2 flex gap-2 items-center">
                  {SIZES.length > 0 ? (
                    <>
                      {SIZES.map((s, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedSize(s)}
                          className={twMerge(
                            "px-3 py-1 border text-sm cursor-pointer",
                            selectedSize === s ? "border-black" : "border-grey"
                          )}
                        >
                          {s}
                        </button>
                      ))}

                      {/* Custom size option: if not logged in -> prompt login; otherwise open measurement selector */}
                      <Modal>
                        {user ? (
                          <Modal.Open opens="select-measurement">
                            <button
                              onClick={() => setSelectedSize("CUSTOM")}
                              className={twMerge(
                                "px-3 py-1 border text-sm cursor-pointer",
                                selectedSize === "CUSTOM"
                                  ? "border-black"
                                  : "border-grey"
                              )}
                            >
                              Custom
                            </button>
                          </Modal.Open>
                        ) : (
                          <Modal.Open opens="require-login">
                            <button
                              onClick={() => setSelectedSize("CUSTOM")}
                              className={twMerge(
                                "px-3 py-1 border text-sm cursor-pointer",
                                selectedSize === "CUSTOM"
                                  ? "border-black"
                                  : "border-grey"
                              )}
                            >
                              Custom
                            </button>
                          </Modal.Open>
                        )}

                        {/* Selection modal and login prompt live inside same Modal provider */}
                        <SelectMeasurementModal
                          onSelect={(id: string) => {
                            setSelectedMeasurementId(id);
                            // keep selectedSize as CUSTOM to indicate custom was chosen
                            setSelectedSize("CUSTOM");
                          }}
                        />

                        <RequireLoginModal
                          onCancel={() => setSelectedSize("XS")}
                        />
                      </Modal>
                    </>
                  ) : (
                    <div className="text-sm">One size</div>
                  )}
                </div>
              </div>
              <div className="mb-6 flex gap-3">
                <Button color="white" size="lg">
                  Add to cart
                </Button>
                <Button size="lg">Buy now</Button>
              </div>

              {/* Additional details */}
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
