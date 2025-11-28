"use client";
import Button from "@/app/_components/Button";
import Modal from "@/app/_components/modal/Modal";
import AddAddressModal from "@/app/_components/address/AddAddressModal";
import EditAddressModal from "@/app/_components/address/EditAddressModal";
import FlutterwaveLogo from "../_components/FlutterwaveLogo";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/app/_stores/authStore";
import { useCartStore } from "@/app/_stores/cartStore";
import { formatNaira } from "@/app/_utils/helpers";
import { BsPlus, BsPencil, BsChevronDown } from "react-icons/bs";
import { twMerge } from "tailwind-merge";
import { Address } from "@/app/_types/address";
import Spinner from "../_components/Spinner";
import useMutate from "../_hooks/useMutate";
import { useOrdersStore } from "../_stores/orderStore";
import { nigerianStates } from "../_utils/constants";

export default function CheckoutPage() {
  const { items, getCartTotal } = useCartStore();
  const { user } = useAuthStore();
  const { createOrder } = useOrdersStore();
  const [selectedAddress, setSelectedAddress] = useState<string | null>(
    user?.addresses?.find((a) => a.isDefault)?._id || null
  );
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [create, processing, message] = useMutate(createOrder);
  const [initialAddressCount] = useState(user?.addresses?.length || 0);

  useEffect(() => {
    // Select the latest address only when a new address is added (not on initial load)
    const currentCount = user?.addresses?.length || 0;
    if (
      currentCount > initialAddressCount &&
      user?.addresses &&
      user.addresses.length > 0
    ) {
      const latestAddress = user.addresses[0];
      // Only update if the latest address is different from the currently selected one
      if (selectedAddress !== latestAddress._id) {
        setSelectedAddress(latestAddress._id || null);
      }
    }
  }, [user?.addresses?.length]);

  const handlePlaceOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent default form submission behavior
    e.preventDefault();

    let payload: { [key: string]: any } = {
      items: items.map(({ product, image, ...rest }) => ({
        product: product._id,
        ...rest,
      })),
    };

    // Validation for logged-in users
    if (user) {
      const selectedShippingAddress = user.addresses.find(
        (address) => address._id === selectedAddress
      );
      if (!selectedAddress || !selectedShippingAddress)
        return alert("Please select a delivery address");

      payload = {
        email: user.email,
        shippingAddress: selectedShippingAddress,
        ...payload,
      };
    } else {
      const formData = new FormData(e.currentTarget);
      payload = {
        email: formData.get("email"),
        shippingAddress: {
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),
          address: formData.get("address"),
          city: formData.get("city"),
          phone: formData.get("phone"),
          state: formData.get("state"),
          country: "Nigeria",
        },
        ...payload,
      };
    }
    console.log("Payload:", payload);
    if (payload) {
      await create({
        data: payload,
        onSuccess: (url: string) => {
          // Redirect to payment URL
          window.location.href = url;
        },
      });
    }
  };

  const subtotal = getCartTotal();
  const shipping = 0; // Free shipping within Nigeria
  const total = subtotal + shipping;

  return (
    <React.Fragment>
      {/* Left Column: Form */}
      <div className="py-8 lg:py-12 lg:min-h-[calc(100vh-61px)]">
        <form
          onSubmit={handlePlaceOrder}
          className="px-4 max-w-[588px] lg:max-w-[572px] lg:px-8 mx-auto lg:ml-auto lg:mr-0"
        >
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
                  type="button"
                  onClick={() => {
                    useAuthStore.getState().logoutUser();
                  }}
                  className="cursor-pointer  py-2 text-center text-sm hover:underline"
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-medium">Contact</h2>
                <Link href="/login" className="text-sm hover:underline">
                  Sign in
                </Link>
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="w-full px-3 py-2 h-11 border placeholder:text-[#767676] border-[#767676] focus:border-[#121212] outline-0"
              />
            </div>
          )}

          {/* Delivery Address */}
          <div className="mb-8">
            <h2 className="text-xl font-medium mb-3">Delivery</h2>

            {user && user.addresses && user.addresses.length > 0 ? (
              <Modal>
                <div className="space-y-3">
                  {user.addresses.map((address) => (
                    <div
                      key={address._id}
                      className={twMerge(
                        `flex items-start gap-3 p-4 border bg-white rounded-xs border-[#767676] hover:border-[#121212] transition relative`,
                        selectedAddress === address._id &&
                          "border-[#121212] hover:border-[#121212]"
                      )}
                    >
                      <label className="flex items-start gap-3 flex-1 cursor-pointer">
                        <input
                          type="radio"
                          name="radio-address"
                          checked={selectedAddress === address._id}
                          onChange={() => setSelectedAddress(address._id!)}
                          className="mt-1 accent-[#121212] cursor-pointer size-5"
                        />
                        <div className="flex-1 pr-8">
                          <p className="text-sm font-medium">
                            {address.firstName} {address.lastName}
                          </p>
                          <p className="text-sm text-[#3b3b3b] capitalize">
                            {address.address}, {address.city}, {address.state}
                          </p>
                        </div>
                      </label>
                      {address._id === selectedAddress && (
                        <Modal.Open opens="edit-address">
                          <button
                            type="button"
                            onClick={() => setEditingAddress(address)}
                            className="absolute top-1/2 -translate-y-1/2 cursor-pointer right-4 p-1 pr-0 "
                            aria-label="Edit address"
                          >
                            <BsPencil size={16} />
                          </button>
                        </Modal.Open>
                      )}
                    </div>
                  ))}

                  <Modal.Open opens="add-address">
                    <button
                      type="button"
                      className="text-sm flex items-center cursor-pointer text-[#121212] hover:underline gap-1 mt-3"
                    >
                      <BsPlus size={20} />
                      <span>Add new address</span>
                    </button>
                  </Modal.Open>
                </div>
                <AddAddressModal />
                <EditAddressModal
                  address={editingAddress}
                  onClose={() => setEditingAddress(null)}
                />
              </Modal>
            ) : (
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      name="firstName"
                      type="text"
                      placeholder="First name"
                      required
                      className="w-full px-3 rounded-xs py-2 h-11 border placeholder:text-[#767676] border-[#767676] focus:border-[#121212] outline-0"
                    />
                  </div>
                  <div>
                    <input
                      name="lastName"
                      type="text"
                      required
                      placeholder="Last name"
                      className="w-full px-3 py-2 rounded-xs h-11 border placeholder:text-[#767676] border-[#767676] focus:border-[#121212] outline-0"
                    />
                  </div>
                </div>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  required
                  className="w-full px-3 py-2 rounded-xs h-11 border placeholder:text-[#767676] border-[#767676] focus:border-[#121212] outline-0"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    required
                    className="w-full px-3 py-2 rounded-xs h-11 border placeholder:text-[#767676] border-[#767676] focus:border-[#121212] outline-0"
                  />
                  <div className="relative">
                    <select
                      name="state"
                      required
                      className="w-full appearance-none cursor-pointer px-3 py-2 rounded-xs h-11 border placeholder:text-[#767676] border-[#767676] focus:border-[#121212] outline-0"
                    >
                      {nigerianStates.map((state) => (
                        <option
                          key={state.value}
                          value={state.value}
                          className="font-sans text-sm"
                        >
                          {state.name}
                        </option>
                      ))}
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 bg-white py-2 pointer-events-none">
                      <BsChevronDown
                        size={16}
                        className=" text-[#767676] peer-focus:text-foreground peer-invalid:text-[#767676] peer-valid:text-foreground"
                      />
                    </span>
                  </div>
                </div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  required
                  className="w-full px-3 py-2 h-11 border rounded-xs placeholder:text-[#767676] border-[#767676] focus:border-[#121212] outline-0"
                />
              </div>
            )}
          </div>

          {/* Payment Method */}
          <div className="mb-5">
            <div className="mb-3">
              <h2 className="text-xl font-medium">Payment</h2>
            </div>
            <label className="flex items-start gap-3 p-4 px-6 rounded-xs bg-[#fff6e9] transition-colors group">
              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <p className="font-medium ">Flutterwave</p>
                </div>
                <p className="text-sm text-[#3b3b3b]  leading-relaxed">
                  Fast, safe, and easy payment through Flutterwave.
                </p>
              </div>
              <span className="self-center">
                <FlutterwaveLogo size={28} />
              </span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <Button
              size="lg"
              type="submit"
              disabled={processing || (!!user && !selectedAddress)}
              className="w-full"
            >
              {processing ? <Spinner /> : "Pay now"}
            </Button>
          </div>
        </form>
      </div>

      {/* Right Column: Order Summary */}
      <div className="bg-[#fafafa] lg:border-l border-gray-200 py-8 lg:py-12 lg:min-h-[calc(100vh-61px)]">
        <div className="px-4 max-w-[588px]  lg:max-w-[572px] mx-auto lg:px-8 lg:mr-auto lg:ml-0">
          {/* Order Items */}
          <div className="space-y-4 mb-6">
            {items.map((item) => (
              <div
                key={`${item.product._id}-${item.color}-${item.material}-${item.size}`}
                className="flex gap-4"
              >
                <div className="relative">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 object-cover"
                    />
                  )}
                  <span className="absolute -top-2 -right-2 bg-[#121212] text-white size-[18px] font-medium text-[11px]  rounded-full flex items-center justify-center">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.title}</p>
                  <p className="text-xs text-[#3b3b3b] mt-0.5">
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
              <span className="text-[#3b3b3b]">Subtotal</span>
              <span className="font-medium">{formatNaira(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#3b3b3b]">Shipping</span>
              <span className="font-medium">
                {shipping === 0 ? "Free" : formatNaira(shipping)}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center text-lg font-medium">
            <span>Total</span>
            <span>{formatNaira(total)}</span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
