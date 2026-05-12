import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Mail } from "lucide-react";
import { SITE } from "../mock";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-[hsl(var(--kq-line))] bg-[hsl(var(--kq-bg-2))]/60">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2">
          <h3 className="font-display text-3xl md:text-4xl leading-tight max-w-md">
            Slow fashion, woven by hand in Northern India.
          </h3>
          <p className="mt-4 text-sm text-[hsl(var(--kq-ink-soft))] max-w-md">
            Join our circle for first looks at new pieces, the stories of the artisans we work with, and 10% off your first order.
          </p>
          <form
            className="mt-5 flex items-center max-w-md border-b border-[hsl(var(--kq-ink))]/30 focus-within:border-[hsl(var(--kq-ink))]"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 bg-transparent py-3 outline-none placeholder:text-[hsl(var(--kq-ink-soft))]"
            />
            <button className="text-xs tracking-[0.2em] uppercase py-3 px-2">Subscribe</button>
          </form>
        </div>

        <div>
          <h5 className="text-xs tracking-[0.25em] uppercase mb-4">Shop</h5>
          <ul className="space-y-2 text-sm">
            <li><Link to="/shop" className="kq-link">All</Link></li>
            <li><Link to="/shop?cat=women" className="kq-link">Women</Link></li>
            <li><Link to="/shop?cat=men" className="kq-link">Men</Link></li>
            <li><Link to="/shop?cat=accessories" className="kq-link">Bags & Scarves</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="text-xs tracking-[0.25em] uppercase mb-4">House</h5>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="kq-link">Our Story</Link></li>
            <li><a className="kq-link" href="#">Shipping & Returns</a></li>
            <li><a className="kq-link" href="#">Care Guide</a></li>
            <li><a className="kq-link" href="#">Contact</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[hsl(var(--kq-line))]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[hsl(var(--kq-ink-soft))]">
          <p>© {new Date().getFullYear()} {SITE.name}. Crafted with care.</p>
          <div className="flex items-center gap-4">
            <a href={SITE.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 kq-link">
              <Instagram className="w-3.5 h-3.5" /> @kaftan.queens
            </a>
            <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-1.5 kq-link">
              <Mail className="w-3.5 h-3.5" /> {SITE.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
