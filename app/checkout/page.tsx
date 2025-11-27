"use client";
import Button from "@/app/_components/Button";
import { useAuthStore } from "@/app/_stores/authStore";
import { useCartStore } from "@/app/_stores/cartStore";
import { formatNaira } from "@/app/_utils/helpers";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BsChevronLeft, BsWhatsapp } from "react-icons/bs";
import Modal from "@/app/_components/modal/Modal";
import AddAddressModal from "@/app/_components/address/AddAddressModal";

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

  useEffect(() => {
    // Reset selected address to latest address created when user changes
    setSelectedAddress(user?.addresses?.at(0)?._id || null);
  }, [user]);

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
    <React.Fragment>
      {/* Left Column: Form */}
      <div className="py-8 lg:py-12">
        <div className="px-4 max-w-[554px]  lg:max-w-[522px] lg:px-8 mx-auto lg:ml-auto lg:mr-0">
          {/* Contact Info */}
          {user ? (
            <div className="mb-8">
              <div className="w-full  pb-3 h-11 border-b border-b-grey flex items-center justify-between">
                <div className="flex items-center gap-2 ">
                  <div className="w-8 h-8 rounded-full bg-gray-100 text-[#121212] flex items-center justify-center text-sm ">
                    {user.firstName?.[0]?.toUpperCase() ||
                      user.email?.[0]?.toUpperCase()}
                    {user.lastName?.[0]?.toUpperCase() ||
                      user.email?.[1]?.toUpperCase()}
                  </div>
                  <span className="text-sm">{user.email}</span>
                </div>

                <button
                  onClick={() => {
                    useAuthStore.getState().logoutUser();
                  }}
                  className="cursor-pointer  py-2 text-center text-[#453121] text-sm hover:underline"
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-medium">Contact</h2>
                <Link
                  href="/login"
                  className="text-sm text-[#453121] underline"
                >
                  Sign in
                </Link>
              </div>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-3 py-2 h-11 border placeholder:text-[#767676] border-[#767676] focus:border-[#121212] outline-0"
              />
            </div>
          )}

          {/* Delivery Address */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-3">Delivery</h2>

            {user && user.addresses && user.addresses.length > 0 ? (
              <Modal>
                <div className="space-y-3">
                  {user.addresses.map((address) => (
                    <label
                      key={address._id}
                      className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition ${
                        selectedAddress === address._id
                          ? "border-[#121212] bg-white shadow-sm"
                          : "border-gray-300 bg-white hover:border-gray-400"
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
                          {address.address}, {address.city}, {address.state}
                        </p>
                        <p className="text-sm text-gray-600">{address.phone}</p>
                      </div>
                    </label>
                  ))}

                  <Modal.Open opens="add-address">
                    <button className="text-sm cursor-pointer text-[#121212] hover:underline inline-block mt-2">
                      + Add new address
                    </button>
                  </Modal.Open>
                </div>
                <AddAddressModal />
              </Modal>
            ) : (
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      placeholder="First name"
                      value={guestInfo.firstName}
                      onChange={(e) =>
                        setGuestInfo({
                          ...guestInfo,
                          firstName: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 h-11 border placeholder:text-[#767676] border-[#767676] focus:border-[#121212] outline-0"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Last name"
                      value={guestInfo.lastName}
                      onChange={(e) =>
                        setGuestInfo({
                          ...guestInfo,
                          lastName: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 h-11 border placeholder:text-[#767676] border-[#767676] focus:border-[#121212] outline-0"
                    />
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Address"
                  value={guestInfo.address}
                  onChange={(e) =>
                    setGuestInfo({
                      ...guestInfo,
                      address: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 h-11 border placeholder:text-[#767676] border-[#767676] focus:border-[#121212] outline-0"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="City"
                    value={guestInfo.city}
                    onChange={(e) =>
                      setGuestInfo({
                        ...guestInfo,
                        city: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 h-11 border placeholder:text-[#767676] border-[#767676] focus:border-[#121212] outline-0"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    value={guestInfo.state}
                    onChange={(e) =>
                      setGuestInfo({
                        ...guestInfo,
                        state: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 h-11 border placeholder:text-[#767676] border-[#767676] focus:border-[#121212] outline-0"
                  />
                </div>
                <input
                  type="tel"
                  placeholder="Phone"
                  value={guestInfo.phone}
                  onChange={(e) =>
                    setGuestInfo({
                      ...guestInfo,
                      phone: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 h-11 border placeholder:text-[#767676] border-[#767676] focus:border-[#121212] outline-0"
                />
              </div>
            )}
          </div>

          {/* Payment Method */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-3">Payment</h2>
            <label className="flex items-start gap-3 p-4 border border-[#767676] cursor-pointer hover:border-[#121212] transition-colors group">
              <input
                type="radio"
                name="payment"
                defaultChecked
                className="mt-1 size-5  accent-[#121212]"
              />
              <div className="flex-1">
                <div className="flex items-center gap-1 mb-">
                  <p className="font-medium text-sm">Order via WhatsApp</p>
                </div>
                <p className="text-xs text-[#3b3b3b]  leading-relaxed">
                  Complete your order through WhatsApp.
                </p>
              </div>
              <BsWhatsapp size={24} className="text-green-600 self-center" />
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <Link
              href="/cart"
              className="flex items-center gap-1 text-[#121212] text-sm hover:underline"
            >
              <BsChevronLeft size={14} />
              <span>Return to cart</span>
            </Link>
            <Button
              size="lg"
              onClick={handlePlaceOrder}
              disabled={isProcessing || (!!user && !selectedAddress)}
              className="px-8"
            >
              {isProcessing ? "Processing..." : "Place order"}
            </Button>
          </div>
        </div>
      </div>

      {/* Right Column: Order Summary */}
      <div className="bg-[#fafafa] lg:border-l border-gray-200 py-8 lg:py-12">
        <div className="max-w-[522px] px-8 mr-auto">
          {/* Order Items */}
          <div className="space-y-4 mb-6">
            {items.map((item) => (
              <div
                key={`${item.product._id}-${item.color}-${item.material}-${item.size}`}
                className="flex gap-4"
              >
                <div className="relative">
                  {item.image && (
                    <div
                      className="w-16 h-16 bg-gray-100 rounded-lg border border-gray-200"
                      style={{
                        backgroundImage: `url(${item.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  )}
                  <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.title}</p>
                  <p className="text-xs text-gray-600 mt-0.5">
                    {item.color} / {item.material} / {item.size}
                  </p>
                </div>
                <div className="text-sm font-medium">
                  {formatNaira(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="space-y-3 pb-4 mb-4 border-b border-gray-200">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">{formatNaira(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">
                {shipping === 0 ? "Free" : formatNaira(shipping)}
              </span>
            </div>
          </div>

          <div className="flex justify-between text-base font-medium">
            <span>Total</span>
            <span className="text-xl">{formatNaira(total)}</span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
