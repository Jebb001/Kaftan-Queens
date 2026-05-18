import React from "react";
import { JOURNAL } from "../mock";

export default function JournalGrid() {
  return (
    <section className="mt-24 md:mt-32 max-w-[1400px] mx-auto px-5 md:px-10 kq-defer">
      <div className="text-center mb-10 md:mb-14">
        <span className="text-[11px] tracking-[0.32em] uppercase text-[hsl(var(--kq-accent-2))]">
          — Journal
        </span>
        <h2 className="font-display text-4xl md:text-5xl mt-3 leading-tight">The Slow Fashion Edit</h2>
        <div className="mt-4 flex items-center justify-center"><span className="kq-thin-rule" /></div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 md:gap-10">
        {JOURNAL.map((post) => (
          <article key={post.id} className="group">
            <a href="#" className="block">
              <div className="aspect-[4/5] kq-img-zoom">
                <img src={post.image} alt={post.title} loading="lazy" decoding="async" style={{ objectPosition: post.pos || "center" }} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-display text-2xl md:text-[26px] leading-snug mt-5">{post.title}</h3>
              <p className="text-xs tracking-[0.2em] uppercase text-[hsl(var(--kq-accent-2))] mt-2">{post.author}</p>
              <p className="font-italic text-base md:text-lg text-[hsl(var(--kq-ink-soft))] mt-3 leading-relaxed">{post.excerpt}</p>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
