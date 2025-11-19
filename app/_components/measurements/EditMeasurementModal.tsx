"use client";
import Button from "../Button";
import Form from "../Form";
import Modal from "../modal/Modal";
import Steps from "../steps/Steps";
import useMutate from "@/app/_hooks/useMutate";
import Spinner from "../Spinner";
import { memo, useState, useEffect } from "react";
import { useModalContext } from "../modal/ModalContext";
import { useStepsContext } from "../steps/StepsContext";
import { useMeasurementStore } from "@/app/_stores/measurementStore";
import { Measurement } from "@/app/_types/measurement";

function EditMeasurementModal({
  measurement,
  onClose,
}: {
  measurement: Measurement | null;
  onClose: () => void;
}) {
  // Initial state
  const initialState = {
    name: measurement?.name || "",
    unit: measurement?.details.unit || "",
    height: measurement?.details.body.height || 0,
    weight: measurement?.details.body.weight || 0,
    bicep: measurement?.details.top.bicep || 0,
    bodyShape: measurement?.details.body.bodyShape || "",
    postureNotes: measurement?.details.body.postureNotes || "",
    chest: measurement?.details.top.chest || 0,
    neck: measurement?.details.top.neck || 0,
    topLength: measurement?.details.top.topLength || 0,
    shoulderWidth: measurement?.details.top.shoulderWidth || 0,
    waist: measurement?.details.trouser.waist || 0,
    hip: measurement?.details.trouser.hip || 0,
    fit: measurement?.details.preferences.fit || "",
    wrist: measurement?.details.top.wrist || 0,
    sleeveStyle: measurement?.details.preferences.sleeveStyle || "",
    sleeveLength: measurement?.details.top.sleeveLength || 0,
    knee: measurement?.details.trouser.knee || 0,
    ankle: measurement?.details.trouser.ankle || 0,
    outseam: measurement?.details.trouser.outseam || 0,
    inseam: measurement?.details.trouser.inseam || 0,
    allowance: measurement?.details.preferences.allowance || 0,
    rise: measurement?.details.trouser.rise || 0,
    thigh: measurement?.details.trouser.thigh || 0,
    isDefault: measurement?.isDefault ? "on" : "off",
  };

  // Close modal
  const { close } = useModalContext();

  // Steps context
  const { setStep } = useStepsContext();

  const { updateMeasurement } = useMeasurementStore();

  // Form data
  const [form, setForm] = useState(initialState);

  // Keep form in sync if `measurement` prop changes after mount.
  useEffect(() => {
    setForm(initialState);
  }, [measurement]);

  const [update, loading, message] = useMutate(updateMeasurement);

  // Handle change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const target = e.target;
    const { name } = target as { name: string };

    // If the control is an input checkbox, use `checked` to represent state.
    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      setForm({ ...form, [name]: target.checked ? "on" : "off" });
      return;
    }

    const value = (
      target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    ).value;
    setForm({ ...form, [name]: value });
  };

  // Handle close
  const handleClose = () => {
    setStep(1);
    onClose();
  };

  // Cancel button
  const Cancel = memo(() => (
    <Button
      size="sm"
      color="white"
      type="button"
      onClick={() => {
        handleClose();
        close();
      }}
      disabled={loading}
    >
      Cancel
    </Button>
  ));

  // Previous button
  const Previous = memo(() => (
    <Button
      size="sm"
      type="button"
      color="white"
      disabled={loading}
      onClick={() => setStep((s) => s - 1)}
    >
      Previous
    </Button>
  ));

  // Validate Step
  const validateStep = (check: boolean) => check;

  // Handle update measurement
  const handleUpdateMeasurement = async () => {
    // Construct payload
    const payload: Measurement = {
      name: form.name,
      details: {
        unit: form.unit,
        body: {
          height: Number(form.height),
          weight: Number(form.weight),
          bodyShape: form.bodyShape,
          postureNotes: form.postureNotes,
        },
        top: {
          chest: Number(form.chest),
          neck: Number(form.neck),
          bicep: Number(form.bicep),
          wrist: Number(form.wrist),
          shoulderWidth: Number(form.shoulderWidth),
          sleeveLength: Number(form.sleeveLength),
          topLength: Number(form.topLength),
        },
        trouser: {
          waist: Number(form.waist),
          hip: Number(form.hip),
          rise: Number(form.rise),
          thigh: Number(form.thigh),
          knee: Number(form.knee),
          ankle: Number(form.ankle),
          outseam: Number(form.outseam),
          inseam: Number(form.inseam),
        },
        preferences: {
          fit: form.fit,
          allowance: Number(form.allowance),
          sleeveStyle: form.sleeveStyle,
        },
      },
      isDefault: form.isDefault === "on" ? true : false,
    };
    // Send add request
    if (measurement?._id)
      await update(
        {
          data: payload,
          onSuccess: () => {
            handleClose();
            close();
          },
        },
        measurement._id
      );
  };

  return (
    <Modal.Window
      title="Edit measurement profile"
      name="edit-measurement"
      onClose={handleClose}
    >
      <Form message={message}>
        {/* Step 1 */}
        <Steps.Step stepNumber={1}>
          <Form.InputGroup>
            <Form.Input
              type="text"
              placeholder="Profile name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <Form.Select
              label="Unit"
              name="unit"
              value={form.unit}
              onChange={handleChange}
              options={[
                { name: "Centimeters", value: "cm" },
                { name: "Inches", value: "in" },
              ]}
            />
          </Form.InputGroup>
          <Form.InputGroup>
            <Form.Input
              type="number"
              placeholder="Height"
              name="height"
              value={form.height}
              onChange={handleChange}
              required
            />
            <Form.Input
              type="number"
              placeholder="Weight (kg)"
              name="weight"
              value={form.weight}
              onChange={handleChange}
              required
            />
          </Form.InputGroup>
          <Form.InputGroup>
            <Form.Select
              label="Body shape"
              value={form.bodyShape}
              onChange={handleChange}
              name="bodyShape"
              options={[
                { name: "Slim", value: "slim" },
                { name: "Athletic", value: "athletic" },
                { name: "Average", value: "average" },
                { name: "Broad", value: "broad" },
                { name: "Heavy", value: "heavy" },
              ]}
            />
            <Form.Select
              label="Preferred fit"
              value={form.fit}
              onChange={handleChange}
              name="fit"
              options={[
                { name: "Regular", value: "regular" },
                { name: "Slim", value: "slim" },
                { name: "Relaxed", value: "relaxed" },
              ]}
            />
          </Form.InputGroup>
          <div className="flex flex-col-reverse items-center sm:flex-row gap-3">
            <Cancel />
            <div className="flex flex-1 gap-3 justify-end">
              <Button
                size="sm"
                type="button"
                onClick={() => setStep((s) => s + 1)}
                disabled={validateStep(
                  !form.name ||
                    !form.unit ||
                    !form.height ||
                    !form.weight ||
                    !form.bodyShape ||
                    !form.fit
                )}
              >
                Next
              </Button>
            </div>
          </div>
        </Steps.Step>
        {/* Step 2 */}
        <Steps.Step stepNumber={2}>
          <Form.InputGroup>
            <Form.Input
              type="number"
              placeholder="Neck"
              name="neck"
              value={form.neck}
              onChange={handleChange}
              required
            />
            <Form.Input
              type="number"
              required
              placeholder="Shoulder width"
              name="shoulderWidth"
              value={form.shoulderWidth}
              onChange={handleChange}
            />
          </Form.InputGroup>
          <Form.InputGroup>
            <Form.Input
              type="number"
              placeholder="Chest"
              name="chest"
              value={form.chest}
              onChange={handleChange}
              required
            />
            <Form.Input
              type="number"
              placeholder="Sleeve length"
              name="sleeveLength"
              value={form.sleeveLength}
              onChange={handleChange}
              required
            />
          </Form.InputGroup>
          <Form.InputGroup>
            <Form.Input
              placeholder="Bicep"
              value={form.bicep}
              onChange={handleChange}
              name="bicep"
              required
              type="number"
            />
            <Form.Input
              placeholder="Wrist"
              value={form.wrist}
              onChange={handleChange}
              name="wrist"
              required
              type="number"
            />
          </Form.InputGroup>
          <Form.InputGroup>
            <Form.Input
              type="number"
              placeholder="Top length"
              name="topLength"
              required
              value={form.topLength}
              onChange={handleChange}
            />
            <Form.Select
              options={[
                {
                  name: "3/4 Length",
                  value: "3/4 length",
                },
                {
                  name: "Long sleeve",
                  value: "long sleeve",
                },
              ]}
              label="Sleeve style"
              name="sleeveStyle"
              value={form.sleeveStyle}
              required
              onChange={handleChange}
            />
          </Form.InputGroup>

          <div className="flex flex-col-reverse items-center sm:flex-row gap-3">
            <Cancel />
            <div className="flex flex-1 gap-3 justify-end">
              <Previous />
              <Button
                size="sm"
                type="button"
                onClick={() => setStep((s) => s + 1)}
                disabled={validateStep(
                  !form.neck ||
                    !form.shoulderWidth ||
                    !form.chest ||
                    !form.sleeveLength ||
                    !form.bicep ||
                    !form.wrist ||
                    !form.topLength ||
                    !form.sleeveStyle
                )}
              >
                Next
              </Button>
            </div>
          </div>
        </Steps.Step>
        <Steps.Step stepNumber={3}>
          <Form.InputGroup>
            <Form.Input
              type="number"
              placeholder="Waist"
              name="waist"
              value={form.waist}
              onChange={handleChange}
              required
            />
            <Form.Input
              type="number"
              placeholder="Hip"
              name="hip"
              value={form.hip}
              onChange={handleChange}
              required
            />
          </Form.InputGroup>
          <Form.InputGroup>
            <Form.Input
              type="number"
              placeholder="Rise"
              name="rise"
              value={form.rise}
              onChange={handleChange}
              required
            />
            <Form.Input
              type="number"
              placeholder="Thigh"
              name="thigh"
              value={form.thigh}
              onChange={handleChange}
              required
            />
          </Form.InputGroup>
          <Form.InputGroup>
            <Form.Input
              type="number"
              placeholder="Knee"
              name="knee"
              value={form.knee}
              onChange={handleChange}
              required
            />
            <Form.Input
              type="number"
              placeholder="Ankle"
              name="ankle"
              value={form.ankle}
              onChange={handleChange}
              required
            />
          </Form.InputGroup>
          <Form.InputGroup>
            <Form.Input
              type="number"
              placeholder="Outseam"
              name="outseam"
              value={form.outseam}
              onChange={handleChange}
              required
            />
            <Form.Input
              type="number"
              placeholder="Inseam"
              name="inseam"
              value={form.inseam}
              onChange={handleChange}
              required
            />
          </Form.InputGroup>
          <div className="flex flex-col-reverse items-center sm:flex-row gap-3">
            <Cancel />
            <div className="flex flex-1 gap-3 justify-end">
              <Previous />
              <Button
                size="sm"
                type="button"
                onClick={() => setStep((s) => s + 1)}
                disabled={validateStep(
                  !form.waist ||
                    !form.hip ||
                    !form.rise ||
                    !form.thigh ||
                    !form.knee ||
                    !form.ankle ||
                    !form.outseam ||
                    !form.inseam
                )}
              >
                Next
              </Button>
            </div>
          </div>
        </Steps.Step>
        <Steps.Step stepNumber={4}>
          <Form.Input
            type="number"
            placeholder="Easy allowance"
            name="allowance"
            value={form.allowance}
            onChange={handleChange}
            required
          />
          <Form.Textarea
            name="postureNotes"
            placeholder="Posture notes (optional)"
            rows={6}
            value={form.postureNotes}
            onChange={handleChange}
          />
          <Form.CheckBox
            label="Set as default"
            name="isDefault"
            checked={form.isDefault === "on"}
            onChange={handleChange}
          />
          <div className="flex flex-col-reverse items-center sm:flex-row gap-3">
            <Cancel />
            <div className="flex flex-1 gap-3 justify-end">
              <Previous />
              <Button
                size="sm"
                type="button"
                onClick={handleUpdateMeasurement}
                disabled={validateStep(!form.allowance) || loading}
              >
                {loading ? <Spinner /> : "Save"}
              </Button>
            </div>
          </div>
        </Steps.Step>
      </Form>
    </Modal.Window>
  );
}

export default EditMeasurementModal;
