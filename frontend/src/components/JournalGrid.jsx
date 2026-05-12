import React from "react";
import { JOURNAL } from "../mock";
import { ArrowRight } from "lucide-react";

export default function JournalGrid() {
  return (
    <section className="mt-24 md:mt-32 max-w-[1400px] mx-auto px-5 md:px-10">
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
              <div className="aspect-[16/10] kq-img-zoom">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-display text-2xl md:text-[26px] leading-snug mt-5">{post.title}</h3>
              <p className="text-xs tracking-[0.2em] uppercase text-[hsl(var(--kq-accent-2))] mt-2">{post.author}</p>
              <p className="font-italic text-base md:text-lg text-[hsl(var(--kq-ink-soft))] mt-3 leading-relaxed">{post.excerpt}</p>
              <span className="inline-flex items-center gap-1.5 mt-4 text-[11px] tracking-[0.28em] uppercase kq-link">
                Read more <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </a>
          </article>
        ))}
      </div>

      <div className="mt-12 text-center">
        <a href="#" className="text-[11px] tracking-[0.28em] uppercase kq-link">Read the Journal</a>
      </div>
    </section>
  );
}
