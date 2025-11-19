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

function AddAddressModal() {
  // Close modal
  const { close } = useModalContext();
  // Add address
  const { addAddress } = useAddresStore();

  const [add, loading, message] = useMutate(addAddress);
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent default submit
    e.preventDefault();
    // Get form data
    const form = e.currentTarget;
    const formData = Object.fromEntries(new FormData(form));
    const data = {
      ...formData,
      isDefault: formData.isDefault === "on",
    } as Address;

    // Add address
    await add({
      data,
      onSuccess: () => {
        form.reset();
        close();
      },
    });
  };
  return (
    <Modal.Window title="Add address" name="add-address">
      <Form onSubmit={handleSubmit} message={message}>
        <Form.InputGroup>
          <Form.Input
            type="text"
            placeholder="First name"
            name="firstName"
            required
          />
          <Form.Input
            type="text"
            placeholder="Last name"
            name="lastName"
            required
          />
        </Form.InputGroup>
        <Form.InputGroup>
          <Form.Input type="text" placeholder="City" name="city" required />
          <Form.Select
            label="State"
            defaultValue=""
            options={nigerianStates}
            name="state"
            required
          />
        </Form.InputGroup>
        <Form.Input type="text" placeholder="Address" name="address" required />
        <Form.Input type="text" placeholder="Phone" name="phone" required />
        <Form.CheckBox label="Set as default" name="isDefault" />
        <div className="flex gap-3">
          <Button size="sm" color="white" type="reset" onClick={() => close()}>
            Cancel
          </Button>
          <Button type="submit" size="sm" disabled={loading}>
            {loading ? <Spinner /> : "Add"}
          </Button>
        </div>
      </Form>
    </Modal.Window>
  );
}

export default AddAddressModal;
