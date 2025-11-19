"use client";
import { Bag2, SearchNormal1, User } from "iconsax-react";
import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../_stores/authStore";
import Link from "next/link";
import Container from "./Container";
import MobileNavigation from "./MobileNavigation";
import Navigation from "./Navigation";
import SearchBar from "./SearchBar";
import Logo from "./Logo";
import { twMerge } from "tailwind-merge";

function Header() {
  // Header height
  const [height, setHeight] = useState(0);

  const { user } = useAuthStore();

  // Search bar open state
  const [open, setOpen] = useState(false);

  // Header ref
  const headerRef = useRef<HTMLElement>(null);

  // Header is currently visible/sticky
  const [isSticky, setIsSticky] = useState(false);

  // Header has entered sticky mode at least once
  const [hasOpened, setHasOpened] = useState(false);

  // User has scrolled past header height
  const [isPastHeader, setIsPastHeader] = useState(false);

  useEffect(() => {
    if (!headerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      setHeight(entry.contentRect.height + 1);
    });

    observer.observe(headerRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let lastScroll = window.scrollY;

    const handleScroll = () => {
      const current = window.scrollY;

      // At very top
      if (current <= 0) {
        setIsSticky(false);
        setIsPastHeader(false);
        setHasOpened(false);
        lastScroll = 0;
        return;
      }

      // If scrolling down past header → hide
      if (current > lastScroll && current > height) {
        setIsSticky(false);
        setIsPastHeader(true);
      }

      // If scrolling up → show
      else if (current < lastScroll && current > height) {
        setIsSticky(true);
        setHasOpened(true);
      }

      lastScroll = current;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [height]);

  return (
    <header
      ref={headerRef}
      className={twMerge(
        "bg-white border-b border-b-grey relative transition-transform duration-300 top-0 z-50",
        isPastHeader && "-translate-y-full",
        isSticky && "translate-y-0",
        hasOpened && "sticky"
      )}
    >
      <Container className="md:py-6 py-4">
        {/* Header Top */}
        <Container.Row className="justify-between">
          <Container.Row.Column className="flex justify-between">
            {/* Button to open search bar */}
            <button
              className="button md:inline-block hidden"
              onClick={() => setOpen(true)}
            >
              <SearchNormal1 color="#121212" size={24} variant="Outline" />
            </button>
            {/* Mobile Navigation */}
            <MobileNavigation headerHeight={height} />
            {/* Site Logo */}
            <Link href="/" className="inline-block">
              <Logo />
            </Link>
            <div className="flex items-center gap-3">
              <button
                className="button md:hidden"
                onClick={() => setOpen(true)}
              >
                <SearchNormal1 color="#121212" size={24} variant="Outline" />
              </button>
              <Link
                href={user ? "/account" : "/login"}
                className="md:inline-block hidden button"
              >
                <User color="#121212" size={24} variant="Outline" />
              </Link>
              <button className="relative flex pr-2">
                <Link href="/cart" className="inline-block button">
                  <Bag2 color="#121212" size={24} variant="Outline" />
                </Link>
                <span className="absolute size-[18px] pointer-events-none right-0 -bottom-2 bg-foreground rounded-full text-background flex items-center justify-center font-medium text-[11px]">
                  4
                </span>
              </button>
            </div>
          </Container.Row.Column>
        </Container.Row>
        {/* Header Bottom */}
        <Container.Row>
          <Container.Row.Column className="justify-center">
            {/* Desktop Navigation */}
            <Navigation />
          </Container.Row.Column>
        </Container.Row>
      </Container>
      {/* Search Bar */}
      <SearchBar headerHeight={height} open={open} setOpen={setOpen} />
    </header>
  );
}

export default Header;
