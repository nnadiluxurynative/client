import React, { cloneElement, useState, ReactElement } from "react";
import { createPortal } from "react-dom";
import { ModalContext, useModalContext } from "./ModalContext";
import { useDisableScroll } from "@/app/_hooks/useDisableScroll";
import { twMerge } from "tailwind-merge";
import { BsXLg } from "react-icons/bs";

// Modal
function Modal({ children }: { children: React.ReactNode }) {
  // Active state
  const [active, setActive] = useState<string | null>(null);

  // Close modal
  const close = () => setActive(null);

  return (
    <ModalContext.Provider value={{ active, close, setActive }}>
      {children}
    </ModalContext.Provider>
  );
}

// Open Button
function Open({
  opens,
  children,
}: {
  opens: string;
  children: ReactElement<any, any>;
}) {
  // Get context
  const { setActive } = useModalContext();

  // Clone child with onClick event
  return cloneElement(children, {
    onClick: (e: React.MouseEvent<HTMLElement>) => {
      // Call original onClick if exists
      (children.props as any).onClick?.(e);
      // Open modal asynchronously so any state set by the child's onClick
      // has a chance to flush before the modal mounts.
      setTimeout(() => setActive(opens), 50);
    },
  });
}

// Disable scroll
function StopScroll({ isActive }: { isActive: boolean }) {
  useDisableScroll(isActive);
  return null;
}

// Window
function Window({
  name,
  children,
  title,
  onClose,
  className,
}: {
  name: string;
  children: React.ReactNode;
  title: React.ReactNode;
  onClose?: () => void;
  className?: string;
}) {
  // Get context
  const { active, close } = useModalContext();

  // Check if window is active

  const handleClose = () => {
    onClose?.();
    close();
  };

  const isActive = name === active;

  return createPortal(
    <React.Fragment>
      <StopScroll isActive={isActive} />
      <div
        onClick={handleClose}
        className={twMerge(
          "fixed left-0 transition-all h-full  w-full pointer-events-none bg-black duration-100 ease-out opacity-0 z-50",
          isActive && "opacity-30 pointer-events-auto"
        )}
      />

      <div
        className={twMerge(
          "w-full opacity-0 transition-all pointer-events-none fixed z-60 bottom-0 duration-200 ease-out bg-white px-4 py-6 sm:p-6 sm:max-w-[580px] sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/4 translate-y-1/2 ",
          isActive &&
            "opacity-100 pointer-events-auto translate-y-0 sm:-translate-y-1/2",
          className && className
        )}
      >
        <div
          className={twMerge(
            "flex justify-end items-center gap-4 mb-4",
            title && "justify-between"
          )}
        >
          {title && <h3 className="text-lg font-medium">{title}</h3>}
          <button className="button" onClick={handleClose}>
            <BsXLg size={18} color="#121212" />
          </button>
        </div>
        {children}
      </div>
    </React.Fragment>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;
export default Modal;
