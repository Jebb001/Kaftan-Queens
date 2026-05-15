import React from "react";
import { ARTISAN, STORY_BLOCKS, SHOP_COLLECTION_URL } from "../mock";
import { ChevronRight } from "lucide-react";

export default function About() {
  return (
    <main>
      <section className="max-w-[1100px] mx-auto px-5 md:px-10 pt-14 md:pt-20 text-center">
        <span className="text-[11px] tracking-[0.32em] uppercase text-[hsl(var(--kq-accent-2))]">— Our story</span>
        <h1 className="font-display text-5xl md:text-7xl leading-[1.02] mt-4">Made by hand, for the way you live.</h1>
        <div className="mt-5 flex items-center justify-center"><span className="kq-thin-rule" /></div>
        <p className="font-italic text-lg md:text-xl text-[hsl(var(--kq-ink-soft))] leading-relaxed mt-7 max-w-2xl mx-auto">
          Kaftan Queens celebrates craftsmanship, sustainability and style — connecting you to traditional Indian artistry while championing eco-conscious fashion. An alternative to mass-produced fast fashion, showcasing the beauty of handcrafted luxury.
        </p>
      </section>

      <section className="max-w-[1400px] mx-auto px-5 md:px-10 mt-14 md:mt-20">
        <div className="aspect-[16/8] kq-img-zoom">
          <img src={ARTISAN.image} alt="Artisans at work" className="w-full h-full object-cover" />
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-5 md:px-10 mt-20 md:mt-28 grid md:grid-cols-2 gap-10 md:gap-20">
        <div>
          <h2 className="font-display text-3xl md:text-5xl leading-[1.05]">We pride ourselves on individuality.</h2>
          <div className="mt-4"><span className="kq-thin-rule" /></div>
        </div>
        <div className="font-italic text-lg text-[hsl(var(--kq-ink-soft))] space-y-4 leading-relaxed">
          <p>Every scarf is woven on its own loom. Every kaftan is hand block-printed. Nothing is mass-produced, ensuring originality in every piece you wear.</p>
          <p>We work directly with artisan families across Northern India — supporting heritage craft and ensuring fair, dignified livelihoods.</p>
          <p>The result is clothing with a soul. Pieces that age beautifully and tell a story of the hands that made them.</p>
        </div>
      </section>

      <section className="mt-24 md:mt-32 bg-[hsl(var(--kq-bg-2))] py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="text-center mb-12">
            <span className="text-[11px] tracking-[0.32em] uppercase text-[hsl(var(--kq-accent-2))]">— Our values</span>
            <h2 className="font-display text-4xl md:text-5xl mt-3">Slow, honest, lasting</h2>
            <div className="mt-4 flex items-center justify-center"><span className="kq-thin-rule" /></div>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {STORY_BLOCKS.map((s, i) => (
              <article key={s.title} className="text-center">
                <div className="aspect-[4/5] kq-img-zoom mb-5">
                  <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                </div>
                <span className="font-italic text-sm text-[hsl(var(--kq-accent-2))]">0{i + 1}</span>
                <h3 className="font-display text-2xl md:text-3xl mt-2">{s.title}</h3>
                <p className="font-italic text-base md:text-lg text-[hsl(var(--kq-ink-soft))] mt-3 leading-relaxed max-w-sm mx-auto">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1100px] mx-auto px-5 md:px-10 mt-24 md:mt-32 text-center pb-8">
        <h2 className="font-display text-4xl md:text-6xl leading-[1.04] max-w-3xl mx-auto">Wear a story — not a logo.</h2>
        <a
          href={SHOP_COLLECTION_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-8 bg-[hsl(var(--kq-ink))] text-[hsl(var(--kq-bg))] px-8 py-4 text-[11px] tracking-[0.28em] uppercase hover:bg-[hsl(var(--kq-accent-2))] transition-colors"
        >
          Explore the Collection <ChevronRight className="w-3.5 h-3.5" />
        </a>
      </section>
    </main>
  );
}
