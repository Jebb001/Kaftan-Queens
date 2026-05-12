import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { toast } from "sonner";

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);
  const { addItem } = useCart();

  const onQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.name} added to your bag`);
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[hsl(var(--kq-bg-2))] kq-img-zoom">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-[hsl(var(--kq-bg))] text-[hsl(var(--kq-ink))] text-[10px] tracking-[0.2em] uppercase px-2.5 py-1">
            {product.badge}
          </span>
        )}
        <div
          className={`absolute inset-x-3 bottom-3 transition-all duration-500 ${
            hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          <button
            onClick={onQuickAdd}
            className="w-full bg-[hsl(var(--kq-bg))] hover:bg-[hsl(var(--kq-ink))] hover:text-[hsl(var(--kq-bg))] transition-colors py-3 text-[11px] tracking-[0.25em] uppercase"
          >
            Quick Add
          </button>
        </div>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-3">
        <h3 className="font-display text-lg md:text-xl leading-tight">{product.name}</h3>
        <span className="text-sm tabular-nums">£{product.price.toFixed(2)}</span>
      </div>
      <p className="text-xs text-[hsl(var(--kq-ink-soft))] mt-1 capitalize">{product.category}</p>
    </Link>
  );
}
