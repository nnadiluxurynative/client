"use client";
import useMutate from "@/app/_hooks/useMutate";
import Button from "../Button";
import Modal from "../modal/Modal";
import Spinner from "../Spinner";
import { useModalContext } from "../modal/ModalContext";
import { useMeasurementStore } from "@/app/_stores/measurementStore";

function DeleteMeasurementModal({
  id,
  onClose,
}: {
  id: string | undefined;
  onClose?: () => void;
}) {
  // Delete measurement
  const { deleteMeasurement } = useMeasurementStore();
  const [remove, loading] = useMutate(deleteMeasurement);
  // Close modal
  const { close } = useModalContext();

  // Delete measurement function
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
    <Modal.Window title="Delete measurement" name="delete-measurement">
      <p>Are you sure you want to delete this measurement? </p>
      <div className="flex gap-3 mt-4 justify-end">
        {/* Cancel button */}
        <Button
          color="white"
          disabled={loading}
          size="sm"
          onClick={() => {
            onClose?.();
            close();
          }}
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

export default DeleteMeasurementModal;
