"use client";
import Accordion from "@/app/_components/Accordion";
import Button from "@/app/_components/Button";
import Container from "@/app/_components/Container";
import SelectMeasurementModal from "@/app/_components/measurements/SelectMeasurementModal";
import Modal from "@/app/_components/modal/Modal";
import Loader from "@/app/_components/product/Loader";
import ProductItem from "@/app/_components/product/ProductItem";
import { useAuthStore } from "@/app/_stores/authStore";
import { useCartStore } from "@/app/_stores/cartStore";
import useProductStore from "@/app/_stores/productStore";
import { Measurement } from "@/app/_types/measurement";
import type { Product } from "@/app/_types/product";
import { formatNaira, isLightColor } from "@/app/_utils/helpers";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

export default function page() {
  const router = useRouter();
  const { slug } = useParams();
  const { getProduct, getRelatedProducts } = useProductStore.getState();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [mainIndex, setMainIndex] = useState(0);
  const { addItem, toggleCart } = useCartStore();

  // Fetch product and related products on mount or when slug changes
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const p = await getProduct(`${slug}`);
        const rel = await getRelatedProducts(`${slug}`);
        setProduct(p);
        setRelated(rel);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug, getProduct, getRelatedProducts]);

  // Prepare image URLs and touch state for mobile slider
  const images = product?.images?.map((i) => i.url) ?? [];
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Navigate to previous or next image
  const goPrev = () =>
    setMainIndex((i) => (i <= 0 ? images.length - 1 : i - 1));
  const goNext = () =>
    setMainIndex((i) => (i >= images.length - 1 ? 0 : i + 1));

  // Handle touch start event for swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  // Handle touch end event for swipe gestures
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
  const [selectedMeasurement, setSelectedMeasurement] =
    useState<Measurement | null>(null);
  // Get user from auth store
  const { user } = useAuthStore();

  // static sizes (use these instead of product-provided sizes)
  const SIZES = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];

  // Initialize selected options when product loads
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

  // Handle add to cart
  const handleAddToCart = () => {
    // Check required selections
    if (!product || !selectedMaterial || !selectedColor || !selectedSize)
      return;

    // Prepare payload for cart
    const payload = {
      product: {
        _id: product._id,
        slug: product.slug,
      },
      color: selectedColor,
      material: selectedMaterial,
      size: selectedSize,
      quantity: 1,
      title: product.title,
      price: displayPrice ?? 0,
      image: images[0] ?? undefined,
      measurement: selectedMeasurement?.details ?? undefined,
    };
    // Add item to cart
    addItem(payload);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // Redirect to checkout or cart page
    router.push("/checkout");
  };

  if (!loading && !product) {
    return (
      <div className="py-12">
        <Container>
          <div className="text-center text-gray-500">Product not found.</div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-12">
      <Container className="transition-all">
        {/* Breadcrumb */}
        {loading ? (
          <div className="mb-4 flex gap-2 items-center">
            <div className="h-4 w-12 bg-gray-200 animate-pulse" />
            <span className="text-gray-300">/</span>
            <div className="h-4 w-16 bg-gray-200 animate-pulse" />
            <span className="text-gray-300">/</span>
            <div className="h-4 w-32 bg-gray-200 animate-pulse" />
          </div>
        ) : (
          <div className="mb-4 text-sm text-[#3b3b3b]">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/shop" className="hover:underline">
              Shop
            </Link>
            <span className="mx-2">/</span>
            <span className="font-medium">{product?.title}</span>
          </div>
        )}
        <Container.Row className="gap-y-4">
          {/* Left: Images */}
          <Container.Row.Column className="w-full lg:w-1/2">
            {loading ? (
              <div className="flex gap-6">
                {/* Thumbnails skeleton (desktop) */}
                <div className="hidden sm:flex w-1/5 flex-col gap-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="bg-gray-200 aspect-square animate-pulse"
                    />
                  ))}
                </div>
                {/* Main image skeleton */}
                <div className="flex-1">
                  <div className="aspect-square bg-gray-200 animate-pulse" />
                  {/* Mobile controls skeleton */}
                  <div className="sm:hidden flex items-center justify-center gap-6 mt-4">
                    <div className="h-6 w-6 bg-gray-200 animate-pulse" />
                    <div className="h-4 w-12 bg-gray-200 animate-pulse" />
                    <div className="h-6 w-6 bg-gray-200 animate-pulse" />
                  </div>
                </div>
              </div>
            ) : (
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
                        alt={`${product?.title} ${idx + 1}`}
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
                      alt={product?.title}
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
            )}
          </Container.Row.Column>

          {/* Right: Details (sticky on large screens) */}
          <Container.Row.Column className="w-full lg:w-1/2">
            {loading ? (
              <div className="lg:pl-[30px] lg:sticky lg:top-24">
                {/* Title skeleton */}
                <div className="h-8 w-3/4 bg-gray-200 animate-pulse mb-4" />
                {/* Price skeleton */}
                <div className="h-6 w-32 bg-gray-200 animate-pulse mb-4" />

                {/* Color skeleton */}
                <div className="mb-4">
                  <div className="h-5 w-20 bg-gray-200 animate-pulse mb-2" />
                  <div className="bg-gray-200 animate-pulse h-5 w-32" />
                </div>

                {/* Material skeleton */}
                <div className="mb-4">
                  <div className="h-5 w-24 bg-gray-200 animate-pulse mb-2" />
                  <div className="flex gap-2">
                    {[1, 2].map((i) => (
                      <div
                        key={i}
                        className="h-8 w-20 bg-gray-200 animate-pulse"
                      />
                    ))}
                  </div>
                </div>

                {/* Size skeleton */}
                <div className="mb-6">
                  <div className="h-5 w-16 bg-gray-200 animate-pulse mb-2" />

                  <div className="h-8 w-1/3 bg-gray-200 animate-pulse" />
                </div>

                {/* Buttons skeleton */}
                <div className="mb-6 flex gap-3">
                  <div className="h-12 w-40 bg-gray-200 animate-pulse" />
                  <div className="h-12 w-40 bg-gray-200 animate-pulse" />
                </div>
              </div>
            ) : (
              <div className="lg:pl-[30px] lg:sticky lg:top-24">
                <h1 className="text-2xl lg:text-3xl font-medium mb-2 lg:mb-3">
                  {product?.title}
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
                    {product?.colors?.map((c, i) => (
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
                      {product?.materials?.[0]?.name}
                    </span>
                  </span>
                  <div className="mt-2 mb-4 flex gap-2 items-center">
                    {product?.materials?.map((m, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedMaterial(m.name)}
                        className={`cursor-pointer rounded-xs text-sm px-3 py-1 border ${
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
                  <div className="mt-2 flex gap-2 items-center flex-wrap">
                    {SIZES.length > 0 ? (
                      <>
                        {SIZES.map((s, i) => (
                          <button
                            key={i}
                            onClick={() => setSelectedSize(s)}
                            className={twMerge(
                              "px-3 py-1 border text-sm rounded-xs cursor-pointer",
                              selectedSize === s
                                ? "border-black"
                                : "border-grey"
                            )}
                          >
                            {s}
                          </button>
                        ))}
                        {/* Custom size - only show if user is logged in and has measurements */}
                        {user &&
                          user.measurements &&
                          user.measurements.length > 0 && (
                            <Modal>
                              <Modal.Open opens="select-measurement">
                                <button
                                  onClick={() => setSelectedSize("CUSTOM")}
                                  className={twMerge(
                                    "px-3 py-1 border text-sm rounded-xs cursor-pointer",
                                    selectedSize === "CUSTOM"
                                      ? "border-black"
                                      : "border-grey"
                                  )}
                                >
                                  Custom
                                </button>
                              </Modal.Open>
                              <SelectMeasurementModal
                                onSelect={(measurement: Measurement) => {
                                  setSelectedMeasurement(measurement);
                                  setSelectedSize("CUSTOM");
                                }}
                              />
                            </Modal>
                          )}
                      </>
                    ) : (
                      <div className="text-sm">One size</div>
                    )}
                  </div>
                </div>
                <div className="flex gap-3 max-[350px]:*:min-w-[calc(50%-6px)] ">
                  <Button
                    color="white"
                    size="lg"
                    onClick={() => {
                      handleAddToCart();
                      toggleCart();
                    }}
                  >
                    Add to cart
                  </Button>
                  <Button size="lg" onClick={handleBuyNow}>
                    Buy now
                  </Button>
                </div>

                {/* Accordions for Details and Care */}
                <div className="mt-6">
                  <Accordion>
                    <Accordion.Item
                      idx={0}
                      item={{
                        question: "Details",
                        answer: (
                          <div>
                            <p className="mb-3">{product?.description}</p>
                            {product?.features &&
                              product.features.length > 0 && (
                                <>
                                  <h3 className="font-medium mb-1 text-[#121212]">
                                    Features
                                  </h3>
                                  <ul className="list-disc space-y-1 marker:text-[#121212]">
                                    {product.features.map((feat, i) => (
                                      <li key={i}>{feat}</li>
                                    ))}
                                  </ul>
                                </>
                              )}
                          </div>
                        ),
                      }}
                    />
                    <Accordion.Item
                      idx={1}
                      item={{
                        question: "Size & Fit",
                        answer: (
                          <div>
                            <div className="mb-3">
                              <h3 className="font-medium mb-1 text-[#121212]">
                                Size Help
                              </h3>
                              <p>
                                Still unsure what size to get? Check out our{" "}
                                <Link href="/size-chart">
                                  <button className="cursor-pointer link--underline">
                                    size guide.
                                  </button>
                                </Link>
                              </p>
                            </div>
                            <div className="mb-3">
                              <h3 className="font-medium mb-1 text-[#121212]">
                                Fit Options
                              </h3>
                              <ul className="list-disc pl-5 space-y-1 marker:text-[#121212]">
                                <li>
                                  <span className="font-medium text-[#121212]">
                                    Slim:
                                  </span>{" "}
                                  Fitted silhouette, modern cut
                                </li>
                                <li>
                                  <span className="font-medium text-[#121212]">
                                    Regular:
                                  </span>{" "}
                                  Classic fit, comfortable
                                </li>
                                <li>
                                  <span className="font-medium text-[#121212]">
                                    Relaxed:
                                  </span>{" "}
                                  Loose fit, traditional style
                                </li>
                              </ul>
                            </div>
                          </div>
                        ),
                      }}
                    />
                    <Accordion.Item
                      idx={2}
                      item={{
                        question: "Shipping & Returns",
                        answer: (
                          <div>
                            <div className="mb-3">
                              <h3 className="font-medium mb-1 text-[#121212]">
                                Production time
                              </h3>
                              <p>
                                Each piece is handcrafted to order. Please allow
                                2-3 weeks for production and delivery.
                              </p>
                            </div>
                            <div className="mb-3">
                              <h3 className="font-medium mb-1 text-[#121212]">
                                Shipping
                              </h3>
                              <ul className="list-disc pl-5 space-y-1 marker:text-[#121212]">
                                <li>Free shipping within Nigeria</li>
                                <li>
                                  International shipping available on request
                                </li>
                              </ul>
                            </div>
                            <div className="mb-3">
                              <h3 className="font-medium mb-1 text-[#121212]">
                                Returns
                              </h3>
                              <p>
                                Due to the custom nature of our garments, we
                                cannot accept returns. However, we offer
                                complimentary alterations within 30 days of
                                delivery if adjustments are needed.
                              </p>
                            </div>
                          </div>
                        ),
                      }}
                    />
                  </Accordion>
                </div>
              </div>
            )}
          </Container.Row.Column>
        </Container.Row>

        {/* Related products */}
        <div className="mt-12">
          {loading ? (
            <div className="h-6 w-40 bg-gray-200 animate-pulse mb-4" />
          ) : (
            <h2 className="text-xl font-medium mb-4">Related products</h2>
          )}
          {loading ? (
            <Loader
              className="lg:grid-cols-4"
              count={4}
              imgHeight="sm:h-[400px]"
            />
          ) : (
            <div className="grid grid-cols-1 min-[400px]:grid-cols-2 lg:grid-cols-4 gap-6 gap-y-8">
              {related.map((p) => (
                <ProductItem key={p._id} product={p} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
