import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Minus, Plus, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function Cart() {
  const { items, updateQty, removeItem, subtotal, clear, checkoutUrl, busy, currency } = useCart();

  return (
    <main className="max-w-[1400px] mx-auto px-5 md:px-10 pt-10 md:pt-16">
      <h1 className="font-display text-5xl md:text-7xl leading-none">Your bag</h1>
      <p className="mt-3 text-[hsl(var(--kq-ink-soft))]">{items.length} {items.length === 1 ? "piece" : "pieces"} · review and check out below.</p>

      {items.length === 0 ? (
        <div className="mt-16 border-t border-[hsl(var(--kq-line))] pt-16 text-center">
          <p className="text-[hsl(var(--kq-ink-soft))]">Your bag is empty.</p>
          <Link to="/shop" className="inline-block mt-6 bg-[hsl(var(--kq-ink))] text-[hsl(var(--kq-bg))] px-7 py-4 text-[11px] tracking-[0.3em] uppercase hover:bg-[hsl(var(--kq-terracotta))] transition-colors">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="border-t border-[hsl(var(--kq-line))]">
              {items.map((it) => (
                <div key={it.key} className="py-6 border-b border-[hsl(var(--kq-line))] flex gap-5">
                  {it.image && (
                    <img src={it.image} alt={it.name} className="w-28 h-36 object-cover bg-[hsl(var(--kq-bg-2))]" />
                  )}
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between gap-3">
                      <div>
                        <h3 className="font-display text-2xl">{it.name}</h3>
                        <p className="text-xs text-[hsl(var(--kq-ink-soft))] mt-1">{it.size}</p>
                      </div>
                      <button onClick={() => removeItem(it.lineId)} aria-label="Remove" className="text-[hsl(var(--kq-ink-soft))] hover:text-[hsl(var(--kq-ink))]">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="inline-flex items-center border border-[hsl(var(--kq-line))]">
                        <button className="p-2" onClick={() => updateQty(it.lineId, it.qty - 1)} aria-label="Decrease" disabled={busy}><Minus className="w-3 h-3" /></button>
                        <span className="px-3 text-sm tabular-nums">{it.qty}</span>
                        <button className="p-2" onClick={() => updateQty(it.lineId, it.qty + 1)} aria-label="Increase" disabled={busy}><Plus className="w-3 h-3" /></button>
                      </div>
                      <span className="font-display text-xl tabular-nums">£{(it.price * it.qty).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-between text-xs">
              <Link to="/shop" className="kq-link tracking-[0.25em] uppercase">← Continue Shopping</Link>
              <button onClick={async () => { await clear(); toast.success("Bag cleared"); }} className="kq-link tracking-[0.25em] uppercase text-[hsl(var(--kq-ink-soft))]">Clear Bag</button>
            </div>
          </div>

          {/* Summary */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 bg-[hsl(var(--kq-bg-2))]/60 p-6 md:p-8">
              <h3 className="font-display text-2xl mb-5">Order summary</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between"><dt>Subtotal</dt><dd className="tabular-nums">£{subtotal.toFixed(2)} {currency}</dd></div>
                <div className="flex justify-between"><dt>Shipping</dt><dd className="tabular-nums text-[hsl(var(--kq-ink-soft))]">Calculated at checkout</dd></div>
              </dl>
              <a
                href={checkoutUrl || "#"}
                onClick={(e) => { if (!checkoutUrl) { e.preventDefault(); toast.error("Checkout not ready yet"); } }}
                data-testid="cart-page-checkout-btn"
                className="mt-6 flex items-center justify-center gap-2 w-full bg-[hsl(var(--kq-ink))] text-[hsl(var(--kq-bg))] py-4 text-[11px] tracking-[0.3em] uppercase hover:bg-[hsl(var(--kq-terracotta))] transition-colors"
              >
                {busy && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                Secure Checkout
              </a>
              <p className="mt-4 text-xs text-[hsl(var(--kq-ink-soft))] text-center">
                You'll complete payment on Shopify's secure checkout. Free UK shipping on orders over £150.
              </p>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}
