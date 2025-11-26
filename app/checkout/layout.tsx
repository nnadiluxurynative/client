"use client";
import Link from "next/link";
import Logo from "@/app/_components/Logo";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Simplified Header */}
      <header className="border-b border-grey py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="block">
            <Logo />
          </Link>
          <div className="text-sm text-gray-600">Secure Checkout</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Simplified Footer */}
      <footer className="border-t border-grey py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
            <p>
              &copy; {new Date().getFullYear()} Nnadi Luxury Native. All rights
              reserved.
            </p>
            <div className="flex gap-4">
              <Link href="/faqs" className="hover:underline">
                FAQs
              </Link>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
