import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Mail } from "lucide-react";
import { SITE } from "../mock";

const LINKS = [
  { label: "All Clothing", to: "/shop" },
  { label: "Women", to: "/shop?cat=women" },
  { label: "Men", to: "/shop?cat=men" },
  { label: "Scarves & Bags", to: "/shop?cat=accessories" },
  { label: "Our Story", to: "/about" },
];

export default function Footer() {
  return (
    <footer className="mt-24 md:mt-32 border-t border-[hsl(var(--kq-line))] bg-[hsl(var(--kq-bg))]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-12 md:py-14">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-6">
          {/* Brand */}
          <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-7">
            <Link to="/" className="inline-flex">
              <img src="/brand/logo-600.png" alt="Kaftan Queens" className="h-12 w-auto" />
            </Link>
            <div className="flex items-center gap-2">
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 border border-[hsl(var(--kq-line))] flex items-center justify-center hover:bg-[hsl(var(--kq-accent))] hover:border-[hsl(var(--kq-accent))] transition-colors"
              >
                <Instagram className="w-4 h-4" strokeWidth={1.4} />
              </a>
              <a
                href={`mailto:${SITE.email}`}
                aria-label="Email"
                className="w-9 h-9 border border-[hsl(var(--kq-line))] flex items-center justify-center hover:bg-[hsl(var(--kq-accent))] hover:border-[hsl(var(--kq-accent))] transition-colors"
              >
                <Mail className="w-4 h-4" strokeWidth={1.4} />
              </a>
            </div>
          </div>

          {/* Inline nav links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2 md:justify-end text-[11px] tracking-[0.22em] uppercase">
            {LINKS.map((l) => (
              <Link key={l.label} to={l.to} className="kq-link">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 pt-6 border-t border-[hsl(var(--kq-line))] flex flex-col md:flex-row items-start md:items-center justify-between gap-2 text-[11px] tracking-[0.18em] uppercase text-[hsl(var(--kq-ink-soft))]">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p className="font-italic normal-case tracking-normal text-sm">Rare items, fairly made.</p>
        </div>
      </div>
    </footer>
  );
}
