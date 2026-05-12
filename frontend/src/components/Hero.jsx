import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { HERO_IMAGES } from "../mock";

export default function Hero() {
  return (
    <section className="relative">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 pt-6 md:pt-10">
        <div className="grid md:grid-cols-12 gap-6 md:gap-10 items-end">
          {/* Copy block */}
          <div className="md:col-span-5 md:pb-10 kq-fade-up">
            <span className="text-[11px] tracking-[0.35em] uppercase text-[hsl(var(--kq-ink-soft))]">
              —— Handcrafted in India
            </span>
            <h1 className="font-display text-[44px] leading-[1.02] md:text-[78px] md:leading-[0.95] mt-5">
              Bohemian luxury, woven by hand.
            </h1>
            <p className="mt-6 text-base md:text-lg text-[hsl(var(--kq-ink-soft))] max-w-md">
              Small-batch kaftans, scarves and shirts — made in Northern India using heritage techniques and natural fibres. Never mass produced. Always one of a kind.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/shop"
                className="group inline-flex items-center gap-3 bg-[hsl(var(--kq-ink))] text-[hsl(var(--kq-bg))] px-7 py-4 text-[11px] tracking-[0.3em] uppercase hover:bg-[hsl(var(--kq-terracotta))] transition-colors"
              >
                Shop the Collection
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/about" className="text-[11px] tracking-[0.3em] uppercase kq-link">
                Our Story
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-4 max-w-md">
              {[
                ["Hand", "made"],
                ["Small", "batch"],
                ["Slow", "fashion"],
              ].map((p, i) => (
                <div key={i} className="border-t border-[hsl(var(--kq-line))] pt-3">
                  <p className="font-display text-2xl leading-none">{p[0]}</p>
                  <p className="text-[10px] tracking-[0.3em] uppercase mt-1 text-[hsl(var(--kq-ink-soft))]">{p[1]}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image block */}
          <div className="md:col-span-7 relative">
            <div className="relative aspect-[4/5] md:aspect-[5/6] overflow-hidden kq-img-zoom kq-grain">
              <img
                src={HERO_IMAGES.primary}
                alt="Kaftan Queens editorial"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 flex items-end justify-between text-[hsl(var(--kq-bg))]">
                <span className="text-[10px] tracking-[0.35em] uppercase backdrop-blur-sm bg-black/15 px-3 py-1.5">
                  AW ’25 · The Palm Edit
                </span>
              </div>
            </div>

            {/* Floating card */}
            <div className="hidden md:flex absolute -left-8 bottom-10 w-[260px] bg-[hsl(var(--kq-bg))] border border-[hsl(var(--kq-line))] p-5 flex-col gap-2 shadow-[0_30px_60px_-30px_rgba(40,30,20,0.35)]">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[hsl(var(--kq-terracotta))]">Featured</span>
              <p className="font-display text-xl leading-snug">The Palm Kaftan</p>
              <p className="text-xs text-[hsl(var(--kq-ink-soft))]">Block-printed by hand on breathable cotton.</p>
              <Link to="/products/palm-kaftan" className="text-[11px] tracking-[0.3em] uppercase kq-link mt-1">Discover →</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
