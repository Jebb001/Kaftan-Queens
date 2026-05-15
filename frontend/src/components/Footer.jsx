import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Mail, Facebook } from "lucide-react";
import { SITE } from "../mock";

export default function Footer() {
  return (
    <footer className="mt-0 border-t border-[hsl(var(--kq-line))] bg-[hsl(var(--kq-bg))]">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-16 grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2 md:col-span-2">
          <Link to="/" className="font-display text-3xl text-[hsl(var(--kq-accent-2))]">Kaftan Queens</Link>
          <p className="text-xs tracking-[0.3em] uppercase mt-2 text-[hsl(var(--kq-ink-soft))]">Rare · Handmade</p>
          <p className="font-italic text-base md:text-lg text-[hsl(var(--kq-ink-soft))] mt-5 max-w-sm leading-relaxed">
            Handloomed, naturally dyed pieces supporting artisan communities across Northern India.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a href={SITE.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="w-9 h-9 border border-[hsl(var(--kq-line))] flex items-center justify-center hover:bg-[hsl(var(--kq-accent))] hover:border-[hsl(var(--kq-accent))] transition-colors">
              <Instagram className="w-4 h-4" strokeWidth={1.4} />
            </a>
            <a href="#" aria-label="Facebook" className="w-9 h-9 border border-[hsl(var(--kq-line))] flex items-center justify-center hover:bg-[hsl(var(--kq-accent))] hover:border-[hsl(var(--kq-accent))] transition-colors">
              <Facebook className="w-4 h-4" strokeWidth={1.4} />
            </a>
            <a href={`mailto:${SITE.email}`} aria-label="Email" className="w-9 h-9 border border-[hsl(var(--kq-line))] flex items-center justify-center hover:bg-[hsl(var(--kq-accent))] hover:border-[hsl(var(--kq-accent))] transition-colors">
              <Mail className="w-4 h-4" strokeWidth={1.4} />
            </a>
          </div>
        </div>

        <div>
          <h5 className="text-[11px] tracking-[0.3em] uppercase mb-4 text-[hsl(var(--kq-accent-2))]">Shop</h5>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/shop" className="kq-link">All Clothing</Link></li>
            <li><Link to="/shop?cat=women" className="kq-link">Women</Link></li>
            <li><Link to="/shop?cat=men" className="kq-link">Men</Link></li>
            <li><Link to="/shop?cat=accessories" className="kq-link">Scarves & Bags</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="text-[11px] tracking-[0.3em] uppercase mb-4 text-[hsl(var(--kq-accent-2))]">House</h5>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/about" className="kq-link">Our Story</Link></li>
            <li><a className="kq-link" href="#">Meet the Makers</a></li>
            <li><a className="kq-link" href="#">Journal</a></li>
            <li><a className="kq-link" href="#">Contact</a></li>
          </ul>
        </div>
        <div>
          <h5 className="text-[11px] tracking-[0.3em] uppercase mb-4 text-[hsl(var(--kq-accent-2))]">Help</h5>
          <ul className="space-y-2.5 text-sm">
            <li><a className="kq-link" href="#">Shipping</a></li>
            <li><a className="kq-link" href="#">Returns</a></li>
            <li><a className="kq-link" href="#">Size Guide</a></li>
            <li><a className="kq-link" href="#">Care</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[hsl(var(--kq-line))]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] tracking-[0.18em] uppercase text-[hsl(var(--kq-ink-soft))]">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p className="font-italic normal-case tracking-normal text-sm">Rare items, fairly made.</p>
        </div>
      </div>
    </footer>
  );
}
