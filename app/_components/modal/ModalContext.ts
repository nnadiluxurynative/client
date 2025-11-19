import React, { createContext, useContext } from "react";

// Create context
export const ModalContext = createContext<
  | undefined
  | {
      active: string | null;
      close: () => void;
      setActive: React.Dispatch<React.SetStateAction<string | null>>;
    }
>(undefined);

// Use context
export const useModalContext = () => {
  // Get context
  const context = useContext(ModalContext);

  // Error if used outside provider
  if (context === undefined)
    throw new Error("ModalContext was used outside provider");

  return context;
};
