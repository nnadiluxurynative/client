"use client";
import { useModalContext } from "@/app/_components/modal/ModalContext";
import type { Product } from "@/app/_types/product";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BsChevronDown, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { twMerge } from "tailwind-merge";
import { Setting4 } from "iconsax-react";
import NoProductsFilter from "@/app/_components/product/NoProductsFilter";
import ProductItem from "@/app/_components/product/ProductItem";
import Modal from "@/app/_components/modal/Modal";
import Container from "@/app/_components/Container";
import Button from "@/app/_components/Button";
import Form from "@/app/_components/Form";
import Loader from "@/app/_components/product/Loader";
import useProductStore from "@/app/_stores/productStore";

export default function CategoryPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { slug } = useParams();
  const { getProductsByCategory } = useProductStore.getState();

  // Fetch products for this category via search term
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await getProductsByCategory(String(slug));
        setProducts(res);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug, getProductsByCategory]);

  // Read filters from URL
  const urlSort = searchParams.get("sort") || "newest";
  const urlPrice = searchParams.get("price") || "all";
  const [sortBy, setSortBy] = useState(urlSort);
  const [filterPrice, setFilterPrice] = useState(urlPrice);

  useEffect(() => {
    setSortBy(urlSort);
    setFilterPrice(urlPrice);
  }, [urlSort, urlPrice]);

  const itemsPerPage = 12;
  const currentPageFromUrl = parseInt(searchParams.get("page") || "1", 10);
  const [page, setPage] = useState<number>(currentPageFromUrl);
  useEffect(() => {
    if (currentPageFromUrl !== page) setPage(currentPageFromUrl);
  }, [currentPageFromUrl]);

  const priceOf = (p: Product) => p.materials?.[0]?.price ?? 0;

  const getFilteredAndSortedProducts = () => {
    let filtered: Product[] = [...products];

    switch (filterPrice) {
      case "under-200":
        filtered = filtered.filter((p) => priceOf(p) < 200000);
        break;
      case "200-300":
        filtered = filtered.filter(
          (p) => priceOf(p) >= 200000 && priceOf(p) <= 300000
        );
        break;
      case "over-300":
        filtered = filtered.filter((p) => priceOf(p) > 300000);
        break;
    }

    switch (sortBy) {
      case "newest":
        filtered = filtered.sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return dateB - dateA;
        });
        break;
      case "price-low":
        filtered = filtered.sort((a, b) => priceOf(a) - priceOf(b));
        break;
      case "price-high":
        filtered = filtered.sort((a, b) => priceOf(b) - priceOf(a));
        break;
      case "featured":
        filtered = filtered.filter((p) => p.isFeatured);
        break;
      case "a-z":
        filtered = filtered.sort((a, b) =>
          (a.title ?? "").localeCompare(b.title ?? "")
        );
        break;
      case "z-a":
        filtered = filtered.sort((a, b) =>
          (b.title ?? "").localeCompare(a.title ?? "")
        );
        break;
    }

    return filtered;
  };

  const filteredProducts = getFilteredAndSortedProducts();
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleFilterChange = (newSort?: string, newPrice?: string) => {
    const sort = newSort ?? sortBy;
    const price = newPrice ?? filterPrice;
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", sort);
    params.set("price", price);
    params.set("page", "1");
    setPage(1);
    router.push(`/shop/category/${slug}?${params.toString()}`);
  };

  const hasActiveFilters = sortBy !== "newest" || filterPrice !== "all";

  function MobileFiltersContent() {
    const { close } = useModalContext();
    const [localPrice, setLocalPrice] = useState<string>(filterPrice);
    const [localSort, setLocalSort] = useState<string>(sortBy);

    return (
      <Form>
        <div>
          <label className="text-sm font-medium mb-1 inline-block">
            Filter
          </label>
          <div className="relative">
            <select
              value={localPrice}
              onChange={(e) => setLocalPrice(e.target.value)}
              className="appearance-none rounded-xs w-full px-3 pr-10 text-sm py-2 border border-[#767676] bg-white cursor-pointer transition-all font-medium  min-h-10 *:font-sans"
              aria-label="Filter by price"
            >
              <option value="all">All Prices</option>
              <option value="under-200">Under ₦200K</option>
              <option value="200-300">₦200K - ₦300K</option>
              <option value="over-300">Over ₦300K</option>
            </select>
            <BsChevronDown
              size={16}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium mb-1 inline-block">Sort</label>
          <div className="relative">
            <select
              value={localSort}
              onChange={(e) => setLocalSort(e.target.value)}
              className="appearance-none rounded-xs px-3 w-full pr-10 text-sm py-2 border border-[#767676] bg-white cursor-pointer transition-all font-medium  min-h-10 *:font-sans"
              aria-label="Sort products"
            >
              <option value="newest">Newest</option>
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="a-z">A-Z</option>
              <option value="z-a">Z-A</option>
            </select>
            <BsChevronDown
              size={16}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
            />
          </div>
        </div>
        <div className="mt-1">
          <Button
            size="sm"
            type="button"
            onClick={() => {
              handleFilterChange(localSort, localPrice);
              close();
            }}
          >
            Apply
          </Button>
        </div>
      </Form>
    );
  }

  return (
    <Modal>
      <div className="py-12">
        <Container>
          <Container.Row className="flex-col gap-y-0">
            <Container.Row.Column className="mb-8">
              <h1 className="text-3xl sm:text-4xl w-full text-center capitalize font-medium">
                {String(slug).replace(/-/g, " ")}
              </h1>
            </Container.Row.Column>
            <Container.Row.Column>
              {/* Filters under heading */}
              <div className="w-full">
                {/* Desktop filters */}
                <div className="hidden sm:flex justify-between flex-wrap items-center gap-4">
                  <div className="flex gap-3 items-center">
                    <span className="font-medium">Filter:</span>
                    <div className="relative">
                      <select
                        value={filterPrice}
                        onChange={(e) =>
                          handleFilterChange(sortBy, e.target.value)
                        }
                        className="appearance-none px-3 pr-10 text-sm py-2 border rounded-xs border-[#767676] bg-white cursor-pointer transition-all font-medium  min-h-10 *:font-sans"
                        aria-label="Filter by price"
                      >
                        <option value="all">All Prices</option>
                        <option value="under-200">Under ₦200K</option>
                        <option value="200-300">₦200K - ₦300K</option>
                        <option value="over-300">Over ₦300K</option>
                      </select>
                      <BsChevronDown
                        size={16}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="flex items-center gap-3">
                      <span className="font-medium">Sort By:</span>
                      <div className="relative">
                        <select
                          value={sortBy}
                          onChange={(e) =>
                            handleFilterChange(e.target.value, filterPrice)
                          }
                          className="appearance-none rounded-xs px-3 pr-10 text-sm py-2 border border-[#767676] bg-white cursor-pointer transition-all font-medium  min-h-10 *:font-sans"
                          aria-label="Sort products"
                        >
                          <option value="newest">Newest</option>
                          <option value="featured">Featured</option>
                          <option value="price-low">Price: Low to High</option>
                          <option value="price-high">Price: High to Low</option>
                          <option value="a-z">A-Z</option>
                          <option value="z-a">Z-A</option>
                        </select>
                        <BsChevronDown
                          size={16}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                        />
                      </div>
                    </div>
                    <span>
                      <p className="text-sm">
                        {filteredProducts.length} products
                      </p>
                    </span>
                  </div>
                </div>

                {/* Mobile filters */}
                <div className="sm:hidden flex items-center justify-between">
                  <Modal.Open opens="category-filters">
                    <button
                      className="cursor-pointer hover:underline flex items-center gap-2"
                      aria-controls="mobile-filters"
                    >
                      <Setting4 size={16} variant="Outline" color="#121212" />
                      <span>Filter and sort</span>
                    </button>
                  </Modal.Open>
                  <div>
                    <p className="text-sm">
                      {filteredProducts.length} products
                    </p>
                  </div>
                </div>

                {/* Mobile filters modal */}
                <Modal.Window name="category-filters" title={"Filter and sort"}>
                  <MobileFiltersContent />
                </Modal.Window>
              </div>
            </Container.Row.Column>
          </Container.Row>
        </Container>

        {/* Products Grid */}
        <Container>
          <Container.Row className="pb-12 py-6 sm:py-10">
            <Container.Row.Column>
              {loading ? (
                <Loader count={itemsPerPage} />
              ) : paginatedProducts.length === 0 ? (
                hasActiveFilters ? (
                  <NoProductsFilter
                    onReset={() => router.push(`/shop/category/${slug}`)}
                  />
                ) : (
                  <div className="text-center py-10">
                    <h2 className="text-xl font-medium mb-2">
                      No products found
                    </h2>
                    <p className="text-[#3b3b3b]">
                      This category doesn't have any products yet.
                    </p>
                  </div>
                )
              ) : (
                <div className="grid grid-cols-1 min-[400px]:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-8">
                  {paginatedProducts.map((product) => (
                    <ProductItem key={product._id} product={product} />
                  ))}
                </div>
              )}
            </Container.Row.Column>

            {/* Pagination */}
            {!loading && totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-6 w-full">
                {page > 1 && (
                  <button
                    onClick={() => {
                      const prev = Math.max(1, page - 1);
                      const params = new URLSearchParams(
                        searchParams.toString()
                      );
                      params.set("page", String(prev));
                      setPage(prev);
                      router.push(
                        `/shop/category/${slug}?${params.toString()}`
                      );
                      window.scrollTo({
                        top: 0,
                        behavior: "auto" as ScrollBehavior,
                      });
                    }}
                    className="w-11 h-11 flex items-center justify-center cursor-pointer button"
                    aria-label="Previous page"
                  >
                    <BsChevronLeft size={16} />
                  </button>
                )}

                <div className="flex items-center gap-3">
                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const pNum = idx + 1;
                    return (
                      <button
                        key={pNum}
                        onClick={() => {
                          const params = new URLSearchParams(
                            searchParams.toString()
                          );
                          params.set("page", String(pNum));
                          setPage(pNum);
                          router.push(
                            `/shop/category/${slug}?${params.toString()}`
                          );
                          window.scrollTo({
                            top: 0,
                            behavior: "auto" as ScrollBehavior,
                          });
                        }}
                        className={twMerge(
                          `w-11 h-11 flex items-center justify-center cursor-pointer hover:[&>span]:border-[#121212]`,
                          pNum === page && "[&>span]:border-[#121212]"
                        )}
                      >
                        <span className="px-2 py-1 text-sm font-medium inline-block border-b border-transparent">
                          {pNum}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {page < totalPages && (
                  <button
                    onClick={() => {
                      const next = Math.min(totalPages, page + 1);
                      const params = new URLSearchParams(
                        searchParams.toString()
                      );
                      params.set("page", String(next));
                      setPage(next);
                      router.push(
                        `/shop/category/${slug}?${params.toString()}`
                      );
                      window.scrollTo({
                        top: 0,
                        behavior: "auto" as ScrollBehavior,
                      });
                    }}
                    className="w-11 h-11 flex items-center justify-center cursor-pointer button"
                    aria-label="Next page"
                  >
                    <BsChevronRight size={16} />
                  </button>
                )}
              </div>
            )}
          </Container.Row>
        </Container>
      </div>
    </Modal>
  );
}
