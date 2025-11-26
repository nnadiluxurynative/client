"use client";
import Modal from "../modal/Modal";
import Button from "../Button";
import { useModalContext } from "../modal/ModalContext";
import { useAuthStore } from "@/app/_stores/authStore";
import { useState } from "react";
import { Measurement } from "@/app/_types/measurement";

type Props = {
  onSelect?: (measurement: Measurement) => void;
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
    const selectedMeasurement = measurements.find((m) => m._id === selected);
    if (selectedMeasurement) onSelect?.(selectedMeasurement);
    close();
  };

  return (
    <Modal.Window title="Select measurement profile" name="select-measurement">
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          {measurements.map((m: any) => (
            <label
              key={m._id}
              className={`flex items-center gap-3 accent-[#121212] p-2 border cursor-pointer ${
                selected === m._id ? "border-[#121212]" : "border-[#767676]"
              }`}
            >
              <input
                type="radio"
                name="measurement"
                checked={selected === m._id}
                className="size-5"
                onChange={() => setSelected(m._id)}
              />
              <div className="flex flex-col">
                <p className="font-medium text-sm">{m.name}</p>
                <p className="text-sm leading-3.5 text-gray-500">
                  {m.details?.unit}
                </p>
              </div>
            </label>
          ))}
        </div>

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
