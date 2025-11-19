"use client";

import React from "react";
import { useHydrate } from "../_hooks/useHydrate";

export default function HydrationGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const hydrated = useHydrate();
  if (!hydrated) {
    // Prevent rendering until hydration is complete
    return <div>Loading...</div>;
  }

  return <React.Fragment>{children}</React.Fragment>;
}
