"use client";
import DeleteAddressModal from "@/app/_components/address/DeleteAddressModal";
import Button from "@/app/_components/Button";
import Container from "@/app/_components/Container";
import Modal from "@/app/_components/modal/Modal";
import Link from "next/link";
import AddAddressModal from "@/app/_components/address/AddAddressModal";
import { useAuthStore } from "@/app/_stores/authStore";
import { useState } from "react";
import { Address } from "@/app/_types/address";
import EditAddressModal from "@/app/_components/address/EditAddressModal";

function page() {
  // User
  const { user } = useAuthStore();
  // Address to modify
  const [address, setAddress] = useState<Address | null>(null);
  // Get addresses - sort with default first
  const addresses = (user?.addresses ?? []).sort((a, b) => {
    if (a.isDefault) return -1;
    if (b.isDefault) return 1;
    return 0;
  });

  return (
    <div>
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-3xl text-center sm:text-4xl font-medium">
          Addresses
        </h2>
        <Link className="link--underline" href="/account">
          Return to account details
        </Link>
      </div>
      <Modal>
        {/* Add address button */}
        <div className="flex justify-center">
          <Modal.Open opens="add-address">
            <Button className="mt-6 text-center">Add address</Button>
          </Modal.Open>
        </div>
        {addresses && (
          <Container.Row className="mt-6">
            <Container.Row.Column className="max-w-[450px] flex flex-col mx-auto">
              {/* Render addresses */}
              {addresses.map((address, i) => (
                <div key={i} className="p-4 flex flex-col text-center gap-1">
                  {address.isDefault && (
                    <h3 className="text-xl font-medium">Default</h3>
                  )}
                  <p>
                    {address.firstName} {address.lastName}
                  </p>
                  <p>{address.address}</p>
                  <p>
                    {address.city}, {address.state}
                  </p>
                  <p>{address.country}</p>
                  <div className="flex justify-center gap-3 mt-4">
                    {/* Edit address button */}
                    <Modal.Open opens="edit-address">
                      <Button color="white" onClick={() => setAddress(address)}>
                        Edit
                      </Button>
                    </Modal.Open>
                    {/* Delete address button */}
                    <Modal.Open opens="delete-address">
                      <Button color="white" onClick={() => setAddress(address)}>
                        Delete
                      </Button>
                    </Modal.Open>
                  </div>
                </div>
              ))}
              {/* Add address modal */}
              <AddAddressModal />
              {/* Delete address modal */}
              <DeleteAddressModal
                id={address?._id}
                onClose={() => setAddress(null)}
              />
              {/* Edit address modal */}
              <EditAddressModal
                address={address}
                onClose={() => setAddress(null)}
              />
            </Container.Row.Column>
          </Container.Row>
        )}
      </Modal>
    </div>
  );
}

export default page;
