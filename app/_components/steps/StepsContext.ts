import React, { createContext, useContext } from "react";

// Create context
export const StepsContext = createContext<
  | undefined
  | {
      step: number;
      setStep: React.Dispatch<React.SetStateAction<number>>;
    }
>(undefined);

// Use context
export const useStepsContext = () => {
  // Get context
  const context = useContext(StepsContext);

  // Error if used outside provider
  if (context === undefined)
    throw new Error("StepsContext was used outside provider");

  return context;
};
