"use client";
import Link from "next/link";
import Button from "../_components/Button";
import Container from "../_components/Container";
import OrderHistory from "../_components/OrderHistory";
import useMutate from "../_hooks/useMutate";
import { Logout } from "iconsax-react";
import { useAuthStore } from "../_stores/authStore";

export default function Account() {
  const { logoutUser, user } = useAuthStore();
  const [logout, loading] = useMutate<undefined>(logoutUser);
  const handleLogout = async () => {
    // Logout user
    await logout({
      data: undefined,
    });
  };

  // Adresses length
  const addressesLength = user?.addresses?.length || 0;
  // Measurements length
  const measurementsLength = user?.measurements?.length || 0;

  // Active address
  const activeAddress = user?.addresses?.find((addr) => addr.isDefault);

  return (
    <div>
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-3xl text-center sm:text-4xl font-medium">
          Account
        </h2>
        <button
          className="gap-1 cursor-pointer flex items-center"
          disabled={loading}
          onClick={handleLogout}
        >
          <Logout
            variant="Outline"
            size={20}
            color="#121212"
            className="rotate-180"
          />
          <span className="link--underline">Log out</span>
        </button>
      </div>
      <Container.Row className="mt-8">
        <Container.Row.Column className="md:w-3/4 flex flex-col">
          <h3 className="font-medium text-2xl mb-4">Order history</h3>
          <OrderHistory />
        </Container.Row.Column>
        <Container.Row.Column className="md:w-1/4 flex flex-col">
          <h3 className="font-medium text-2xl mb-4">Account details</h3>
          <p>
            {user?.firstName} {user?.lastName}
          </p>
          {addressesLength > 0 && activeAddress ? (
            <div className="mt-1 flex flex-col gap-1">
              <p>{activeAddress.address}</p>
              <p>
                {activeAddress.city}, {activeAddress.state}
              </p>
              <p>{activeAddress.country}</p>
            </div>
          ) : (
            <p className="mt-1">Nigeria.</p>
          )}
          <div className="flex gap-3 mt-6 flex-wrap">
            <Link href="/account/addresses">
              <Button color="white">View addresses ({addressesLength})</Button>
            </Link>
            <Link href="/account/measurements">
              <Button color="white">
                View measurements ({measurementsLength})
              </Button>
            </Link>
          </div>
        </Container.Row.Column>
      </Container.Row>
    </div>
  );
}
