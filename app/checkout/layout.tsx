"use client";
import Container from "@/app/_components/Container";
import Link from "next/link";
import { Bag2 } from "iconsax-react";
import { useCartStore } from "../_stores/cartStore";
import { redirect } from "next/navigation";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { items } = useCartStore();

  if (items.length === 0) redirect("/cart");
  return (
    <div className="flex flex-col min-h-screen">
      {/* Simplified Header */}
      <header className="border-b border-grey py-4">
        <Container>
          <div className="max-w-[522px] lg:max-w-[980px] mx-auto flex items-center justify-between">
            <Link href="/" className="flex text-lg font-bold">
              nnadiluxurynative
            </Link>
            <Link href="/cart" className="flex">
              <Bag2 color="#453121" size={24} variant="Outline" />
            </Link>
          </div>
        </Container>
      </header>

      {/* Main Content - Two Column Grid */}
      <main className="flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-2">{children}</div>
      </main>
    </div>
  );
}
