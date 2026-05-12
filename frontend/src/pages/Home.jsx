import React from "react";
import Hero from "../components/Hero";
import EditorialSplit from "../components/EditorialSplit";
import CollectionGrid from "../components/CollectionGrid";
import StorySection from "../components/StorySection";
import InstagramFeed from "../components/InstagramFeed";
import { PRODUCTS, TESTIMONIALS, HERO_IMAGES } from "../mock";
import { Link } from "react-router-dom";
import { Quote, Truck, Leaf, Hand, Sparkles } from "lucide-react";

export default function Home() {
  const women = PRODUCTS.filter((p) => p.category === "women");
  const men = PRODUCTS.filter((p) => p.category === "men");

  return (
    <main>
      <Hero />

      {/* Value strip */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-10 mt-20 md:mt-28">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 border-y border-[hsl(var(--kq-line))] py-8">
          {[
            [Hand, "Hand made", "By artisans in N. India"],
            [Leaf, "Natural fibres", "Cotton, linen & wool"],
            [Sparkles, "One of a kind", "Small-batch pieces"],
            [Truck, "Free UK shipping", "On orders over £150"],
          ].map(([Icon, t, s], i) => (
            <div key={i} className="flex items-start gap-3">
              <Icon className="w-5 h-5 mt-0.5 text-[hsl(var(--kq-terracotta))]" strokeWidth={1.5} />
              <div>
                <p className="text-xs tracking-[0.2em] uppercase">{t}</p>
                <p className="text-xs text-[hsl(var(--kq-ink-soft))] mt-1">{s}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <EditorialSplit />

      <CollectionGrid
        kicker="—— Women’s collection"
        title="For the slow days"
        products={women}
        ctaTo="/shop?cat=women"
        ctaLabel="Shop Women"
      />

      <StorySection />

      <CollectionGrid
        kicker="—— Men’s collection"
        title="Linen, light & lived-in"
        products={men}
        ctaTo="/shop?cat=men"
        ctaLabel="Shop Men"
      />

      {/* Testimonials */}
      <section className="mt-24 md:mt-36 max-w-[1400px] mx-auto px-5 md:px-10">
        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <figure key={i} className="border-t border-[hsl(var(--kq-line))] pt-6">
              <Quote className="w-5 h-5 text-[hsl(var(--kq-terracotta))]" />
              <blockquote className="font-display text-xl md:text-2xl leading-snug mt-4">
                “{t.quote}”
              </blockquote>
              <figcaption className="text-[11px] tracking-[0.3em] uppercase text-[hsl(var(--kq-ink-soft))] mt-5">
                — {t.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <InstagramFeed />

      {/* Full bleed CTA */}
      <section className="mt-24 md:mt-32 relative">
        <div className="relative aspect-[16/8] md:aspect-[16/6] overflow-hidden">
          <img
            src={HERO_IMAGES.editorial}
            alt="Kaftan Queens editorial"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-[1400px] mx-auto w-full px-5 md:px-10 pb-10 md:pb-16 text-[hsl(var(--kq-bg))]">
              <h2 className="font-display text-4xl md:text-7xl leading-[0.95] max-w-3xl">
                Find your forever kaftan.
              </h2>
              <Link
                to="/shop"
                className="inline-block mt-6 bg-[hsl(var(--kq-bg))] text-[hsl(var(--kq-ink))] px-7 py-4 text-[11px] tracking-[0.3em] uppercase hover:bg-[hsl(var(--kq-terracotta))] hover:text-[hsl(var(--kq-bg))] transition-colors"
              >
                Browse The Collection
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
