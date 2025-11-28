"use client";

import React, { useEffect, useRef, useState } from "react";
import { CloseCircle, SearchNormal1 } from "iconsax-react";
import { BsXLg } from "react-icons/bs";
import { twMerge } from "tailwind-merge";
import { useDisableScroll } from "../_hooks/useDisableScroll";
import { useRouter, useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState(query);

  const router = useRouter();

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

  // Clear search
  useEffect(() => {
    setSearchTerm(query);
  }, [searchParams]);

  // Disable scroll when search is open
  useDisableScroll(open);

  function handleSubmit(e: React.FormEvent) {
    // Prevent default form submission
    e.preventDefault();

    // Close search bar
    setOpen(false);

    // Get search term
    const term = searchTerm.trim();
    if (!term) return;

    // Redirect to search page
    const url = new URL(window.location.href);
    url.pathname = "/search";
    url.searchParams.delete("sort");
    url.searchParams.delete("price");
    url.searchParams.set("q", term);
    router.push(url.toString());
  }

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
        <form
          onSubmit={handleSubmit}
          className="flex w-full items-center justify-center max-w-[960px] px-4 mx-auto gap-4"
        >
          <div className="px-4 py-2  flex-1 max-h-11 focus-within:border-[#121212] outline-0 flex items-center gap-3 rounded-xs border border-[#767676]">
            <input
              ref={inputRef}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Search"
              className="flex-1 w-0 outline-0  placeholder:font-satoshi"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="button"
              >
                <CloseCircle color="#121212" size={20} variant="Outline" />
              </button>
            )}
            <button className="button" type="submit">
              <SearchNormal1 color="#121212" size={20} variant="Outline" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="button"
          >
            <BsXLg size={20} color="#121212" />
          </button>
        </form>
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
