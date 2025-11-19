"use client";

import { useEffect } from "react";
import { useAuthStore } from "../_stores/authStore";

const TOKEN_REFRESH_INTERVAL = 15 * 60 * 1000; // 15 minutes

export default function AppInitializer() {
  const { refreshAuth } = useAuthStore();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await refreshAuth();
      } catch (error) {
        console.error("Failed to initialize auth:", error);
      }
    };

    initializeAuth();

    const interval = setInterval(() => {
      refreshAuth().catch((error) =>
        console.error("Failed to refresh auth:", error)
      );
    }, TOKEN_REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [refreshAuth]);

  return null;
}
