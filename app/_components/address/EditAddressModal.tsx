"use client";
import Button from "../Button";
import Form from "../Form";
import Modal from "../modal/Modal";
import useMutate from "@/app/_hooks/useMutate";
import Spinner from "../Spinner";
import { useModalContext } from "../modal/ModalContext";
import { useAddresStore } from "@/app/_stores/addressStore";
import { Address } from "@/app/_types/address";
import { nigerianStates } from "@/app/_utils/constants";
import { useRef } from "react";

function EditAddressModal({
  address,
  onClose,
}: {
  address: Address | null;
  onClose?: () => void;
}) {
  // Close modal
  const { close } = useModalContext();
  // Add address
  const { updateAddress } = useAddresStore();

  const [update, loading, message] = useMutate(updateAddress);

  const formRef = useRef<HTMLFormElement>(null);

  // Handle close - reset form
  const handleClose = () => {
    formRef.current?.reset();
    onClose?.();
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent default submit
    e.preventDefault();
    // Get form data
    const form = e.currentTarget;
    const formData = Object.fromEntries(new FormData(form));
    let data = { ...formData } as unknown as Address;
    if (data.isDefault) data.isDefault = true;

    // Update address
    if (address)
      await update(
        {
          data,
          onSuccess: () => {
            onClose?.();
            close();
          },
        },
        address._id
      );
  };
  return (
    <Modal.Window
      title="Edit address"
      name="edit-address"
      onClose={handleClose}
    >
      <Form onSubmit={handleSubmit} ref={formRef} message={message}>
        <Form.InputGroup>
          <Form.Input
            type="text"
            defaultValue={address?.firstName}
            placeholder="First name"
            name="firstName"
            required
          />
          <Form.Input
            type="text"
            defaultValue={address?.lastName}
            placeholder="Last name"
            name="lastName"
            required
          />
        </Form.InputGroup>
        <Form.InputGroup>
          <Form.Input
            type="text"
            placeholder="City"
            name="city"
            required
            defaultValue={address?.city}
          />
          <Form.Select
            label="State"
            defaultValue={address?.state}
            options={nigerianStates}
            name="state"
            required
          />
        </Form.InputGroup>
        <Form.Input
          type="text"
          placeholder="Address"
          name="address"
          required
          defaultValue={address?.address}
        />
        <Form.Input
          type="text"
          placeholder="Phone"
          name="phone"
          required
          defaultValue={address?.phone}
        />
        <Form.CheckBox label="Set as default" name="isDefault" />
        <div className="flex gap-3 mt-1">
          <Button
            color="white"
            type="button"
            size="sm"
            onClick={() => {
              handleClose();
              close();
            }}
          >
            Cancel
          </Button>
          <Button size="sm" type="submit" disabled={loading}>
            {loading ? <Spinner /> : "Update"}
          </Button>
        </div>
      </Form>
    </Modal.Window>
  );
}

export default EditAddressModal;
