import React from "react";
import { Link } from "react-router-dom";
import { buildSrcSet } from "../lib/shopify";

// On mobile: 1 col fills viewport (~390px). On md: 3 cols (~440px each).
// On lg: 4 cols (~340px each). srcset lets the browser pick the smallest match.
const CARD_SIZES = "(min-width: 1024px) 340px, (min-width: 768px) 50vw, 100vw";

export default function ProductCard({ product, priority = false }) {
  // Front: optional card-image override, else first variant's primary image.
  // Back: second variant's image, or second image of first variant.
  const variants = product.variants || [{ colour: "", images: product.images }];
  const front = product.cardImage || variants[0].images[0];
  const back = variants[1]?.images?.[0] || variants[0].images[1] || front;
  const frontPos = product.cardImage ? "center 35%" : (product.pos || "center 25%");
  const frontSrcSet = buildSrcSet(front);
  const backSrcSet = buildSrcSet(back);

  return (
    <div className="group block">
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative aspect-[3/4] kq-swap bg-[hsl(var(--kq-bg-2))]">
          <img
            src={front}
            srcSet={frontSrcSet || undefined}
            sizes={frontSrcSet ? CARD_SIZES : undefined}
            alt={product.name}
            width="800"
            height="1067"
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            decoding="async"
            style={{ objectPosition: frontPos }}
            className="kq-swap-front"
          />
          <img
            src={back}
            srcSet={backSrcSet || undefined}
            sizes={backSrcSet ? CARD_SIZES : undefined}
            alt={`${product.name} alternate`}
            width="800"
            height="1067"
            loading="lazy"
            decoding="async"
            style={{ objectPosition: product.pos || "center 25%" }}
            className="kq-swap-back"
          />
          {product.badge && (
            <span className="absolute top-3 left-3 bg-[hsl(var(--kq-bg))] text-[hsl(var(--kq-ink))] text-[10px] tracking-[0.22em] uppercase px-2.5 py-1">
              {product.badge}
            </span>
          )}
          <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            <span className="block w-full text-center bg-[hsl(var(--kq-bg))] text-[hsl(var(--kq-ink))] group-hover:bg-[hsl(var(--kq-ink))] group-hover:text-[hsl(var(--kq-bg))] transition-colors py-3 text-[11px] tracking-[0.28em] uppercase">
              Select Options
            </span>
          </div>
        </div>
        <div className="mt-5 text-center">
          <h3 className="font-display text-xl md:text-[22px] leading-snug">{product.name}</h3>
          {product.sub && (
            <p className="font-italic text-sm text-[hsl(var(--kq-ink-soft))] mt-1">{product.sub}</p>
          )}
          <p className="text-[13px] tracking-[0.04em] mt-2 tabular-nums">£{product.price.toFixed(2)}</p>
        </div>
      </Link>
    </div>
  );
}
