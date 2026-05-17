import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Search, Menu, Instagram, ChevronDown } from "lucide-react";
import { NAV, SITE } from "../mock";
import { useCart } from "../context/CartContext";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export default function Navbar() {
  const { count, setIsOpen } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-[hsl(var(--kq-bg))] border-b border-[hsl(var(--kq-line))]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-10">
        <div className="flex items-center justify-between py-4 md:py-6 gap-2">
          {/* Left nav */}
          <nav className="hidden md:flex items-center gap-7 text-[11px] tracking-[0.22em] uppercase flex-1">
            {NAV.slice(0, 3).map((n) => (
              <Link key={n.label} to={n.to} className="kq-link">
                {n.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger aria-label="Open menu" className="p-2 -ml-2">
                <Menu className="w-5 h-5" />
              </SheetTrigger>
              <SheetContent side="left" className="bg-[hsl(var(--kq-bg))] border-r border-[hsl(var(--kq-line))]">
                <div className="mt-10 flex flex-col gap-5">
                  {NAV.map((n) => (
                    <Link key={n.label} to={n.to} className="font-display text-3xl">
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

          {/* Centered Logo */}
          <Link to="/" className="flex flex-col items-center select-none px-1 sm:px-4 min-w-0">
            <span className="font-display text-[22px] sm:text-[26px] md:text-[34px] leading-none text-[hsl(var(--kq-accent-2))] tracking-[0.04em] whitespace-nowrap">
              Kaftan Queens
            </span>
            <span className="text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.4em] sm:tracking-[0.5em] uppercase mt-1 md:mt-1.5 text-[hsl(var(--kq-ink-soft))]">
              Rare · Handmade
            </span>
          </Link>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-7 text-[11px] tracking-[0.22em] uppercase flex-1 justify-end">
            {NAV.slice(3).map((n) => (
              <Link key={n.label} to={n.to} className="kq-link">
                {n.label}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4 md:gap-5 md:ml-6">
            <button aria-label="Search" className="hidden md:flex items-center text-[11px] tracking-[0.22em] uppercase hover:text-[hsl(var(--kq-accent-2))] transition-colors">
              <span className="mr-1">GBP £</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            <button aria-label="Search" className="p-1.5 hover:text-[hsl(var(--kq-accent-2))] transition-colors">
              <Search className="w-[18px] h-[18px]" strokeWidth={1.4} />
            </button>
            <button
              onClick={() => setIsOpen(true)}
              aria-label="Cart"
              className="relative inline-flex items-center gap-2 hover:text-[hsl(var(--kq-accent-2))] transition-colors"
            >
              <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={1.4} />
              <span className="hidden md:inline text-[11px] tracking-[0.22em] uppercase">Cart ({count})</span>
              {count > 0 && (
                <span className="md:hidden absolute -top-1.5 -right-1.5 bg-[hsl(var(--kq-accent-2))] text-[hsl(var(--kq-bg))] text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
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
