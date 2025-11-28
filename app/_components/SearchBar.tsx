"use client";

import React, { useEffect, useRef } from "react";
import { SearchNormal1 } from "iconsax-react";
import { BsXLg } from "react-icons/bs";
import { twMerge } from "tailwind-merge";
import { useDisableScroll } from "../_hooks/useDisableScroll";

type SearchBarProps = {
  open: boolean;
  headerHeight: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SearchBar({
  headerHeight,
  open,
  setOpen,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus when opened
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  // Close on ESC
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Disable scroll when search is open
  useDisableScroll(open);

  return (
    <React.Fragment>
      {/* ===== SEARCH BAR ===== */}
      <div
        className={twMerge(
          `
          fixed left-0 w-full z-60 bg-white top-0 flex items-center justify-center
          transform opacity-0 -translate-y-4 pointer-events-none duration-100 ease-out
        `,
          open && "transition-all translate-y-0 opacity-100 pointer-events-auto"
        )}
        style={{ height: `${headerHeight}px` }}
      >
        <div className="flex w-full items-center justify-center max-w-[960px] px-4 mx-auto gap-4">
          <div className="px-4 py-2  flex-1 max-h-11 focus-within:border-[#121212] outline-0 flex items-center gap-3 rounded-xs border border-[#767676]">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search"
              className="flex-1 w-0 outline-0  placeholder:font-satoshi"
            />
            <button className="button">
              <SearchNormal1 color="#121212" size={20} variant="Outline" />
            </button>
          </div>
          <button onClick={() => setOpen(false)} className="button">
            <BsXLg size={20} color="#121212" />
          </button>
        </div>
      </div>
      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        style={{
          top: `${headerHeight}px`,
          height: `calc(100vh - ${headerHeight}px)`,
        }}
        className={twMerge(
          "fixed left-0 transition-all h-full  w-full pointer-events-none bg-black duration-100 ease-out opacity-0 z-50",
          open && "opacity-30 pointer-events-auto"
        )}
      />
    </React.Fragment>
  );
}
