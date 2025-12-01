"use client";
import { useCartStore } from "@/app/_stores/cartStore";
import { formatNaira } from "@/app/_utils/helpers";
import { Trash } from "iconsax-react";
import { createPortal } from "react-dom";
import { BsDash, BsPlus, BsXLg } from "react-icons/bs";
import { twMerge } from "tailwind-merge";
import React, { useEffect } from "react";
import Link from "next/link";
import Button from "../Button";
import { useRouter } from "next/navigation";
import { CartItem } from "@/app/_types/cart";

export default function CartSidebar() {
  const {
    items,
    removeItem,
    updateQuantity,
    getCartTotal,
    isOpen,
    getCartCount,
    toggleCart,
  } = useCartStore();

  const cartCount = getCartCount();

  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return createPortal(
    <React.Fragment>
      <div
        onClick={toggleCart}
        className={twMerge(
          "fixed left-0 transition-all h-full top-0 w-full pointer-events-none bg-black duration-100 ease-out opacity-0 z-70",
          isOpen && "opacity-30 pointer-events-auto"
        )}
      />
      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-80 transition-transform duration-300 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4  md:px-6 border-b border-grey">
          <h2 className="text-base font-medium">
            <span>Shopping Cart</span> ({cartCount})
          </h2>
          <button
            onClick={toggleCart}
            className="button"
            aria-label="Close cart"
          >
            <BsXLg size={16} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 md:px-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-[#3b3b3b] mb-4">Your cart is empty</p>
              <Button onClick={toggleCart} color="white" size="md">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item: CartItem) => (
                <div
                  key={`${item.product._id}-${item.color}-${item.material}`}
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
                    className="absolute top-0 cursor-pointer right-0 p-1 pr-0"
                    aria-label="Remove item"
                  >
                    <Trash color="#121212" variant="Outline" size={18} />
                  </button>

                  {/* Image */}
                  {item.image && (
                    <Link
                      href={`/shop/${item.product.slug}`}
                      onClick={toggleCart}
                      className="h-32
                       overflow-hidden bg-gray-100 shrink-0"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                  )}

                  {/* Details */}
                  <div className="flex-1 min-w-0 pr-6">
                    <Link
                      href={`/shop/${item.product.slug}`}
                      className="font-medium text-sm hover:underline block truncate"
                      onClick={toggleCart}
                    >
                      {item.title}
                    </Link>
                    <p className="text-xs text-[#3b3b3b] mt-1">
                      {item.color} / {item.material} / {item.size}
                    </p>
                    <p className="text-sm mt-1">{formatNaira(item.price)}</p>

                    {/* Quantity Controls */}
                    <div className="flex items-center mt-2">
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
                        className="w-6 h-6 border rounded-xs border-grey flex items-center cursor-pointer justify-center text-sm hover:border-gray-400 transition-all"
                      >
                        <BsDash />
                      </button>
                      <span className="text-sm w-8 text-center">
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
                        className="w-6 h-6 border rounded-xs transition-all border-grey flex items-center justify-center text-sm hover:border-gray-400 cursor-pointer"
                      >
                        <BsPlus />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-grey p-4 md:px-6 space-y-4">
            <div className="flex items-center justify-between text-lg font-medium">
              <span>Total</span>
              <span>{formatNaira(getCartTotal())}</span>
            </div>
            <div className="flex flex-col gap-y-3">
              <Link href="/cart" onClick={toggleCart} className="flex">
                <Button size="lg" color="white" className="w-full">
                  View cart
                </Button>
              </Link>
              <Button
                size="lg"
                className="w-full"
                onClick={() => {
                  toggleCart();
                  // Navigate to checkout
                  router.push("/checkout");
                }}
              >
                Checkout
              </Button>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>,
    document.body
  );
}
