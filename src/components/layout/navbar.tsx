"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import AuthInfo from "./AuthInfo";
import { Button } from "../ui/button";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Add Destination", href: "/add-destination" },
  { label: "My Bookings", href: "/bookings" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="">
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <nav className="relative mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <Image
              src="/images/Wanderlast.png"
              alt="Wanderlast"
              width={120}
              height={28}
              priority
            />
          </Link>

          <ul className="hidden items-center gap-3.5 text-xs font-medium md:flex lg:gap-7 lg:text-sm">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={
                    pathname === link.href
                      ? "text-[#0f9b96] underline decoration-2 underline-offset-8"
                      : "text-foreground/90 transition-colors hover:text-[#0f9b96]"
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="hidden items-center gap-3.5 text-xs font-medium md:flex lg:gap-7 lg:text-sm">
            <AuthInfo></AuthInfo>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-expanded={open}
            aria-label="Toggle navigation menu"
            onClick={() => setOpen(!open)}
            className="ml-auto text-gray-800 transition-colors hover:bg-gray-100 hover:text-[#0f9b96] md:hidden"
          >
            {open ? <X className="size-6 text-[#0f9b96]" /> : <Menu className="size-6" />}
          </Button>
        </nav>

        {open && (
          <div className="mx-auto max-w-7xl border-t border-border bg-white px-4 py-3 md:hidden">
            <ul className="flex flex-col text-sm font-medium">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={
                      pathname === link.href
                        ? "block rounded-lg bg-muted px-3 py-2.5 text-[#0f9b96]"
                        : "block rounded-lg px-3 py-2.5 text-foreground/90 transition-colors hover:bg-muted hover:text-[#0f9b96]"
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="my-2 h-px bg-border" />
            <ul className="flex flex-col text-sm font-medium">
              <AuthInfo></AuthInfo>
            </ul>
          </div>
        )}
      </header>
    </div>
  );
}
