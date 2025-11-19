"use client";
import { useEffect, useState } from "react";

export default function useMutate<TData>(
  apiFunction: (data: TData, ...args: any[]) => Promise<any>
) {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const mutate = async (
    {
      data,
      onSuccess,
    }: {
      data: TData;
      onSuccess?: (response?: any) => void;
    },
    ...rest: any[]
  ): Promise<void> => {
    try {
      setLoading(true);
      setMessage(null);
      // Send request
      const response = await apiFunction(data, ...rest);
      // On success
      onSuccess?.(response);
    } catch (err: any) {
      const message = err?.message ?? "Something went wrong";
      setMessage({ type: "error", message });
    } finally {
      setLoading(false);
    }
  };

  return [mutate, loading, message, setMessage] as const;
}
