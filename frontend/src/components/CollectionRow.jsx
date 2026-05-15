import React from "react";
import ProductCard from "./ProductCard";

export default function CollectionRow({ title, kicker, products, ctaTo = "#", ctaLabel = "View All", external = false }) {
  const CtaTag = external ? "a" : "a";
  const ctaProps = external
    ? { href: ctaTo, target: "_blank", rel: "noopener noreferrer" }
    : { href: ctaTo };

  return (
    <section className="max-w-[1400px] mx-auto px-5 md:px-10 mt-20 md:mt-28">
      <div className="text-center mb-10 md:mb-14">
        {kicker && (
          <span className="text-[11px] tracking-[0.32em] uppercase text-[hsl(var(--kq-accent-2))]">
            {kicker}
          </span>
        )}
        <h2 className="font-display text-4xl md:text-5xl mt-3 leading-tight">{title}</h2>
        <div className="mt-4 flex items-center justify-center">
          <span className="kq-thin-rule" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-12 md:gap-x-7 md:gap-y-16">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <CtaTag
          {...ctaProps}
          className="inline-block text-[11px] tracking-[0.28em] uppercase kq-link"
        >
          {ctaLabel}
        </CtaTag>
      </div>
    </section>
  );
}
