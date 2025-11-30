import Link from "next/link";
import Button from "@/app/_components/Button";
import Container from "@/app/_components/Container";

function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] lg:h-[700px] bg-gray-100">
        <div className="absolute inset-0 bg-linear-to-r from-black/50 to-transparent">
          <Container className="h-full">
            <div className="flex items-center h-full">
              <div className="max-w-xl text-white">
                <h1 className="text-4xl lg:text-6xl font-bold mb-4">
                  Luxury Native Wear
                </h1>
                <p className="text-lg lg:text-xl mb-8">
                  Discover exquisite traditional attire crafted with premium
                  materials and attention to detail
                </p>
                <Link href="/shop">
                  <Button size="lg" className="px-8">
                    Shop Collection
                  </Button>
                </Link>
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
            <p className="text-[#3b3b3b] max-w-2xl mx-auto">
              Explore our curated collections
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Men's Collection", image: "" },
              { name: "Women's Collection", image: "" },
              { name: "Premium Fabrics", image: "" },
            ].map((category, index) => (
              <Link
                key={index}
                href="/shop"
                className="group relative h-80 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gray-300 group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                  <span className="inline-flex items-center gap-2 text-sm">
                    Shop Now
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-medium mb-3">
              Featured Products
            </h2>
            <p className="text-[#3b3b3b] max-w-2xl mx-auto">
              Handpicked selections from our latest collection
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="group">
                <Link href="/shop">
                  <div className="aspect-3/4 bg-gray-200 mb-3 overflow-hidden">
                    <div className="w-full h-full group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <h3 className="font-medium mb-1">Product Name</h3>
                  <p className="text-gray-600 text-sm mb-2">Category</p>
                  <p className="font-bold">₦150,000</p>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/shop">
              <Button size="lg" color="white">
                View All Products
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default HomePage;
