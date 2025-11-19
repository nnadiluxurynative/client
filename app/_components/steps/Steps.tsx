import React, { useState } from "react";
import { StepsContext, useStepsContext } from "./StepsContext";

// Steps
function Steps({ children }: { children: React.ReactNode }) {
  // Active step
  const [step, setStep] = useState<number>(1);

  return (
    <StepsContext.Provider value={{ step, setStep }}>
      {children}
    </StepsContext.Provider>
  );
}

// Step Window
function Step({
  stepNumber,
  children,
}: {
  stepNumber: number;
  children: React.ReactNode;
}) {
  // Get context
  const { step } = useStepsContext();

  // Check if window is active

  if (step !== stepNumber) return null;

  return <React.Fragment>{children}</React.Fragment>;
}

Steps.Step = Step;

export default Steps;
