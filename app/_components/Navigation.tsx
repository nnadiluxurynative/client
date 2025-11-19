"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { links } from "../_utils/constants";

function Navigation() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;
  return (
    <nav className="hidden md:block mt-6">
      <ul className="flex flex-wrap text-sm justify-center uppercase gap-y-3 font-medium">
        {links.map((item, i) => (
          <li key={i}>
            <Link
              className={twMerge(
                "px-4 py-2 hover:underline",
                isActive(item.href) && "underline"
              )}
              href={item.href}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
