"use client";
import Modal from "../modal/Modal";
import Button from "../Button";
import Link from "next/link";
import { useModalContext } from "../modal/ModalContext";

export default function RequireLoginModal({
  onCancel,
}: {
  onCancel: () => void;
}) {
  const { close } = useModalContext();

  return (
    <Modal.Window
      title="Please login"
      name="require-login"
      onClose={() => onCancel()}
    >
      <div className="space-y-4">
        <p>You need to be logged in to use custom sizes.</p>
        <div className="flex gap-3 justify-end">
          <Button
            color="white"
            size="sm"
            onClick={() => {
              close();
              onCancel();
            }}
          >
            Cancel
          </Button>
          <Link href="/login">
            <Button size="sm" onClick={() => close()}>
              Login
            </Button>
          </Link>
        </div>
      </div>
    </Modal.Window>
  );
}
