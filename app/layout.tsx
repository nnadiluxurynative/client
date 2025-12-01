import type { Metadata } from "next";
import AppInitializer from "@/app/_components/AppInitializer";
import HydrationGate from "@/app/_components/HydrationGate";
import ScrollTop from "@/app/_components/ScrollTop";
import localFont from "next/font/local";
import "@/app/_styles/globals.css";

// Metadata for the application
export const metadata: Metadata = {
  title: "Nnadi Luxury native - The Luxury Native",
};

const satoshi = localFont({
  src: [
    {
      path: "./_fonts/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./_fonts/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./_fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
});

function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`flex flex-col min-h-screen bg-white ${satoshi.variable} ${satoshi.className}`}
      >
        <HydrationGate>
          <ScrollTop />
          <AppInitializer />
          {children}
        </HydrationGate>
      </body>
    </html>
  );
}

export default RootLayout;
