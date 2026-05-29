import React from "react";
import Hero from "../components/Hero";
import ArtisanStory from "../components/ArtisanStory";
import JournalGrid from "../components/JournalGrid";
import { TESTIMONIALS, STORY_BLOCKS, SITE } from "../mock";
import { Leaf, Hand, Sparkles, Truck } from "lucide-react";

export default function Home() {
  return (
    <main>
      <Hero />

      {/* Brand statement */}
      <section className="max-w-3xl mx-auto px-5 md:px-10 mt-16 md:mt-24 text-center">
        <p className="font-italic text-lg md:text-2xl leading-relaxed text-[hsl(var(--kq-ink-soft))]">
          {SITE.tagline}
        </p>
        <div className="mt-6 flex items-center justify-center"><span className="kq-thin-rule" /></div>
      </section>

      {/* Value strip */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-10 mt-14 md:mt-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 border-y border-[hsl(var(--kq-line))] py-8">
          {[
            [Hand, "Handmade", "By artisans in Northern India"],
            [Leaf, "Natural Fibres", "Cotton, linen, silk & wool"],
            [Sparkles, "Small Batches", "Never mass produced"],
            [Truck, "Free UK Shipping", "On orders over £150"],
          ].map(([Icon, t, s], i) => (
            <div key={i} className="flex items-start gap-3 px-2">
              <Icon className="w-5 h-5 mt-0.5 text-[hsl(var(--kq-accent-2))]" strokeWidth={1.4} />
              <div>
                <p className="text-[11px] tracking-[0.22em] uppercase">{t}</p>
                <p className="font-italic text-sm text-[hsl(var(--kq-ink-soft))] mt-0.5">{s}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ArtisanStory />

      {/* Three-pillar values band */}
      <section className="mt-24 md:mt-32 bg-[hsl(var(--kq-bg-2))] kq-defer">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-20 md:py-28">
          <div className="text-center mb-12">
            <span className="text-[11px] tracking-[0.32em] uppercase text-[hsl(var(--kq-accent-2))]">— Our values</span>
            <h2 className="font-display text-4xl md:text-5xl mt-3">Slow craft, lasting beauty</h2>
            <div className="mt-4 flex items-center justify-center"><span className="kq-thin-rule" /></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {STORY_BLOCKS.map((s) => (
              <article key={s.title} className="text-center">
                <div className="relative aspect-[4/5] kq-img-zoom mb-6">
                  <img src={s.image} alt={s.title} loading="lazy" decoding="async" style={{ objectPosition: s.pos || "center" }} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-display text-2xl md:text-3xl mt-2">{s.title}</h3>
                <p className="font-italic text-base md:text-lg text-[hsl(var(--kq-ink-soft))] mt-3 leading-relaxed max-w-sm mx-auto">
                  {s.body}
                </p>
                {s.contact && (
                  <div className="mt-6 pt-5 border-t border-[hsl(var(--kq-line))] max-w-xs mx-auto text-[12px] tracking-[0.04em] text-[hsl(var(--kq-ink))] space-y-1.5" data-testid="founder-contact">
                    <p className="font-italic text-[hsl(var(--kq-accent-2))] text-[11px] tracking-[0.28em] uppercase">— {s.contact.role}</p>
                    <p className="font-display text-lg">{s.contact.name}</p>
                    <p><a href={`mailto:${s.contact.email}`} className="kq-link">{s.contact.email}</a></p>
                    <p><a href={`tel:${s.contact.phone.replace(/\s+/g, '')}`} className="kq-link tabular-nums">{s.contact.phone}</a></p>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mt-24 md:mt-32 max-w-[1100px] mx-auto px-5 md:px-10 text-center kq-defer">
        <span className="text-[11px] tracking-[0.32em] uppercase text-[hsl(var(--kq-accent-2))]">— Loved by</span>
        <h2 className="font-display text-3xl md:text-4xl mt-3">In their words</h2>
        <div className="mt-4 flex items-center justify-center mb-12"><span className="kq-thin-rule" /></div>
        <div className="grid md:grid-cols-3 gap-10">
          {TESTIMONIALS.map((t, i) => (
            <figure key={i}>
              <blockquote className="font-italic text-lg md:text-xl leading-relaxed text-[hsl(var(--kq-ink))]">
                {`\u201C${t.quote}\u201D`}
              </blockquote>
              <figcaption className="text-[11px] tracking-[0.28em] uppercase text-[hsl(var(--kq-ink-soft))] mt-5">
                — {t.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <JournalGrid />
    </main>
  );
}
