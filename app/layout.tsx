import type { Metadata } from "next";
import localFont from "next/font/local";
import AppInitializer from "./_components/AppInitializer";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import HydrationGate from "./_components/HydrationGate";
import ScrollTop from "./_components/ScrollTop";
import "./_styles/globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`flex flex-col min-h-screen bg-white ${satoshi.variable} ${satoshi.className}`}
      >
        <div className="flex-1">
          <HydrationGate>
            <ScrollTop />
            <AppInitializer />
            <Header />
            {children}
          </HydrationGate>
        </div>
        <Footer />
      </body>
    </html>
  );
}
