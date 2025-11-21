import { ZodError } from "zod";

export const handleErrorMessage = (err: any, defaultMsg: string): string => {
  return err instanceof ZodError
    ? err.issues[0].message
    : err.response?.data?.message || err.message || defaultMsg;
};

export const formatNaira = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};
