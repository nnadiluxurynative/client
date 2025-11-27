"use client";
import { useCartStore } from "@/app/_stores/cartStore";
import { formatNaira } from "@/app/_utils/helpers";
import { Trash } from "iconsax-react";
import { BsDash, BsPlus, BsXLg } from "react-icons/bs";
import Link from "next/link";
import Button from "@/app/_components/Button";
import Container from "@/app/_components/Container";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getCartTotal, clearCart } =
    useCartStore();

  if (items.length === 0) {
    return (
      <div className="py-12">
        <Container>
          <div className="max-w-4xl mx-auto text-center py-12">
            <h1 className="text-3xl font-medium mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-6">
              Add items to your cart to see them here.
            </p>
            <Link href="/shop">
              <Button size="lg" color="white">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-12">
      <Container>
        <div className="">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-medium">Cart</h1>
            <button
              onClick={clearCart}
              className="text-sm cursor-pointer flex gap-2 items-center hover:underline"
            >
              <BsXLg size={14} />
              <span>Clear Cart</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 gap-x-[30px]">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4 lg:pr-[30px]">
              {items.map((item) => (
                <div
                  key={`${item.product._id}-${item.color}-${item.material}-${item.size}`}
                  className="flex gap-4 pb-4 border-b border-grey relative"
                >
                  {/* Delete Button - Top Right */}
                  <button
                    onClick={() =>
                      removeItem(
                        item.product._id,
                        item.color,
                        item.material,
                        item.size
                      )
                    }
                    className="absolute top-0 cursor-pointer right-0 p-2 pr-0"
                    aria-label="Remove item"
                  >
                    <Trash variant="Outline" color="#121212" size={20} />
                  </button>

                  {/* Image */}
                  {item.image && (
                    <Link
                      href={`/shop/${item.product.slug}`}
                      className="w-40  overflow-hidden bg-gray-100 shrink-0"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                  )}

                  {/* Details */}
                  <div className="flex-1 min-w-0 pr-8">
                    <Link
                      href={`/shop/${item.product.slug}`}
                      className="font-medium text-base hover:underline block truncate"
                    >
                      {item.title}
                    </Link>
                    <p className="text-sm text-[#3b3b3b] mt-1">
                      {item.color} / {item.material} / {item.size}
                    </p>
                    <p className="text-base mt-2">{formatNaira(item.price)}</p>

                    {/* Quantity Controls */}
                    <div className="flex items-center mt-3">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product._id,
                            item.color,
                            item.material,
                            item.size,
                            item.quantity - 1
                          )
                        }
                        className="w-8 h-8 border border-grey flex transition-all items-center cursor-pointer justify-center hover:border-gray-400"
                      >
                        <BsDash />
                      </button>
                      <span className="text-base w-10 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product._id,
                            item.color,
                            item.material,
                            item.size,
                            item.quantity + 1
                          )
                        }
                        className="w-8 h-8 border border-grey transition-all flex items-center justify-center hover:border-gray-400 cursor-pointer"
                      >
                        <BsPlus />
                      </button>
                    </div>
                  </div>

                  {/* Item Total */}
                  <div className="hidden sm:flex text-right items-end">
                    <p>{formatNaira(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="border border-grey p-6 sticky top-24">
                <h2 className="text-xl font-medium mb-4">Order Summary</h2>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{formatNaira(getCartTotal())}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                </div>

                <div className="border-t border-grey pt-4 mb-6">
                  <div className="flex justify-between text-lg font-medium">
                    <span>Total</span>
                    <span>{formatNaira(getCartTotal())}</span>
                  </div>
                </div>
                <Link href="/checkout" className="flex">
                  <Button size="lg" className="w-full">
                    Proceed to Checkout
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
