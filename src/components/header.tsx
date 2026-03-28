"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/course/beginner", label: "Beginner" },
  { href: "/course/advanced", label: "Advanced" },
  { href: "/commands", label: "Commands" },
  { href: "/roadmap", label: "Roadmap" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "glass border-b border-border/50 shadow-[0_1px_3px_0_oklch(0.13_0.02_260/0.04)]"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="4 17 10 11 4 5" />
              <line x1="12" y1="19" x2="20" y2="19" />
            </svg>
          </div>
          <span className="font-semibold text-[15px] tracking-tight">
            Claude Guide
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative px-3.5 py-2 rounded-full text-[13px] font-medium transition-all duration-200",
                isActive(item.href)
                  ? "text-primary bg-primary/[0.08]"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
              )}
            >
              {item.label}
              {item.href === "/commands" && (
                <span className="ml-1 inline-flex items-center justify-center w-[18px] h-[18px] rounded-full bg-gradient-to-r from-amber-400 to-orange-400 text-white text-[9px] font-bold leading-none">
                  N
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 -mr-2 rounded-xl hover:bg-accent/60 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav panel */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-out",
          open ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="glass border-t border-border/40 px-4 py-3 space-y-0.5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-xl text-[14px] font-medium transition-all duration-200",
                isActive(item.href)
                  ? "text-primary bg-primary/[0.08]"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
              )}
            >
              {item.label}
              {item.href === "/commands" && (
                <span className="inline-flex items-center justify-center w-[18px] h-[18px] rounded-full bg-gradient-to-r from-amber-400 to-orange-400 text-white text-[9px] font-bold leading-none">
                  N
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
