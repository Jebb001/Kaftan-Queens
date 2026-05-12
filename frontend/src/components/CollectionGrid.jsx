import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

export default function CollectionGrid({ title, kicker, products, ctaTo = "/shop", ctaLabel = "Shop All" }) {
  return (
    <section className="max-w-[1400px] mx-auto px-5 md:px-10 mt-24 md:mt-32">
      <div className="flex items-end justify-between gap-6 mb-8 md:mb-12">
        <div>
          {kicker && (
            <span className="text-[11px] tracking-[0.35em] uppercase text-[hsl(var(--kq-terracotta))]">
              {kicker}
            </span>
          )}
          <h2 className="font-display text-4xl md:text-6xl mt-3 leading-none">{title}</h2>
        </div>
        <Link to={ctaTo} className="hidden md:inline text-[11px] tracking-[0.3em] uppercase kq-link">
          {ctaLabel}
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10 md:gap-x-7 md:gap-y-14">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <div className="mt-10 md:hidden text-center">
        <Link to={ctaTo} className="text-[11px] tracking-[0.3em] uppercase kq-link">
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
