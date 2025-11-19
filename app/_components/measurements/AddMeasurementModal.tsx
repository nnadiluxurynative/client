"use client";
import Button from "../Button";
import Form from "../Form";
import Modal from "../modal/Modal";
import Steps from "../steps/Steps";
import useMutate from "@/app/_hooks/useMutate";
import Spinner from "../Spinner";
import { memo, useState } from "react";
import { useModalContext } from "../modal/ModalContext";
import { useStepsContext } from "../steps/StepsContext";
import { useMeasurementStore } from "@/app/_stores/measurementStore";
import { Measurement } from "@/app/_types/measurement";

function AddMeasurementModal() {
  // Initial state
  const initialState = {
    name: "",
    unit: "",
    height: "",
    weight: "",
    bicep: "",
    bodyShape: "",
    postureNotes: "",
    chest: "",
    neck: "",
    topLength: "",
    shoulderWidth: "",
    waist: "",
    hip: "",
    fit: "",
    wrist: "",
    sleeveStyle: "",
    sleeveLength: "",
    knee: "",
    ankle: "",
    outseam: "",
    inseam: "",
    allowance: 2,
    rise: "",
    thigh: "",
    isDefault: "off",
  };

  // Close modal
  const { close } = useModalContext();

  // Steps context
  const { setStep } = useStepsContext();

  const { addMeasurement } = useMeasurementStore();

  // Form data
  const [form, setForm] = useState(initialState);

  const [add, loading, message] = useMutate(addMeasurement);

  // Handle change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name } = target;

    // If the control is a checkbox, use `checked` to represent state.
    if (target.type === "checkbox") {
      setForm({ ...form, [name]: target.checked ? "on" : "off" });
      return;
    }

    const { value } = target;
    setForm({ ...form, [name]: value });
  };

  // Handle close
  const handleClose = () => {
    setStep(1);
    setForm(initialState);
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

  // Handle add measurement
  const handleAddMeasurement = async () => {
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
    await add({
      data: payload,
      onSuccess: () => {
        handleClose();
        close();
      },
    });
  };

  return (
    <Modal.Window
      title="Add measurement profile"
      name="add-measurement"
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
          <Form.Textarea placeholder="Posture notes (optional)" rows={6} />
          <Form.CheckBox
            label="Set as default"
            name="isDefault"
            // Controlled checkbox: checked when form.isDefault === 'on'
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
                onClick={handleAddMeasurement}
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

export default AddMeasurementModal;
