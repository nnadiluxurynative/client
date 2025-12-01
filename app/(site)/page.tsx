"use client";
import Link from "next/link";
import Button from "@/app/_components/Button";
import Container from "@/app/_components/Container";
import React, { useEffect, useState } from "react";
import useProductStore from "../_stores/productStore";
import ProductItem from "../_components/product/ProductItem";
import Loader from "../_components/product/Loader";
import { ArrowRight } from "iconsax-react";

function HomePage() {
  const [loading, setLoading] = useState(true);
  const { getFeaturedProducts, featuredProducts } = useProductStore();
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        await getFeaturedProducts();
      } finally {
        setLoading(false);
      }
    })();
  }, [getFeaturedProducts]);
  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative h-[600px] lg:h-[700px] bg-gray-500"
        style={{
          backgroundImage: "url('/hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/30">
          <Container className="h-full">
            <div className="flex items-center h-full">
              <div className="text-white max-w-2xl mx-auto text-center px-4">
                <h1 className="text-5xl lg:text-7xl text-shadow-lg font-bold mb-8 leading-tight">
                  Discover Timeless Native Fashion
                </h1>
                <div className="flex justify-center">
                  <Link href="/shop">
                    <Button size="xl">Shop Collection</Button>
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-medium mb-3">
              Browse Collections
            </h2>
            <p className="text-[#3b3b3b] lg:text-lg max-w-2xl mx-auto">
              Discover our carefully curated collections
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                name: "Casual",
                image: "/casual.jpg",
                link: "/shop/category/casual",
              },
              {
                name: "Ceremony",
                image: "/ceremony.jpg",
                link: "/shop/category/ceremony",
              },
              {
                name: "Classic",
                image: "/classic.jpg",
                link: "/shop/category/classic",
              },
              {
                name: "Heritage",
                image: "/heritage.jpg",
                link: "/shop/category/heritage",
              },
            ].map((category, index) => (
              <div key={index} className="group">
                <div className="overflow-hidden">
                  <Link
                    href={category.link || "/shop"}
                    className="flex relative overflow-hidden"
                  >
                    <img
                      src={category.image}
                      alt={category.name}
                      className=" w-full h-full block object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                </div>
                <Link
                  href={category.link || "/shop"}
                  className="flex items-center gap-2 mt-2"
                >
                  <h3 className="text-xl font-medium">{category.name}</h3>
                  <ArrowRight
                    color="#121212"
                    className="mt-0.75 group-hover:translate-x-1 transition-transform"
                    size={20}
                  />
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-medium mb-3">
              Featured Outfits
            </h2>
            <p className="text-[#3b3b3b] max-w-2xl lg:text-lg mx-auto">
              Handpicked selections from our latest collection
            </p>
          </div>

          {loading ? (
            <Loader
              imgHeight="sm:h-[450px]"
              count={4}
              className="lg:grid-cols-3"
            />
          ) : featuredProducts.length === 0 ? (
            <p>No featured products available.</p>
          ) : (
            <React.Fragment>
              <div className="grid grid-cols-1 min-[400px]:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {featuredProducts.map((product, i) => (
                  <ProductItem key={i} product={product} />
                ))}
              </div>
              <div className="flex justify-center">
                <Link href="/shop">
                  <Button size="lg" color="white">
                    View all products
                  </Button>
                </Link>
              </div>
            </React.Fragment>
          )}
        </Container>
      </section>
    </div>
  );
}

export default HomePage;
