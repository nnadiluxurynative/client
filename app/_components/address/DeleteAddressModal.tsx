"use client";
import useMutate from "@/app/_hooks/useMutate";
import Button from "../Button";
import Modal from "../modal/Modal";
import Spinner from "../Spinner";
import { useModalContext } from "../modal/ModalContext";
import { useAddresStore } from "@/app/_stores/addressStore";

function DeleteAddressModal({
  id,
  onClose,
}: {
  id: string | undefined;
  onClose?: () => void;
}) {
  // Delete address
  const { deleteAddress } = useAddresStore();
  const [remove, loading] = useMutate(deleteAddress);
  // Close modal
  const { close } = useModalContext();

  // Delete address function
  async function handleDelete(id: string | undefined) {
    if (id)
      await remove({
        data: id,
        onSuccess: () => {
          onClose?.();
          close();
        },
      });
  }

  return (
    <Modal.Window title="Delete address" name="delete-address">
      <p>Are you sure you want to delete this address? </p>
      <div className="flex gap-3 mt-4 justify-end">
        {/* Cancel button */}
        <Button
          color="white"
          size="sm"
          onClick={() => {
            onClose?.();
            close();
          }}
          disabled={loading}
        >
          Cancel
        </Button>
        {/* Delete button */}
        <Button
          color="black"
          size="sm"
          onClick={() => handleDelete(id)}
          disabled={loading}
        >
          {loading ? <Spinner /> : "Delete"}
        </Button>
      </div>
    </Modal.Window>
  );
}

export default DeleteAddressModal;
