import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PRODUCTS, shopUrlFor } from "../mock";
import { Truck, RotateCcw, Leaf, Minus, Plus, ChevronRight, ExternalLink } from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../components/ui/accordion";

export default function ProductDetail() {
  const { id } = useParams();
  const product = PRODUCTS.find((p) => p.id === id);
  const variants = product?.variants || [];
  const [colour, setColour] = useState(variants[0]?.colour || product?.colours?.[0] || "");
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  // Reset gallery when colour changes
  React.useEffect(() => {
    setActiveImg(0);
  }, [colour]);

  if (!product) {
    return (
      <main className="max-w-[1400px] mx-auto px-5 md:px-10 py-32 text-center">
        <h1 className="font-display text-4xl">Piece not found</h1>
        <Link to="/shop" className="inline-block mt-6 kq-link text-[11px] tracking-[0.28em] uppercase">
          Back to shop
        </Link>
      </main>
    );
  }

  const activeVariant = variants.find((v) => v.colour === colour) || variants[0];
  const galleryImages = activeVariant?.images || product.images;
  const buyHref = shopUrlFor(product.id);

  const related = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <main className="max-w-[1400px] mx-auto px-5 md:px-10 pt-8 md:pt-12">
      <nav className="text-xs text-[hsl(var(--kq-ink-soft))] mb-6 flex items-center gap-1">
        <Link to="/" className="kq-link">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/shop" className="kq-link">Shop</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-[hsl(var(--kq-ink))]">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-10 md:gap-16">
        {/* Gallery */}
        <div>
          <div className="relative aspect-[4/5] bg-[hsl(var(--kq-bg-2))] overflow-hidden">
            <img
              key={galleryImages[activeImg]}
              src={galleryImages[activeImg]}
              alt={`${product.name} — ${colour}`}
              style={{ objectPosition: product.pos || "center" }}
              className="w-full h-full object-cover kq-fade-up"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-[hsl(var(--kq-bg))] text-[hsl(var(--kq-ink))] text-[10px] tracking-[0.22em] uppercase px-3 py-1.5">
                {product.badge}
              </span>
            )}
          </div>
          {galleryImages.length > 1 && (
            <div className="grid grid-cols-5 gap-2 mt-3">
              {galleryImages.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setActiveImg(i)}
                  className={`aspect-[3/4] overflow-hidden border ${
                    activeImg === i ? "border-[hsl(var(--kq-accent-2))]" : "border-transparent"
                  }`}
                >
                  <img src={src} alt="" style={{ objectPosition: product.pos || "center" }} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Detail */}
        <div className="md:py-6">
          <span className="text-[11px] tracking-[0.28em] uppercase text-[hsl(var(--kq-accent-2))] capitalize">
            {product.category}
          </span>
          <h1 className="font-display text-4xl md:text-5xl mt-3 leading-tight">{product.name}</h1>
          {product.sub && <p className="font-italic text-lg text-[hsl(var(--kq-ink-soft))] mt-2">{product.sub}</p>}
          <div className="mt-5 flex items-center gap-3">
            <span className="kq-thin-rule" />
            <p className="font-display text-2xl tabular-nums">£{product.price.toFixed(2)} <span className="text-xs tracking-[0.2em] uppercase text-[hsl(var(--kq-ink-soft))]">GBP</span></p>
          </div>

          <p className="mt-6 text-[hsl(var(--kq-ink-soft))] leading-relaxed">{product.description}</p>

          {/* Colour swatches */}
          {product.colours && product.colours.length > 0 && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] tracking-[0.28em] uppercase">
                  Colour <span className="text-[hsl(var(--kq-ink-soft))] ml-1 normal-case tracking-normal font-italic">{colour}</span>
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.colours.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColour(c)}
                    className={`px-4 py-2.5 text-xs border transition-colors ${
                      colour === c
                        ? "bg-[hsl(var(--kq-ink))] text-[hsl(var(--kq-bg))] border-[hsl(var(--kq-ink))]"
                        : "border-[hsl(var(--kq-line))] hover:border-[hsl(var(--kq-ink))]"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size note */}
          <div className="mt-6">
            <p className="text-[11px] tracking-[0.28em] uppercase">Size <span className="text-[hsl(var(--kq-ink-soft))] ml-1 normal-case tracking-normal font-italic">One Size</span></p>
            {product.sizing && (
              <p className="text-xs text-[hsl(var(--kq-ink-soft))] mt-2 font-italic">{product.sizing}</p>
            )}
          </div>

          {/* Qty + buy */}
          <div className="mt-8 flex items-stretch gap-3">
            <div className="inline-flex items-center border border-[hsl(var(--kq-line))]">
              <button className="px-3 py-3.5" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease"><Minus className="w-3.5 h-3.5" /></button>
              <span className="px-4 tabular-nums text-sm">{qty}</span>
              <button className="px-3 py-3.5" onClick={() => setQty((q) => q + 1)} aria-label="Increase"><Plus className="w-3.5 h-3.5" /></button>
            </div>
            <a
              href={buyHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-[hsl(var(--kq-ink))] text-[hsl(var(--kq-bg))] py-3.5 text-[11px] tracking-[0.28em] uppercase hover:bg-[hsl(var(--kq-accent-2))] transition-colors"
            >
              Buy on Kaftan Queens
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
          <p className="mt-3 text-[11px] text-[hsl(var(--kq-ink-soft))] font-italic">
            Secure checkout & shipping handled by our shop.
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3 text-xs">
            {[
              [Truck, "Free UK over £150"],
              [RotateCcw, "14-day returns"],
              [Leaf, "Natural fibres"],
            ].map(([Icon, t], i) => (
              <div key={i} className="flex items-center gap-2 border border-[hsl(var(--kq-line))] px-3 py-2.5">
                <Icon className="w-3.5 h-3.5 text-[hsl(var(--kq-accent-2))]" strokeWidth={1.4} />
                <span className="text-[10px] tracking-[0.18em] uppercase">{t}</span>
              </div>
            ))}
          </div>

          <Accordion type="single" collapsible className="mt-8 border-t border-[hsl(var(--kq-line))]" defaultValue="a">
            <AccordionItem value="a" className="border-b border-[hsl(var(--kq-line))]">
              <AccordionTrigger className="text-[11px] tracking-[0.25em] uppercase">Details & Materials</AccordionTrigger>
              <AccordionContent className="text-sm text-[hsl(var(--kq-ink-soft))] space-y-1.5">
                {product.material && <p><span className="text-[hsl(var(--kq-ink))]">Material:</span> {product.material}</p>}
                {product.origin && <p><span className="text-[hsl(var(--kq-ink))]">Origin:</span> {product.origin}</p>}
                {product.sizing && <p><span className="text-[hsl(var(--kq-ink))]">Sizing:</span> {product.sizing}</p>}
                {product.colours && <p><span className="text-[hsl(var(--kq-ink))]">Colours:</span> {product.colours.join(", ")}</p>}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="b" className="border-b border-[hsl(var(--kq-line))]">
              <AccordionTrigger className="text-[11px] tracking-[0.25em] uppercase">Care</AccordionTrigger>
              <AccordionContent className="text-sm text-[hsl(var(--kq-ink-soft))]">
                {product.care || "Hand wash cold or gentle machine cycle. Line dry in shade. Cool iron on reverse."}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="c">
              <AccordionTrigger className="text-[11px] tracking-[0.25em] uppercase">Shipping & Returns</AccordionTrigger>
              <AccordionContent className="text-sm text-[hsl(var(--kq-ink-soft))]">
                Free UK shipping on orders over £150. International calculated at checkout. 14-day returns on unworn pieces.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* Related */}
      <section className="mt-24 md:mt-32">
        <div className="text-center mb-10">
          <span className="text-[11px] tracking-[0.32em] uppercase text-[hsl(var(--kq-accent-2))]">— You may also love</span>
          <h3 className="font-display text-3xl md:text-4xl mt-3">Pair it with</h3>
          <div className="mt-4 flex items-center justify-center"><span className="kq-thin-rule" /></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-12 md:gap-x-7">
          {related.map((p) => (
            <Link key={p.id} to={`/products/${p.id}`} className="group block text-center">
              <div className="aspect-[3/4] kq-img-zoom bg-[hsl(var(--kq-bg-2))]">
                <img src={p.images[0]} alt={p.name} style={{ objectPosition: p.pos || "center 25%" }} className="w-full h-full object-cover" />
              </div>
              <h4 className="font-display text-lg md:text-xl mt-4">{p.name}</h4>
              <p className="text-[13px] mt-1 tabular-nums">£{p.price.toFixed(2)}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
