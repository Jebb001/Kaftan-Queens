import React from "react";
import { Link } from "react-router-dom";
import { HERO_IMAGES, STORY_BLOCKS } from "../mock";
import { ArrowRight } from "lucide-react";

export default function About() {
  return (
    <main>
      {/* Header */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-10 pt-12 md:pt-20">
        <div className="grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-7">
            <span className="text-[11px] tracking-[0.35em] uppercase text-[hsl(var(--kq-terracotta))]">
              —— Our story
            </span>
            <h1 className="font-display text-5xl md:text-7xl leading-[0.95] mt-4">
              Made by hand, for the way you live.
            </h1>
          </div>
          <div className="md:col-span-5">
            <p className="text-[hsl(var(--kq-ink-soft))] text-base md:text-lg leading-relaxed">
              Kaftan Queens aims to offer products that celebrate craftsmanship, sustainability, and style. The brand connects consumers to traditional Indian artistry while promoting eco-conscious fashion — an alternative to mass-produced, fast fashion by showcasing the beauty of handcrafted luxury.
            </p>
          </div>
        </div>

        <div className="mt-10 md:mt-14 relative aspect-[16/9] overflow-hidden kq-img-zoom kq-grain">
          <img src={HERO_IMAGES.secondary} alt="Artisan" className="w-full h-full object-cover" />
        </div>
      </section>

      {/* Two col */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-10 mt-20 md:mt-28 grid md:grid-cols-2 gap-10 md:gap-20">
        <div>
          <h2 className="font-display text-3xl md:text-5xl leading-[1.05]">
            We pride ourselves on individuality.
          </h2>
        </div>
        <div className="text-[hsl(var(--kq-ink-soft))] space-y-4 leading-relaxed">
          <p>
            Every scarf is woven on its own loom. Every kaftan is hand block-printed. Nothing is mass-produced, ensuring originality in every piece you wear.
          </p>
          <p>
            We work directly with artisan families across Northern India — supporting the heritage of their craft and ensuring fair, dignified livelihoods.
          </p>
          <p>
            The result: clothing with a soul. Pieces that age beautifully and tell a story of the hands that made them.
          </p>
        </div>
      </section>

      {/* Pillars */}
      <section className="mt-24 md:mt-32 bg-[hsl(var(--kq-bg-2))]/60 py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="grid md:grid-cols-3 gap-10">
            {STORY_BLOCKS.map((s, i) => (
              <article key={s.title}>
                <div className="relative aspect-[4/5] overflow-hidden kq-img-zoom mb-5">
                  <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                </div>
                <span className="text-[10px] tracking-[0.3em] uppercase text-[hsl(var(--kq-terracotta))]">0{i + 1}</span>
                <h3 className="font-display text-2xl md:text-3xl mt-2">{s.title}</h3>
                <p className="mt-3 text-sm text-[hsl(var(--kq-ink-soft))]">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-10 mt-24 md:mt-32 text-center">
        <h2 className="font-display text-4xl md:text-6xl leading-[1.02] max-w-3xl mx-auto">
          Wear a story — not a logo.
        </h2>
        <Link
          to="/shop"
          className="group inline-flex items-center gap-3 mt-8 bg-[hsl(var(--kq-ink))] text-[hsl(var(--kq-bg))] px-8 py-4 text-[11px] tracking-[0.3em] uppercase hover:bg-[hsl(var(--kq-terracotta))] transition-colors"
        >
          Explore the Collection <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </section>
    </main>
  );
}
