import React from "react";
import { Link } from "react-router-dom";
import { HERO_IMAGES } from "../mock";
import { ArrowRight } from "lucide-react";

export default function EditorialSplit() {
  return (
    <section className="mt-24 md:mt-32 max-w-[1400px] mx-auto px-5 md:px-10">
      <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-stretch">
        <div className="relative aspect-[4/5] md:aspect-auto overflow-hidden kq-img-zoom">
          <img
            src={HERO_IMAGES.secondary}
            alt="Artisanal craft"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center md:px-6 py-8 md:py-0">
          <span className="text-[11px] tracking-[0.35em] uppercase text-[hsl(var(--kq-terracotta))]">
            —— Welcome
          </span>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.02] mt-4">
            A luxury brand built on heritage craft.
          </h2>
          <p className="mt-6 text-[hsl(var(--kq-ink-soft))] text-base md:text-lg max-w-lg">
            Kaftan Queens features handcrafted wool scarves, woven bags, men’s shirts and kaftans made by local artisans in Northern India — blending traditional techniques with a contemporary bohemian chic style.
          </p>
          <div className="mt-8">
            <Link
              to="/about"
              className="group inline-flex items-center gap-3 border border-[hsl(var(--kq-ink))] px-7 py-4 text-[11px] tracking-[0.3em] uppercase hover:bg-[hsl(var(--kq-ink))] hover:text-[hsl(var(--kq-bg))] transition-colors"
            >
              Read Our Story <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
            <Metric n="100%" l="Handcrafted" />
            <Metric n="7" l="Artisan villages" />
            <Metric n="Zero" l="Mass production" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({ n, l }) {
  return (
    <div className="border-t border-[hsl(var(--kq-line))] pt-3">
      <p className="font-display text-3xl leading-none">{n}</p>
      <p className="text-[10px] tracking-[0.3em] uppercase mt-2 text-[hsl(var(--kq-ink-soft))]">{l}</p>
    </div>
  );
}
