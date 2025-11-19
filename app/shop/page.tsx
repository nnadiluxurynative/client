"use client";
import Button from "@/app/_components/Button";
import Container from "@/app/_components/Container";
import { useRouter, useSearchParams } from "next/navigation";
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

function page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [sortBy, setSortBy] = useState("featured");
  const [filterPrice, setFilterPrice] = useState("all");
  const [selectedImage, setSelectedImage] = useState<{ [key: number]: number }>(
    {}
  );
  const itemsPerPage = 3;

  // Get current page from URL, default to 1
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const products: Product[] = [
    {
      id: 1,
      name: "Premium Silk Dress",
      price: 299.99,
      image:
        "https://images.unsplash.com/photo-1612336307429-8a88e8d08ee3?w=500&h=500&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1612336307429-8a88e8d08ee3?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1595777744076-f49d6854e48f?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1618932260643-30f39d8e87f7?w=500&h=500&fit=crop",
      ],
      rating: 4.8,
      reviews: 127,
      badge: "New",
    },
    {
      id: 2,
      name: "Luxury Evening Gown",
      price: 599.99,
      image:
        "https://images.unsplash.com/photo-1595777744076-f49d6854e48f?w=500&h=500&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1595777744076-f49d6854e48f?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1618932260643-30f39d8e87f7?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1644795566246-0e2fcbb75791?w=500&h=500&fit=crop",
      ],
      rating: 4.9,
      reviews: 89,
      badge: "Sale",
    },
    {
      id: 3,
      name: "Elegant Cocktail Dress",
      price: 349.99,
      image:
        "https://images.unsplash.com/photo-1618932260643-30f39d8e87f7?w=500&h=500&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1618932260643-30f39d8e87f7?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1612336307429-8a88e8d08ee3?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1595777744076-f49d6854e48f?w=500&h=500&fit=crop",
      ],
      rating: 4.7,
      reviews: 156,
    },
    {
      id: 4,
      name: "Sophisticated Blazer",
      price: 249.99,
      image:
        "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&h=500&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1539533057440-7069f9ef46f5?w=500&h=500&fit=crop",
      ],
      rating: 4.6,
      reviews: 203,
    },
    {
      id: 5,
      name: "Designer Jumpsuit",
      price: 399.99,
      image:
        "https://images.unsplash.com/photo-1590080876017-d91850f42f78?w=500&h=500&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1590080876017-d91850f42f78?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1534070712277-fdf500671ae0?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1539533057440-7069f9ef46f5?w=500&h=500&fit=crop",
      ],
      rating: 4.8,
      reviews: 92,
    },
    {
      id: 6,
      name: "Luxe Wool Coat",
      price: 449.99,
      image:
        "https://images.unsplash.com/photo-1539533057440-7069f9ef46f5?w=500&h=500&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1539533057440-7069f9ef46f5?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&h=500&fit=crop",
      ],
      rating: 4.9,
      reviews: 178,
      badge: "Best Seller",
    },
    {
      id: 7,
      name: "Tailored Trousers",
      price: 179.99,
      image:
        "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=500&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1552747260-5b8fadc55df4?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&h=500&fit=crop",
      ],
      rating: 4.5,
      reviews: 145,
    },
    {
      id: 8,
      name: "Silk Blouse",
      price: 129.99,
      image:
        "https://images.unsplash.com/photo-1589715389088-74c6b4e8e9b4?w=500&h=500&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1589715389088-74c6b4e8e9b4?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1585399404843-f38da5ad0d13?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1612336307429-8a88e8d08ee3?w=500&h=500&fit=crop",
      ],
      rating: 4.7,
      reviews: 201,
    },
  ];

  // Filter and sort products
  const getFilteredAndSortedProducts = () => {
    let filtered = [...products];

    // Filter by price
    switch (filterPrice) {
      case "under-200":
        filtered = filtered.filter((p) => p.price < 200);
        break;
      case "200-400":
        filtered = filtered.filter((p) => p.price >= 200 && p.price <= 400);
        break;
      case "over-400":
        filtered = filtered.filter((p) => p.price > 400);
        break;
    }

    // Sort
    switch (sortBy) {
      case "newest":
        filtered = filtered.reverse();
        break;
      case "price-low":
        filtered = filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered = filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered = filtered.sort((a, b) => b.rating - a.rating);
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

  // Reset to page 1 when filters change
  const handleFilterChange = (newSort?: string, newPrice?: string) => {
    const sort = newSort ?? sortBy;
    const price = newPrice ?? filterPrice;
    setSortBy(sort);
    setFilterPrice(price);
    router.push("/shop?page=1");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Filters and Sort */}
      <div className="border-b border-slate-200">
        <Container>
          <Container.Row>
            <Container.Row.Column className="max-w-6xl mx-auto py-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                  <p className="text-sm text-slate-600">
                    Showing{" "}
                    <span className="font-semibold">
                      {paginatedProducts.length}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold">
                      {filteredProducts.length}
                    </span>{" "}
                    products
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <select
                    value={sortBy}
                    onChange={(e) =>
                      handleFilterChange(e.target.value, filterPrice)
                    }
                    className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                  >
                    <option value="featured">Featured</option>
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Best Rated</option>
                  </select>
                  <select
                    value={filterPrice}
                    onChange={(e) => handleFilterChange(sortBy, e.target.value)}
                    className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                  >
                    <option value="all">All Prices</option>
                    <option value="under-200">Under $200</option>
                    <option value="200-400">$200 - $400</option>
                    <option value="over-400">Over $400</option>
                  </select>
                </div>
              </div>
            </Container.Row.Column>
          </Container.Row>
        </Container>
      </div>

      {/* Products Grid */}
      <Container>
        <Container.Row className="py-12">
          <Container.Row.Column className="max-w-6xl mx-auto w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedProducts.map((product) => {
                const currentImageIndex = selectedImage[product.id] || 0;
                const currentImage = product.images[currentImageIndex];
                return (
                  <div key={product.id} className="group">
                    {/* Product Image Gallery */}
                    <div
                      className="relative mb-4 overflow-hidden bg-slate-100 aspect-square"
                      onMouseLeave={() =>
                        setSelectedImage({ ...selectedImage, [product.id]: 0 })
                      }
                    >
                      <img
                        src={currentImage}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Image Hover Zones */}
                      {product.images.length > 1 && (
                        <>
                          {product.images.map((img, idx) => (
                            <div
                              key={idx}
                              className="absolute top-0 bottom-0 cursor-pointer"
                              style={{
                                left: `${(idx / product.images.length) * 100}%`,
                                width: `${100 / product.images.length}%`,
                              }}
                              onMouseEnter={() =>
                                setSelectedImage({
                                  ...selectedImage,
                                  [product.id]: idx,
                                })
                              }
                            />
                          ))}
                        </>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold text-slate-900 group-hover:text-slate-700 transition-colors line-clamp-2">
                        {product.name}
                      </h3>

                      {/* Price */}
                      <p className="text-lg font-bold text-slate-900">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                );
              })}
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
