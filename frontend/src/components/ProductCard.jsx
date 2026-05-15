import React from "react";
import { Link } from "react-router-dom";
import { shopUrlFor } from "../mock";

export default function ProductCard({ product }) {
  // Front: first variant's primary image. Back: second variant's image, or second image of first variant.
  const variants = product.variants || [{ colour: "", images: product.images }];
  const front = variants[0].images[0];
  const back = variants[1]?.images?.[0] || variants[0].images[1] || front;
  const buyHref = shopUrlFor(product.id);

  return (
    <div className="group block">
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative aspect-[3/4] kq-swap bg-[hsl(var(--kq-bg-2))]">
          <img
            src={front}
            alt={product.name}
            loading="lazy"
            style={{ objectPosition: product.pos || "center 25%" }}
            className="kq-swap-front"
          />
          <img
            src={back}
            alt={`${product.name} alternate`}
            loading="lazy"
            style={{ objectPosition: product.pos || "center 25%" }}
            className="kq-swap-back"
          />
          {product.badge && (
            <span className="absolute top-3 left-3 bg-[hsl(var(--kq-bg))] text-[hsl(var(--kq-ink))] text-[10px] tracking-[0.22em] uppercase px-2.5 py-1">
              {product.badge}
            </span>
          )}
          <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            <a
              href={buyHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="block text-center w-full bg-[hsl(var(--kq-bg))] text-[hsl(var(--kq-ink))] hover:bg-[hsl(var(--kq-ink))] hover:text-[hsl(var(--kq-bg))] transition-colors py-3 text-[11px] tracking-[0.28em] uppercase"
            >
              Shop Now
            </a>
          </div>
        </div>
      </Link>
      <div className="mt-5 text-center">
        <Link to={`/products/${product.id}`} className="block">
          <h3 className="font-display text-xl md:text-[22px] leading-snug">{product.name}</h3>
        </Link>
        {product.sub && (
          <p className="font-italic text-sm text-[hsl(var(--kq-ink-soft))] mt-1">{product.sub}</p>
        )}
        <p className="text-[13px] tracking-[0.04em] mt-2 tabular-nums">£{product.price.toFixed(2)}</p>
      </div>
    </div>
  );
}
