"use client";
import Modal from "../modal/Modal";
import Button from "../Button";
import { useModalContext } from "../modal/ModalContext";
import { useAuthStore } from "@/app/_stores/authStore";
import { useState } from "react";

type Props = {
  onSelect?: (id: string) => void;
};

export default function SelectMeasurementModal({ onSelect }: Props) {
  const { close } = useModalContext();
  const { user } = useAuthStore();
  const measurements = user?.measurements ?? [];
  const [selected, setSelected] = useState<string | null>(
    measurements?.[0]?._id ?? null
  );

  const handleSave = () => {
    if (!selected) return;
    onSelect?.(selected);
    close();
  };

  return (
    <Modal.Window title="Select measurement" name="select-measurement">
      <div className="space-y-4">
        {measurements.length === 0 ? (
          <div className="text-sm">No measurement profiles found.</div>
        ) : (
          <div className="flex flex-col gap-2">
            {measurements.map((m: any) => (
              <label
                key={m._id}
                className="flex items-center gap-3 p-2 border rounded cursor-pointer"
              >
                <input
                  type="radio"
                  name="measurement"
                  checked={selected === m._id}
                  onChange={() => setSelected(m._id)}
                />
                <div>
                  <div className="font-medium">{m.name}</div>
                  <div className="text-xs text-gray-500">{m.details?.unit}</div>
                </div>
              </label>
            ))}
          </div>
        )}

        <div className="flex gap-3 justify-end">
          <Button color="white" size="sm" onClick={() => close()}>
            Cancel
          </Button>
          <Button size="sm" onClick={handleSave} disabled={!selected}>
            Save
          </Button>
        </div>
      </div>
    </Modal.Window>
  );
}
