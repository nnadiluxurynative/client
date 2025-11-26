import Footer from "@/app/_components/Footer";
import Header from "@/app/_components/Header";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <React.Fragment>
      <div className="flex-1">
        <Header />
        {children}
      </div>
      <Footer />
    </React.Fragment>
  );
}
