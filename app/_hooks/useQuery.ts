"use client";
import { useEffect, useState } from "react";

/**
 * useQuery
 * A small client-side hook for invoking read-style API functions.
 *
 * Pattern mirrors `useMutate` in this codebase but focuses on fetching
 * data and storing it locally (`data`). It handles `loading` state and
 * a transient `message` (used for error notifications).
 *
 * API:
 *  - call `useQuery(apiFunction)` where `apiFunction` returns a Promise<TData>
 *  - returns a tuple: [query, loading, data, message, setMessage, setData]
 *
 * `query` signature:
 *  query({ args?, onSuccess? } = {}, ...rest) => Promise<TData | null>
 *  - `args` is an array of arguments that will be spread into `apiFunction`.
 *  - `onSuccess` is an optional callback invoked with the response.
 *  - additional `rest` args are appended after `args` when calling `apiFunction`.
 *
 * Notes:
 *  - Returns `null` on error and sets a message with type `error`.
 *  - `data` is populated with the latest successful response.
 *  - `setData` is exposed for manual updates (useful for optimistic UI or cache updates).
 *
 * Example usage:
 *  const [query, loading, data, message] = useQuery(api.getItems);
 *  await query({ args: [page, pageSize], onSuccess: (res) => console.log(res) });
 */
export default function useQuery<TData>(
  apiFunction: (...args: any[]) => Promise<TData>
) {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<TData | null>(null);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Auto-clear transient messages after 5 seconds (same behavior as useMutate)
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  /**
   * query: performs the API call and updates local state
   * - args: optional array of args to spread into apiFunction
   * - onSuccess: optional callback invoked with the successful response
   */
  const query = async (
    {
      args,
      onSuccess,
    }: {
      args?: any[];
      onSuccess?: (response: TData) => void;
    } = {},
    ...rest: any[]
  ): Promise<TData | null> => {
    try {
      setLoading(true);
      setMessage(null);

      // Call the provided API function. `args` is expected to be an array.
      const response = await apiFunction(...(args ?? []), ...rest);

      // Save result and run success callback if provided
      setData(response);
      onSuccess?.(response);
      return response;
    } catch (err: any) {
      const messageText = err?.message ?? "Something went wrong";
      setMessage({ type: "error", message: messageText });
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Expose setters so callers can manipulate cached data or messages directly
  return [query, loading, data, message, setMessage, setData] as const;
}
