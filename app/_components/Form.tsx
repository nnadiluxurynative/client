// UI helper icons used in form messages and custom controls
import { InfoCircle, TickCircle } from "iconsax-react";
import { BiCheck } from "react-icons/bi";
import { BsChevronDown } from "react-icons/bs";
// `twMerge` merges Tailwind class strings intelligently (avoids duplicates)
import { twMerge } from "tailwind-merge";

/**
 * Props for the top-level `Form` component.
 *
 * - Extends native `form` attributes so it can receive `onSubmit`, `className`,
 *   etc.
 * - `message` is an optional inline alert used to show success/error messages
 *   at the top of the form.
 */
interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  message?: {
    type: "success" | "error";
    message: string;
  } | null;
}

/**
 * Reusable input props — currently just the native input props.
 * Kept as a separate interface to allow future extension (validation flags,
 * formatter options, etc.).
 */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

/**
 * Props for `Textarea` component — extends native textarea attributes.
 */
interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

/**
 * Props for the custom Select component.
 * - `label` is rendered above/in the select control (floating label behavior).
 * - `options` is a simple array of { name, value } pairs used to populate
 *   the dropdown.
 */
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { name: string; value: string }[];
}

import React from "react";
/**
 * Top-level `Form` wrapper used across the app.
 * - Provides a standard vertical layout and optional inline message UI.
 * - Children typically use the attached subcomponents (Form.Input, Form.Select, etc.).
 */
type CompoundForm = React.ForwardRefExoticComponent<
  FormProps & React.RefAttributes<HTMLFormElement>
> & {
  Textarea: typeof Textarea;
  Input: typeof Input;
  CheckBox: typeof CheckBox;
  InputGroup: typeof InputGroup;
  Select: typeof Select;
};

const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ children, className, message = null, ...rest }, ref) => {
    return (
      <form
        ref={ref}
        className={twMerge("flex flex-col gap-3", className && className)}
        {...rest}
      >
        {/* Inline feedback message (success / error) shown above fields */}
        {message && (
          <div
            className={twMerge(
              "flex items-center gap-2 text-sm py-2 px-4",
              message.type === "error" && "bg-[#FAE7EC]",
              message.type === "success" && "bg-[#E7FAEC]"
            )}
          >
            {/* Icon changes depending on message type */}
            {message.type === "error" && (
              <InfoCircle size={20} variant="Outline" color="#121212" />
            )}
            {message.type === "success" && (
              <TickCircle size={20} variant="Outline" color="#121212" />
            )}
            <span>{message.message}</span>
          </div>
        )}

        {/* Content area: children are laid out vertically with consistent gaps */}
        <div className="flex flex-col gap-y-4">{children}</div>
      </form>
    );
  }
) as CompoundForm;
Form.displayName = "Form";

/**
 * Custom select with a floating label and chevron indicator.
 * - Uses CSS `peer` selectors so the label floats when the select has a value.
 * - `options` are rendered as native <option> elements.
 */
function Select({ className, label, options, ...rest }: SelectProps) {
  return (
    <div className="relative">
      <select
        required
        className={twMerge(
          "px-3 pt-4 pb-2 w-full bg-white appearance-none satoshi cursor-pointer peer text-base max-h-11 border border-[#767676] focus:outline-none focus:border-[#121212] ",
          className
        )}
        {...rest}
      >
        {/* Empty placeholder option so the floating label appears */}
        <option value="" disabled hidden></option>
        {options.map((opt, idx: number) => (
          <option className="font-sans text-sm" key={idx} value={opt.value}>
            {opt.name}
          </option>
        ))}
      </select>

      {/* Floating label: moves up when select is valid or focused */}
      <label
        className="absolute pointer-events-none left-3 top-2 text-base text-[#767676] transition-all
               peer-focus:top-1 peer-focus:text-[11px] peer-focus:text-foreground
               peer-invalid:top-2.5 peer-invalid:text-base peer-invalid:text-[#767676]
               peer-valid:top-1 peer-valid:text-[11px] peer-valid:text-foreground"
      >
        {label}
      </label>

      {/* Chevron indicator on the right */}
      <span className="absolute right-3 top-1/2 -translate-y-1/2 bg-white py-2 pointer-events-none">
        <BsChevronDown
          size={16}
          className=" text-[#767676] peer-focus:text-foreground peer-invalid:text-[#767676] peer-valid:text-foreground"
        />
      </span>
    </div>
  );
}

/**
 * Simple input wrapper that implements a floating label using peers.
 * - `placeholder` prop is used as the visible floating label text.
 */
function Input({ className, placeholder = "Email", ...rest }: InputProps) {
  return (
    <div className="relative">
      <input
        placeholder=" "
        className={twMerge(
          "px-3 py-2 pt-[22px] w-full peer flex-1 text-base max-h-11 border border-[#767676] focus:outline-none focus:border-[#121212]",
          className
        )}
        {...rest}
      />

      {/* Floating label — uses peer selectors to move/scale the label */}
      <label
        className="absolute pointer-events-none left-3 top-1 text-[11px] font-normal text-[#414141] transition-all
               peer-placeholder-shown:top-2.5 peer-focus:text-[11px]  peer-placeholder-shown:text-[#767676] peer-placeholder-shown:text-base
               peer-focus:top-1 peer-focus:text-foreground"
      >
        {placeholder}
      </label>
    </div>
  );
}

/**
 * A two-column input group used to lay out two related inputs side-by-side.
 * Additional classes can be passed via `className`.
 */
function InputGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={twMerge(`grid grid-cols-2 gap-3`, className && className)}>
      {children}
    </div>
  );
}

/**
 * Textarea with floating label behavior. Works like `Input` but for multi-line text.
 */
function Textarea({
  className,
  placeholder = "Email",
  ...rest
}: TextareaProps) {
  return (
    <div className="relative px-3 py-2 pt-4 border border-[#767676] focus-within:border-[#121212]">
      <textarea
        placeholder=" "
        className={twMerge(
          "w-full appearance-none peer flex-1 text-base focus:outline-none resize-none",
          className
        )}
        {...rest}
      />
      <label
        className="absolute pointer-events-none left-3 top-1 text-[11px] font-normal text-[#414141] transition-all
               peer-placeholder-shown:top-2.5 peer-focus:text-[11px]  peer-placeholder-shown:text-[#767676] peer-placeholder-shown:text-base
               peer-focus:top-1 peer-focus:text-foreground"
      >
        {placeholder}
      </label>
    </div>
  );
}

/**
 * Custom checkbox that visually replaces the native box with a styled circle.
 * - The native checkbox input remains (for a11y), but is visually hidden.
 * - The visible control uses `peer` styles so checked state updates the UI.
 */
function CheckBox({
  className,
  label,
  ...rest
}: InputProps & { label: string }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer satoshi">
      {/* Hidden native checkbox kept for accessibility */}
      <input type="checkbox" className="peer hidden" {...rest} />

      {/* Visible custom checkbox */}
      <span className="w-4 h-4 flex items-center justify-center border border-gray-300  peer-checked:bg-[#121212] peer-checked:border-[#121212] peer-checked:[&>svg]:opacity-100">
        {/* Check icon becomes visible when checked (opacity toggled via peer) */}
        <BiCheck size={20} className="text-[#ffffff] opacity-0" />
      </span>

      {/* Label text for the checkbox */}
      <span className="text-[#001010]">{label}</span>
    </label>
  );
}

Form.Textarea = Textarea;
Form.Input = Input;
Form.CheckBox = CheckBox;
Form.InputGroup = InputGroup;
Form.Select = Select;

export default Form;
