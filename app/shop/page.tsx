"use client";
import Button from "@/app/_components/Button";
import Container from "@/app/_components/Container";
import ProductItem from "@/app/_components/product/ProductItem";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, use } from "react";
import type { Product } from "@/app/_types/product";
import { BsChevronDown } from "react-icons/bs";
import useProductStore from "../_stores/productStore";
import useMutate from "../_hooks/useMutate";

function page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { fetchProducts, products } = useProductStore.getState();

  const [fetch, loading, message] = useMutate(fetchProducts);

  useEffect(() => {
    fetch({ data: null });
  }, [fetchProducts]);

  // Read from URL on mount and when searchParams change
  const urlSort = searchParams.get("sort") || "featured";
  const urlPrice = searchParams.get("price") || "all";
  const [sortBy, setSortBy] = useState(urlSort);
  const [filterPrice, setFilterPrice] = useState(urlPrice);

  // Keep state in sync with URL
  useEffect(() => {
    setSortBy(urlSort);
    setFilterPrice(urlPrice);
  }, [urlSort, urlPrice]);
  const itemsPerPage = 12;

  // Get current page from URL, default to 1
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  // Filter and sort products (adapted to shared `Product` type)
  const getFilteredAndSortedProducts = () => {
    // Ensure we copy the array before mutating (sort/reverse)
    let filtered: Product[] = [...(products as Product[])];

    // Helper to derive a numeric price from the product
    const priceOf = (p: Product) => p.materials?.[0]?.price ?? 0;

    // Filter by price
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

    // Sort
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

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Update URL when filters change
  const handleFilterChange = (newSort?: string, newPrice?: string) => {
    const sort = newSort ?? sortBy;
    const price = newPrice ?? filterPrice;
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", sort);
    params.set("price", price);
    params.set("page", "1");
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <div className="py-12">
      {/* Filters and Sort */}
      <div>
        <Container>
          <Container.Row className="flex-col gap-y-0">
            <Container.Row.Column className="mb-8">
              <h1 className="text-3xl w-full text-center sm:text-4xl font-medium">
                Shop
              </h1>
            </Container.Row.Column>
            <Container.Row.Column className="">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div className="flex gap-3 items-center">
                  <span className="font-medium">Filter:</span>
                  <div className="relative">
                    <select
                      value={filterPrice}
                      onChange={(e) =>
                        handleFilterChange(sortBy, e.target.value)
                      }
                      className="appearance-none px-3 pr-10 text-sm py-2 border border-[#767676] bg-white cursor-pointer transition-all font-medium  min-h-10 *:font-sans"
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
                        className="appearance-none px-3 pr-10 text-sm py-2 border border-[#767676] bg-white cursor-pointer transition-all font-medium  min-h-10 *:font-sans"
                      >
                        <option value="featured">Featured</option>
                        <option value="newest">Newest</option>
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
            </Container.Row.Column>
          </Container.Row>
        </Container>
      </div>

      {/* Products Grid */}
      <Container>
        <Container.Row className="pb-12 py-10">
          <Container.Row.Column className="">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedProducts.map((product) => (
                <ProductItem key={product._id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <button
                  onClick={() =>
                    router.push(`/shop?page=${Math.max(1, currentPage - 1)}`)
                  }
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-slate-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 transition-colors"
                >
                  Previous
                </button>

                {[...Array(totalPages)].map((_, idx) => (
                  <button
                    key={idx + 1}
                    onClick={() => router.push(`/shop?page=${idx + 1}`)}
                    className={`px-3 py-2 rounded-lg transition-colors ${
                      currentPage === idx + 1
                        ? "bg-slate-900 text-white"
                        : "border border-slate-300 hover:bg-slate-100"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}

                <button
                  onClick={() =>
                    router.push(
                      `/shop?page=${Math.min(totalPages, currentPage + 1)}`
                    )
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-slate-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </Container.Row.Column>
        </Container.Row>
      </Container>
    </div>
  );
}

export default page;
