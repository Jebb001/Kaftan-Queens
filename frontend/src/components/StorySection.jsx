import React from "react";
import { STORY_BLOCKS } from "../mock";

export default function StorySection() {
  return (
    <section className="mt-24 md:mt-36 bg-[hsl(var(--kq-bg-2))]/60 py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <div className="max-w-2xl mb-14">
          <span className="text-[11px] tracking-[0.35em] uppercase text-[hsl(var(--kq-terracotta))]">
            —— Our values
          </span>
          <h2 className="font-display text-4xl md:text-6xl mt-3 leading-[1.02]">
            Slow craft, honest materials, lasting beauty.
          </h2>
          <p className="mt-5 text-[hsl(var(--kq-ink-soft))] text-base md:text-lg">
            We pride ourselves in producing individual scarf items and our clothing is never mass produced — to ensure individuality and originality.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-10">
          {STORY_BLOCKS.map((s, i) => (
            <article key={s.title} className="group">
              <div className="relative aspect-[4/5] overflow-hidden kq-img-zoom mb-6">
                <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                <span className="absolute top-4 left-4 text-[10px] tracking-[0.3em] uppercase text-[hsl(var(--kq-bg))] bg-black/30 px-2 py-1">
                  0{i + 1}
                </span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl">{s.title}</h3>
              <p className="mt-3 text-sm md:text-base text-[hsl(var(--kq-ink-soft))]">{s.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
