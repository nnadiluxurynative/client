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

// utility: detect if a hex color is light (returns true for light colors)
export const isLightColor = (hex?: string) => {
  if (!hex) return false;
  // normalize
  const h = hex.replace("#", "").trim();
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const r = parseInt(full.substring(0, 2), 16);
  const g = parseInt(full.substring(2, 4), 16);
  const b = parseInt(full.substring(4, 6), 16);

  // relative luminance
  const srgb = [r, g, b].map((v) => v / 255);
  const lin = srgb.map((c) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  );
  const lum = 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
  return lum > 0.85; // threshold, tweak if needed
};
