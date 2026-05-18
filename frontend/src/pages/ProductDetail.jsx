import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useProduct, useProducts } from "../hooks/useProducts";
import { findVariantId } from "../lib/shopify";
import { ORDER_EMAIL } from "../data/localAdditions";
import { useCart } from "../context/CartContext";
import { toast } from "sonner";
import { Truck, RotateCcw, Leaf, Minus, Plus, ChevronRight, Loader2, Mail } from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../components/ui/accordion";

export default function ProductDetail() {
  const { id } = useParams();
  const { product, loading } = useProduct(id);
  const { products } = useProducts();
  const { addItem, busy } = useCart();

  const variants = product?.variants || [];
  const [colour, setColour] = useState("");
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  // Initialize selections once product loads
  useEffect(() => {
    if (!product) return;
    setColour(variants[0]?.colour || "");
    setSize(product.sizes?.[0] || "");
    setActiveImg(0);
    setQty(1);
  }, [product?.handle]); // eslint-disable-line

  // Reset gallery when colour changes
  useEffect(() => {
    setActiveImg(0);
  }, [colour]);

  if (loading) {
    return (
      <main className="max-w-[1400px] mx-auto px-5 md:px-10 py-32 text-center" data-testid="pdp-loading">
        <Loader2 className="w-6 h-6 animate-spin mx-auto mb-3 text-[hsl(var(--kq-ink-soft))]" />
        <p className="text-xs tracking-[0.2em] uppercase text-[hsl(var(--kq-ink-soft))]">Loading piece…</p>
      </main>
    );
  }

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
  const galleryImages = activeVariant?.images?.length ? activeVariant.images : product.images;
  const isPending = !!activeVariant?.pending;
  const pendingSizes = activeVariant?.sizes || [];
  const sizesToShow = isPending && pendingSizes.length ? pendingSizes : product.sizes;
  const useContain = activeVariant?.imageFit === "contain";
  const imgFitClass = useContain ? "object-contain" : "object-cover";

  const onAdd = async () => {
    const variantId = findVariantId(product, colour, product.sizes ? size : null);
    if (!variantId) {
      toast.error("Sorry, this option is unavailable.");
      return;
    }
    try {
      await addItem(variantId, qty);
      const labelParts = [colour, product.sizes ? size : null].filter(Boolean);
      toast.success(`${product.name}${labelParts.length ? ` (${labelParts.join(" · ")})` : ""} added to your bag`);
    } catch (e) {
      toast.error(e.message || "Couldn't add to bag. Please try again.");
    }
  };

  const related = products.filter((p) => p.handle !== product.handle).slice(0, 4);

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
              style={{ objectPosition: useContain ? "center" : (product.pos || "center") }}
              className={`w-full h-full ${imgFitClass} kq-fade-up`}
              data-testid="pdp-main-image"
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
                  data-testid={`pdp-thumb-${i}`}
                  className={`aspect-[3/4] overflow-hidden border ${
                    activeImg === i ? "border-[hsl(var(--kq-accent-2))]" : "border-transparent"
                  }`}
                >
                  <img src={src} alt="" style={{ objectPosition: useContain ? "center" : (product.pos || "center") }} className={`w-full h-full ${imgFitClass}`} />
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
          <h1 className="font-display text-4xl md:text-5xl mt-3 leading-tight" data-testid="pdp-title">{product.name}</h1>
          {product.sub && <p className="font-italic text-lg text-[hsl(var(--kq-ink-soft))] mt-2">{product.sub}</p>}
          <div className="mt-5 flex items-center gap-3">
            <span className="kq-thin-rule" />
            <p className="font-display text-2xl tabular-nums">£{product.price.toFixed(2)} <span className="text-xs tracking-[0.2em] uppercase text-[hsl(var(--kq-ink-soft))]">{product.currency || "GBP"}</span></p>
          </div>

          {product.descriptionHtml ? (
            <div
              className="mt-6 text-[hsl(var(--kq-ink-soft))] leading-relaxed kq-rich"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          ) : (
            <p className="mt-6 text-[hsl(var(--kq-ink-soft))] leading-relaxed">{product.description}</p>
          )}

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
                    data-testid={`pdp-colour-${c}`}
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

          {/* Size */}
          <div className="mt-6">
            {sizesToShow && sizesToShow.length > 0 ? (
              <>
                <p className="text-[11px] tracking-[0.28em] uppercase">
                  Size <span className="text-[hsl(var(--kq-ink-soft))] ml-1 normal-case tracking-normal font-italic">{size}</span>
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {sizesToShow.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      data-testid={`pdp-size-${s}`}
                      className={`px-5 py-2.5 text-xs border transition-colors ${
                        size === s
                          ? "bg-[hsl(var(--kq-ink))] text-[hsl(var(--kq-bg))] border-[hsl(var(--kq-ink))]"
                          : "border-[hsl(var(--kq-line))] hover:border-[hsl(var(--kq-ink))]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-[11px] tracking-[0.28em] uppercase">
                Size <span className="text-[hsl(var(--kq-ink-soft))] ml-1 normal-case tracking-normal font-italic">One Size</span>
              </p>
            )}
          </div>

          {/* Qty + add */}
          <div className="mt-8 flex items-stretch gap-3">
            <div className="inline-flex items-center border border-[hsl(var(--kq-line))]">
              <button className="px-3 py-3.5" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease" disabled={isPending}><Minus className="w-3.5 h-3.5" /></button>
              <span className="px-4 tabular-nums text-sm" data-testid="pdp-qty">{qty}</span>
              <button className="px-3 py-3.5" onClick={() => setQty((q) => q + 1)} aria-label="Increase" disabled={isPending}><Plus className="w-3.5 h-3.5" /></button>
            </div>
            {isPending ? (
              <a
                href={`mailto:${ORDER_EMAIL}?subject=${encodeURIComponent(`Order: ${product.name} — ${colour}${size ? ` (${size})` : ""}`)}&body=${encodeURIComponent(`Hi, I'd like to order the ${product.name} in ${colour}${size ? ` (size ${size})` : ""}. Please confirm availability and next steps. Thank you!`)}`}
                data-testid="pdp-email-to-order"
                className="flex-1 bg-[hsl(var(--kq-ink))] text-[hsl(var(--kq-bg))] py-3.5 text-[11px] tracking-[0.28em] uppercase hover:bg-[hsl(var(--kq-accent-2))] transition-colors flex items-center justify-center gap-2"
              >
                <Mail className="w-3.5 h-3.5" /> Email to Order — £{product.price.toFixed(2)}
              </a>
            ) : (
              <button
                onClick={onAdd}
                disabled={busy}
                data-testid="pdp-add-to-bag"
                className="flex-1 bg-[hsl(var(--kq-ink))] text-[hsl(var(--kq-bg))] py-3.5 text-[11px] tracking-[0.28em] uppercase hover:bg-[hsl(var(--kq-accent-2))] transition-colors disabled:opacity-60"
              >
                {busy ? "Adding…" : `Add to Bag — £${(product.price * qty).toFixed(2)}`}
              </button>
            )}
          </div>

          {isPending && (
            <p className="mt-3 text-xs font-italic text-[hsl(var(--kq-ink-soft))]">
              Just landed — final stock being confirmed. Email us and we'll reserve a piece for you.
            </p>
          )}

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
                {product.colours && <p><span className="text-[hsl(var(--kq-ink))]">Colours:</span> {product.colours.join(", ")}</p>}
                {product.sizes && <p><span className="text-[hsl(var(--kq-ink))]">Sizes:</span> {product.sizes.join(", ")}</p>}
                {product.vendor && <p><span className="text-[hsl(var(--kq-ink))]">Vendor:</span> {product.vendor}</p>}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="b">
              <AccordionTrigger className="text-[11px] tracking-[0.25em] uppercase">Shipping & Returns</AccordionTrigger>
              <AccordionContent className="text-sm text-[hsl(var(--kq-ink-soft))]">
                Free UK shipping on orders over £150. International calculated at checkout. 14-day returns on unworn pieces.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
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
      )}
    </main>
  );
}
