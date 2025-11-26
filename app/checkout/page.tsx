"use client";
import { useCartStore } from "@/app/_stores/cartStore";
import { useAuthStore } from "@/app/_stores/authStore";
import { formatNaira } from "@/app/_utils/helpers";
import Link from "next/link";
import Button from "@/app/_components/Button";
import Container from "@/app/_components/Container";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getCartTotal, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const [selectedAddress, setSelectedAddress] = useState<string | null>(
    user?.addresses?.find((a) => a.isDefault)?._id || null
  );
  const [isProcessing, setIsProcessing] = useState(false);

  // Guest checkout form state
  const [guestInfo, setGuestInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    phone: "",
  });

  if (items.length === 0) {
    return (
      <div className="py-12">
        <Container>
          <div className="max-w-4xl mx-auto text-center py-12">
            <h1 className="text-3xl font-medium mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-6">
              Add items to your cart before checking out.
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

  const handlePlaceOrder = async () => {
    // Validation for logged-in users
    if (user && !selectedAddress) {
      alert("Please select a delivery address");
      return;
    }

    // Validation for guest users
    if (!user) {
      const requiredFields = [
        "firstName",
        "lastName",
        "address",
        "city",
        "state",
        "phone",
      ];
      const missingFields = requiredFields.filter(
        (field) => !guestInfo[field as keyof typeof guestInfo].trim()
      );

      if (missingFields.length > 0) {
        alert("Please fill in all delivery information");
        return;
      }
    }

    setIsProcessing(true);
    try {
      // TODO: Implement order placement API call
      // await placeOrder({ items, addressId: selectedAddress, guestInfo: !user ? guestInfo : undefined });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      clearCart();
      router.push("/");
    } catch (error) {
      console.error("Order placement failed:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const subtotal = getCartTotal();
  const shipping = 0; // Free shipping within Nigeria
  const total = subtotal + shipping;

  return (
    <div className="py-12">
      <Container>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-medium mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Delivery & Payment */}
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery Address */}
              <div className="border border-grey p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-medium">Delivery Address</h2>
                  {user && (
                    <Link
                      href="/account/addresses"
                      className="text-sm link--underline"
                    >
                      Manage Addresses
                    </Link>
                  )}
                </div>

                {user && user.addresses && user.addresses.length > 0 ? (
                  <div className="space-y-3">
                    {user.addresses.map((address) => (
                      <label
                        key={address._id}
                        className={`flex items-start gap-3 p-4 border cursor-pointer transition ${
                          selectedAddress === address._id
                            ? "border-[#121212] bg-gray-50"
                            : "border-grey hover:border-gray-400"
                        }`}
                      >
                        <input
                          type="radio"
                          name="address"
                          checked={selectedAddress === address._id}
                          onChange={() => setSelectedAddress(address._id!)}
                          className="mt-1 accent-[#121212]"
                        />
                        <div className="flex-1">
                          <p className="font-medium">
                            {address.firstName} {address.lastName}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {address.address}
                          </p>
                          <p className="text-sm text-gray-600">
                            {address.city}, {address.state}
                          </p>
                          <p className="text-sm text-gray-600">
                            {address.phone}
                          </p>
                          {address.isDefault && (
                            <span className="inline-block mt-2 text-xs bg-gray-200 px-2 py-1 rounded">
                              Default
                            </span>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {user && (
                      <div className="text-center py-4 mb-4">
                        <p className="text-gray-600 mb-3">
                          No saved addresses found.
                        </p>
                        <Link href="/account/addresses">
                          <Button size="md" color="white">
                            Add Address
                          </Button>
                        </Link>
                      </div>
                    )}

                    {!user && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            First Name *
                          </label>
                          <input
                            type="text"
                            value={guestInfo.firstName}
                            onChange={(e) =>
                              setGuestInfo({
                                ...guestInfo,
                                firstName: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-grey focus:outline-none focus:border-[#121212]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            value={guestInfo.lastName}
                            onChange={(e) =>
                              setGuestInfo({
                                ...guestInfo,
                                lastName: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-grey focus:outline-none focus:border-[#121212]"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-sm font-medium mb-1">
                            Address *
                          </label>
                          <input
                            type="text"
                            value={guestInfo.address}
                            onChange={(e) =>
                              setGuestInfo({
                                ...guestInfo,
                                address: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-grey focus:outline-none focus:border-[#121212]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            City *
                          </label>
                          <input
                            type="text"
                            value={guestInfo.city}
                            onChange={(e) =>
                              setGuestInfo({
                                ...guestInfo,
                                city: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-grey focus:outline-none focus:border-[#121212]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            State *
                          </label>
                          <input
                            type="text"
                            value={guestInfo.state}
                            onChange={(e) =>
                              setGuestInfo({
                                ...guestInfo,
                                state: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-grey focus:outline-none focus:border-[#121212]"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-sm font-medium mb-1">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            value={guestInfo.phone}
                            onChange={(e) =>
                              setGuestInfo({
                                ...guestInfo,
                                phone: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-grey focus:outline-none focus:border-[#121212]"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Payment Method */}
              <div className="border border-grey p-6">
                <h2 className="text-xl font-medium mb-4">Payment Method</h2>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 border border-[#121212] bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      defaultChecked
                      className="accent-[#121212]"
                    />
                    <div>
                      <p className="font-medium">Pay on Delivery</p>
                      <p className="text-sm text-gray-600">
                        Cash or card payment upon delivery
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-1">
              <div className="border border-grey p-6 sticky top-24">
                <h2 className="text-xl font-medium mb-4">Order Summary</h2>

                {/* Order Items */}
                <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                  {items.map((item) => (
                    <div
                      key={`${item.product._id}-${item.color}-${item.material}-${item.size}`}
                      className="flex gap-3 text-sm"
                    >
                      {item.image && (
                        <div
                          className="w-16 h-20 bg-gray-100 shrink-0"
                          style={{
                            backgroundImage: `url(${item.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "top center",
                          }}
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{item.title}</p>
                        <p className="text-xs text-gray-600">
                          {item.color} / {item.material} / {item.size}
                        </p>
                        <p className="text-xs text-gray-600">
                          Qty: {item.quantity}
                        </p>
                        <p className="text-sm font-medium mt-1">
                          {formatNaira(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-grey pt-4 space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{formatNaira(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? "Free" : formatNaira(shipping)}
                    </span>
                  </div>
                </div>

                <div className="border-t border-grey pt-4 mb-6">
                  <div className="flex justify-between text-lg font-medium">
                    <span>Total</span>
                    <span>{formatNaira(total)}</span>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full"
                  onClick={handlePlaceOrder}
                  disabled={isProcessing || (!!user && !selectedAddress)}
                >
                  {isProcessing ? "Processing..." : "Place Order"}
                </Button>

                <Link href="/cart">
                  <Button size="lg" color="white" className="w-full mt-3">
                    Back to Cart
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
