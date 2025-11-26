"use client";
import { Bag2, SearchNormal1, User } from "iconsax-react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useAuthStore } from "../_stores/authStore";
import { twMerge } from "tailwind-merge";
import { useCartStore } from "../_stores/cartStore";
import SearchBar from "./SearchBar";
import Link from "next/link";
import Container from "./Container";
import MobileNavigation from "./MobileNavigation";
import Navigation from "./Navigation";
import Logo from "./Logo";
import CartSidebar from "./cart/CartSidebar";

function Header() {
  // Header height
  const [height, setHeight] = useState(0);

  const { user } = useAuthStore();

  // Search bar open state
  const [open, setOpen] = useState(false);

  // Header ref
  const headerRef = useRef<HTMLElement>(null);

  const { getCartCount, toggleCart, isOpen } = useCartStore();

  const cartCount = getCartCount();

  // Header is currently visible/sticky
  // Whether header is hidden (scrolled down) or visible
  const [isHidden, setIsHidden] = useState(false);
  const rafRef = useRef<number | null>(null);
  const navFreezeRef = useRef(false);
  const navTimeoutRef = useRef<number | null>(null);
  const [suppressTransition, setSuppressTransition] = useState(false);
  const transTimeoutRef = useRef<number | null>(null);
  const pathname = usePathname();

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
    let lastScroll = window.scrollY || 0;

    const handleScroll = () => {
      // Throttle with requestAnimationFrame
      if (rafRef.current) return;
      // If a navigation just happened, freeze scroll-driven animations
      if (navFreezeRef.current) {
        rafRef.current = null;
        return;
      }
      rafRef.current = window.requestAnimationFrame(() => {
        const current = window.scrollY || 0;

        // At the very top — always show header and suppress transition
        if (current <= 0) {
          // suppress animation when jumping to top
          setSuppressTransition(true);
          setIsHidden(false);
          lastScroll = 0;
          // clear any existing timeout
          if (transTimeoutRef.current) {
            clearTimeout(transTimeoutRef.current);
            transTimeoutRef.current = null;
          }
          transTimeoutRef.current = window.setTimeout(() => {
            setSuppressTransition(false);
            transTimeoutRef.current = null;
          }, 60);
          rafRef.current = null;
          return;
        }

        // Scrolling down past header height -> hide
        if (current > lastScroll && current > height) {
          setIsHidden(true);
        }

        // Scrolling up -> show
        else if (current < lastScroll && lastScroll - current > 10) {
          setIsHidden(false);
        }

        lastScroll = current;
        rafRef.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (transTimeoutRef.current) {
        clearTimeout(transTimeoutRef.current);
        transTimeoutRef.current = null;
      }
    };
  }, [height]);

  // Keep header visible during client-side navigation and briefly after
  useEffect(() => {
    // Show header immediately when pathname changes
    navFreezeRef.current = true;
    setIsHidden(false);
    setSuppressTransition(true);

    // Clear any previous timeout
    if (navTimeoutRef.current) {
      clearTimeout(navTimeoutRef.current);
      navTimeoutRef.current = null;
    }

    // Unfreeze after short delay and re-enable transitions
    navTimeoutRef.current = window.setTimeout(() => {
      navFreezeRef.current = false;
      setSuppressTransition(false);
      navTimeoutRef.current = null;
    }, 400);

    return () => {
      if (navTimeoutRef.current) {
        clearTimeout(navTimeoutRef.current);
        navTimeoutRef.current = null;
      }
    };
  }, [pathname]);

  return (
    <header
      ref={headerRef}
      className={twMerge(
        "bg-white border-b border-b-grey sticky top-0 z-50",
        suppressTransition
          ? "transition-none"
          : "transition-transform duration-300",
        isHidden && "-translate-y-full"
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
              <button
                className="relative flex pr-2 cursor-pointer hover:[&>svg]:scale-110"
                onClick={() => {
                  // Check if on cart page
                  if (pathname === "/cart") return;
                  toggleCart();
                }}
              >
                <Bag2 color="#121212" size={24} variant="Outline" />

                {cartCount > 0 && (
                  <span className="absolute size-[18px] pointer-events-none right-0 -bottom-2 bg-foreground rounded-full text-background flex items-center justify-center font-medium text-[11px]">
                    {cartCount}
                  </span>
                )}
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
      {/* Cart Sidebar */}
      <CartSidebar />
    </header>
  );
}

export default Header;
