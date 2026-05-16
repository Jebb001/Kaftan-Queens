import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "./ui/sheet";
import { useCart } from "../context/CartContext";
import { Minus, Plus, X, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQty, removeItem, subtotal, checkoutUrl, busy, currency } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="bg-[hsl(var(--kq-bg))] w-full sm:max-w-md flex flex-col p-0" data-testid="cart-drawer">
        <SheetHeader className="px-6 py-5 border-b border-[hsl(var(--kq-line))]">
          <SheetTitle className="font-display text-2xl text-left">Your Bag</SheetTitle>
          <SheetDescription className="sr-only">Review the items in your bag and proceed to checkout.</SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="text-center py-20" data-testid="cart-empty">
              <p className="text-sm text-[hsl(var(--kq-ink-soft))]">Your bag is empty.</p>
              <Link
                to="/shop"
                onClick={() => setIsOpen(false)}
                className="inline-block mt-5 text-xs tracking-[0.25em] uppercase border-b border-[hsl(var(--kq-ink))] pb-1"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-[hsl(var(--kq-line))]" data-testid="cart-items">
              {items.map((it) => (
                <li key={it.key} className="py-4 flex gap-4">
                  {it.image && (
                    <img src={it.image} alt={it.name} className="w-20 h-24 object-cover bg-[hsl(var(--kq-bg-2))]" />
                  )}
                  <div className="flex-1">
                    <div className="flex justify-between gap-2">
                      <h4 className="font-display text-base">{it.name}</h4>
                      <button onClick={() => removeItem(it.lineId)} aria-label="Remove" className="text-[hsl(var(--kq-ink-soft))] hover:text-[hsl(var(--kq-ink))]" data-testid={`cart-remove-${it.lineId}`}>
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-[hsl(var(--kq-ink-soft))]">{it.size}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="inline-flex items-center border border-[hsl(var(--kq-line))]">
                        <button className="p-2" onClick={() => updateQty(it.lineId, it.qty - 1)} aria-label="Decrease" disabled={busy}>
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-sm tabular-nums">{it.qty}</span>
                        <button className="p-2" onClick={() => updateQty(it.lineId, it.qty + 1)} aria-label="Increase" disabled={busy}>
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-sm tabular-nums">£{(it.price * it.qty).toFixed(2)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-[hsl(var(--kq-line))] space-y-4">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span className="tabular-nums" data-testid="cart-subtotal">£{subtotal.toFixed(2)} {currency}</span>
            </div>
            <p className="text-xs text-[hsl(var(--kq-ink-soft))]">Shipping & taxes calculated at checkout.</p>
            <a
              href={checkoutUrl || "#"}
              onClick={(e) => { if (!checkoutUrl) e.preventDefault(); }}
              data-testid="cart-checkout-btn"
              className="flex items-center justify-center gap-2 w-full bg-[hsl(var(--kq-ink))] text-[hsl(var(--kq-bg))] py-3.5 text-xs tracking-[0.25em] uppercase hover:bg-[hsl(var(--kq-terracotta))] transition-colors"
            >
              {busy && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              Checkout
            </a>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
