import React from "react";
import { Link } from "react-router-dom";
import { ARTISAN } from "../mock";
import { ChevronRight } from "lucide-react";

export default function ArtisanStory() {
  return (
    <section className="mt-24 md:mt-32 max-w-[1400px] mx-auto px-5 md:px-10 kq-defer">
      <div className="grid md:grid-cols-12 gap-8 md:gap-14 items-center">
        <div className="md:col-span-5 relative">
          <div className="aspect-[4/5] kq-img-zoom">
            <img src={ARTISAN.image} alt="Artisans at work" loading="lazy" decoding="async" className="w-full h-full object-cover" />
          </div>
          {/* Decorative oval */}
          <div
            className="hidden md:block absolute -z-10 -bottom-6 -right-6 w-2/3 h-3/4 rounded-full"
            style={{ background: "hsl(var(--kq-bg-2))" }}
          />
        </div>
        <div className="md:col-span-7 md:pl-8">
          <span className="text-[11px] tracking-[0.32em] uppercase text-[hsl(var(--kq-accent-2))]">
            — Our makers
          </span>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.04] mt-4 max-w-xl">
            {ARTISAN.title}
          </h2>
          <div className="mt-5 mb-6 flex items-center gap-3">
            <span className="kq-thin-rule" />
          </div>
          <p className="font-italic text-lg md:text-xl text-[hsl(var(--kq-ink-soft))] leading-relaxed max-w-xl">
            {ARTISAN.body}
          </p>
          <Link
            to={ARTISAN.cta.to}
            className="inline-flex items-center gap-2 mt-8 border border-[hsl(var(--kq-ink))] px-7 py-3.5 text-[11px] tracking-[0.28em] uppercase hover:bg-[hsl(var(--kq-ink))] hover:text-[hsl(var(--kq-bg))] transition-colors"
          >
            {ARTISAN.cta.label} <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
