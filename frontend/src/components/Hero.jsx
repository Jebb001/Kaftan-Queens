import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HERO_SLIDES } from "../mock";

export default function Hero() {
  const [idx, setIdx] = useState(0);
  const slide = HERO_SLIDES[idx];

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % HERO_SLIDES.length), 6500);
    return () => clearInterval(t);
  }, []);

  const prev = () => setIdx((i) => (i - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  const next = () => setIdx((i) => (i + 1) % HERO_SLIDES.length);

  return (
    <section className="relative overflow-hidden">
      <div className="relative aspect-[4/5] sm:aspect-[16/10] md:aspect-[16/9] max-h-[860px] w-full">
        {HERO_SLIDES.map((s, i) => (
          <img
            key={s.image}
            src={s.image}
            alt={s.title}
            style={{ objectPosition: s.pos || "center" }}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] ${
              i === idx ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Decorative left arc */}
        <div
          className="hidden md:block absolute -left-40 top-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 30% 50%, hsl(var(--kq-bg-2)) 0%, hsl(var(--kq-bg-2)/0.6) 55%, transparent 70%)",
          }}
        />

        {/* Offset content card */}
        <div className="absolute inset-0 flex items-center">
          <div className="w-full max-w-[1400px] mx-auto px-5 md:px-10">
            <div className="max-w-md bg-[hsl(var(--kq-bg))]/95 md:bg-[hsl(var(--kq-bg))] backdrop-blur-sm md:backdrop-blur-none border border-[hsl(var(--kq-line))] p-7 md:p-10 kq-fade-up" key={idx}>
              <span className="text-[10px] tracking-[0.32em] uppercase text-[hsl(var(--kq-accent-2))]">
                {slide.eyebrow}
              </span>
              <h1 className="font-display text-[40px] md:text-[54px] leading-[1.05] mt-4">
                {slide.title}
              </h1>
              <div className="mt-4 mb-6 flex items-center gap-3">
                <span className="kq-thin-rule" />
                <p className="font-italic text-lg md:text-xl text-[hsl(var(--kq-ink-soft))]">{slide.sub}</p>
              </div>
              <Link
                to={slide.cta.to}
                className="inline-flex items-center gap-2 bg-[hsl(var(--kq-ink))] text-[hsl(var(--kq-bg))] px-7 py-3.5 text-[11px] tracking-[0.28em] uppercase hover:bg-[hsl(var(--kq-accent-2))] transition-colors"
              >
                {slide.cta.label}
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Arrows */}
        <div className="absolute bottom-5 right-5 md:bottom-8 md:right-8 flex gap-2">
          <button onClick={prev} aria-label="Previous" className="w-10 h-10 bg-[hsl(var(--kq-bg))]/85 hover:bg-[hsl(var(--kq-bg))] flex items-center justify-center transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={next} aria-label="Next" className="w-10 h-10 bg-[hsl(var(--kq-bg))]/85 hover:bg-[hsl(var(--kq-bg))] flex items-center justify-center transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Dots */}
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex gap-2">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Slide ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-all ${
                i === idx ? "bg-[hsl(var(--kq-bg))] scale-110" : "bg-[hsl(var(--kq-bg))]/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
