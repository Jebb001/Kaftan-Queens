import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Search, Menu, X, Instagram } from "lucide-react";
import { NAV, SITE } from "../mock";
import { useCart } from "../context/CartContext";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { count, setIsOpen } = useCart();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled
          ? "bg-[hsl(var(--kq-bg))]/90 backdrop-blur-md border-b border-[hsl(var(--kq-line))]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger aria-label="Open menu" className="p-2 -ml-2">
                <Menu className="w-5 h-5" />
              </SheetTrigger>
              <SheetContent side="left" className="bg-[hsl(var(--kq-bg))] border-r border-[hsl(var(--kq-line))]">
                <div className="mt-8 flex flex-col gap-5">
                  {NAV.map((n) => (
                    <Link key={n.label} to={n.to} className="font-display text-2xl">
                      {n.label}
                    </Link>
                  ))}
                  <a href={SITE.instagram} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm">
                    <Instagram className="w-4 h-4" /> @kaftan.queens
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop nav left */}
          <nav className="hidden md:flex items-center gap-7 text-[12px] tracking-[0.22em] uppercase">
            {NAV.slice(0, 3).map((n) => (
              <Link key={n.label} to={n.to} className="kq-link">
                {n.label}
              </Link>
            ))}
          </nav>

          {/* Logo */}
          <Link to="/" className="flex flex-col items-center group">
            <span className="font-display text-2xl md:text-3xl tracking-wide leading-none">
              Kaftan Queens
            </span>
            <span className="text-[9px] md:text-[10px] tracking-[0.5em] uppercase mt-1 text-[hsl(var(--kq-ink-soft))]">
              Est. India
            </span>
          </Link>

          {/* Desktop nav right */}
          <nav className="hidden md:flex items-center gap-7 text-[12px] tracking-[0.22em] uppercase">
            {NAV.slice(3).map((n) => (
              <Link key={n.label} to={n.to} className="kq-link">
                {n.label}
              </Link>
            ))}
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-3 md:gap-5">
            <button aria-label="Search" className="hidden md:block p-1.5 hover:opacity-60 transition">
              <Search className="w-4 h-4" />
            </button>
            <a href={SITE.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="hidden md:block p-1.5 hover:opacity-60 transition">
              <Instagram className="w-4 h-4" />
            </a>
            <button
              onClick={() => setIsOpen(true)}
              aria-label="Cart"
              className="relative p-1.5 hover:opacity-60 transition"
            >
              <ShoppingBag className="w-5 h-5" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-[hsl(var(--kq-terracotta))] text-[hsl(var(--kq-bg))] text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-medium">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
