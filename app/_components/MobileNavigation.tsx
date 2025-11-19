"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { HambergerMenu, User } from "iconsax-react";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { useDisableScroll } from "../_hooks/useDisableScroll";
import { links } from "../_utils/constants";
import { BsXLg } from "react-icons/bs";
import { useAuthStore } from "../_stores/authStore";

type MobileNavigationProps = {
  headerHeight: number;
};

function MobileNavigation({ headerHeight }: MobileNavigationProps) {
  // Mobile menu state
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // Get path name
  const pathname = usePathname();

  const { user } = useAuthStore();

  useEffect(() => {
    // Anytime pathname changes → close the menu
    setIsOpen(false);
  }, [pathname, setIsOpen]);

  // Check if link is active
  const isActive = (href: string) => pathname === href;
  // Disable scroll when menu is open
  useDisableScroll(isOpen);
  return (
    <React.Fragment>
      {/* Mobile Menu Button */}
      <button
        className="button min-w-10 md:hidden"
        onClick={() => setIsOpen((s) => !s)}
      >
        {isOpen ? (
          <BsXLg color="#121212" size={20} />
        ) : (
          <HambergerMenu color="#121212" size={24} variant="Outline" />
        )}
      </button>
      {/* Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        style={{
          top: `${headerHeight}px`,
          height: `calc(100vh - ${headerHeight}px)`,
        }}
        className={twMerge(
          "fixed left-0 transition-all h-full md:hidden w-full pointer-events-none bg-black duration-300 ease-in-out opacity-0 z-40",
          isOpen && "opacity-30 pointer-events-auto"
        )}
      />
      {/* Side Navigation */}
      <nav
        style={{
          top: `${headerHeight}px`,
          height: `calc(100vh - ${headerHeight}px)`,
        }}
        className={twMerge(
          "fixed left-0 flex flex-col justify-between w-full sm:max-w-[400px] pt-6 md:hidden -translate-x-full bg-white z-50 transform transition-transform duration-300",
          isOpen && "translate-x-0"
        )}
      >
        {/* Render links */}
        <ul className="flex flex-col text-sm uppercase gap-y-0.5 font-medium">
          {links.map((item, i) => (
            <li key={i}>
              <Link
                className={twMerge(
                  "px-4 py-3 inline-block w-full hover:bg-[#ececec]",
                  isActive(item.href) && "bg-[#f8f8f8]"
                )}
                href={item.href}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="bg-[#f8f8f8] p-4">
          <Link
            href={user ? "/account" : "/login"}
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 hover:[&>svg]:scale-110"
          >
            <User size={24} color="#121212" variant="Outline" />
            <span>{user ? "Account" : "Login"}</span>
          </Link>
        </div>
      </nav>
    </React.Fragment>
  );
}

export default MobileNavigation;
