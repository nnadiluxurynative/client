import { useEffect, useState } from "react";

/**
 * Custom hook to detect when the component has hydrated on the client.
 * Returns a boolean `hydrated` that is false during SSR and true after mount.
 */
export function useHydrate() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated;
}
