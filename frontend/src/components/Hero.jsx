import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HERO_SLIDES } from "../mock";

export default function Hero() {
  const [idx, setIdx] = useState(0);
  const slide = HERO_SLIDES[idx];

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % HERO_SLIDES.length), 7000);
    return () => clearInterval(t);
  }, []);

  const prev = () => setIdx((i) => (i - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  const next = () => setIdx((i) => (i + 1) % HERO_SLIDES.length);

  return (
    <section className="relative bg-[hsl(var(--kq-bg))]">
      <div className="max-w-[1500px] mx-auto md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 md:gap-10 md:py-12 lg:py-16 items-center">
          {/* Image — fully visible, contained, no cropping */}
          <div className="md:col-span-7 lg:col-span-7 order-1 md:order-2 relative bg-[hsl(var(--kq-bg-2))]/40">
            <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] md:aspect-[4/5] lg:aspect-[5/6] overflow-hidden">
              {HERO_SLIDES.map((s, i) => (
                <picture key={s.image}>
                  {s.imageMobile && (
                    <source media="(max-width: 767px)" srcSet={s.imageMobile} />
                  )}
                  <img
                    src={s.image}
                    alt={s.title}
                    loading={i === 0 ? "eager" : "lazy"}
                    fetchpriority={i === 0 ? "high" : "low"}
                    decoding="async"
                    style={{ objectPosition: s.pos || "center", willChange: "opacity" }}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1100ms] ${
                      i === idx ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </picture>
              ))}

              {/* Arrows + dots overlay */}
              <div className="absolute bottom-4 right-4 md:bottom-5 md:right-5 flex gap-2 z-10">
                <button onClick={prev} aria-label="Previous slide" data-testid="hero-prev" className="w-9 h-9 md:w-10 md:h-10 bg-[hsl(var(--kq-bg))]/90 hover:bg-[hsl(var(--kq-bg))] flex items-center justify-center transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button onClick={next} aria-label="Next slide" data-testid="hero-next" className="w-9 h-9 md:w-10 md:h-10 bg-[hsl(var(--kq-bg))]/90 hover:bg-[hsl(var(--kq-bg))] flex items-center justify-center transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="absolute bottom-6 left-4 md:bottom-7 md:left-5 flex gap-2 z-10">
                {HERO_SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    aria-label={`Slide ${i + 1}`}
                    data-testid={`hero-dot-${i}`}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === idx ? "bg-[hsl(var(--kq-bg))] scale-110" : "bg-[hsl(var(--kq-bg))]/55"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Content card */}
          <div className="md:col-span-5 lg:col-span-5 order-2 md:order-1 px-5 sm:px-8 md:px-0 py-10 md:py-0">
            <div key={idx} className="kq-fade-up max-w-md">
              <span className="text-[10px] sm:text-[11px] tracking-[0.32em] uppercase text-[hsl(var(--kq-accent-2))]">
                {slide.eyebrow}
              </span>
              <h1 className="font-display text-[34px] sm:text-[44px] md:text-[48px] lg:text-[60px] leading-[1.04] mt-3 sm:mt-4">
                {slide.title}
              </h1>
              <div className="mt-4 mb-5 sm:mt-5 sm:mb-6 flex items-center gap-3">
                <span className="kq-thin-rule" />
                <p className="font-italic text-base sm:text-lg md:text-xl text-[hsl(var(--kq-ink-soft))]">{slide.sub}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
