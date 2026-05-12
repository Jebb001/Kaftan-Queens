import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { PRODUCTS } from "../mock";
import { ChevronDown } from "lucide-react";

const CATS = [
  { key: "all", label: "All" },
  { key: "women", label: "Women" },
  { key: "men", label: "Men" },
  { key: "accessories", label: "Bags & Scarves" },
];

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const cat = params.get("cat") || "all";
  const [sort, setSort] = useState("featured");

  const filtered = useMemo(() => {
    let list = cat === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat);
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [cat, sort]);

  const setCat = (k) => {
    if (k === "all") setParams({});
    else setParams({ cat: k });
  };

  return (
    <main className="max-w-[1400px] mx-auto px-5 md:px-10 pt-10 md:pt-16">
      <header className="mb-10 md:mb-14">
        <span className="text-[11px] tracking-[0.35em] uppercase text-[hsl(var(--kq-terracotta))]">
          —— The collection
        </span>
        <h1 className="font-display text-5xl md:text-7xl mt-3 leading-none">
          {cat === "all" ? "Shop everything" : CATS.find((c) => c.key === cat)?.label}
        </h1>
        <p className="mt-4 text-[hsl(var(--kq-ink-soft))] max-w-xl">
          Hand-loomed and block-printed in Northern India. Every piece is finished by hand.
        </p>
      </header>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-5 border-b border-[hsl(var(--kq-line))]">
        <nav className="flex flex-wrap gap-1">
          {CATS.map((c) => (
            <button
              key={c.key}
              onClick={() => setCat(c.key)}
              className={`px-4 py-2 text-[11px] tracking-[0.25em] uppercase border transition-colors ${
                cat === c.key
                  ? "bg-[hsl(var(--kq-ink))] text-[hsl(var(--kq-bg))] border-[hsl(var(--kq-ink))]"
                  : "border-[hsl(var(--kq-line))] hover:border-[hsl(var(--kq-ink))]"
              }`}
            >
              {c.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[hsl(var(--kq-ink-soft))]">{filtered.length} pieces</span>
          <span className="mx-2 text-[hsl(var(--kq-line))]">|</span>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none bg-transparent pr-7 pl-2 py-1.5 text-[11px] tracking-[0.2em] uppercase outline-none border border-[hsl(var(--kq-line))]"
            >
              <option value="featured">Featured</option>
              <option value="low">Price: Low → High</option>
              <option value="high">Price: High → Low</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10 md:gap-x-7 md:gap-y-14">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </main>
  );
}
