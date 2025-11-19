"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

function ScrollTop() {
  const pathName = usePathname();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [pathName]);
  return null;
}

export default ScrollTop;
