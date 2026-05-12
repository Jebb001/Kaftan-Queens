import React from "react";
import { Instagram } from "lucide-react";
import { INSTAGRAM_FEED, SITE } from "../mock";

export default function InstagramFeed() {
  return (
    <section className="mt-24 md:mt-32 max-w-[1400px] mx-auto px-5 md:px-10">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-10">
        <div>
          <span className="text-[11px] tracking-[0.35em] uppercase text-[hsl(var(--kq-terracotta))]">
            —— Wear it your way
          </span>
          <h2 className="font-display text-4xl md:text-5xl mt-3 leading-none">As seen on Instagram</h2>
        </div>
        <a
          href={SITE.instagram}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase kq-link"
        >
          <Instagram className="w-4 h-4" /> @kaftan.queens
        </a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-1 md:gap-2">
        {INSTAGRAM_FEED.map((src, i) => (
          <a
            key={i}
            href={SITE.instagram}
            target="_blank"
            rel="noreferrer"
            className="relative aspect-square overflow-hidden group block"
          >
            <img src={src} alt="Instagram post" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-[hsl(var(--kq-ink))]/0 group-hover:bg-[hsl(var(--kq-ink))]/35 transition-colors flex items-center justify-center">
              <Instagram className="w-5 h-5 text-[hsl(var(--kq-bg))] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
