import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import {
  createCart,
  getCart,
  addCartLines,
  updateCartLines,
  removeCartLines,
} from "../lib/shopify";

const CartContext = createContext(null);
const STORAGE_KEY = "kq_shopify_cart_id";

function normalize(cart) {
  if (!cart) return { items: [], subtotal: 0, count: 0, checkoutUrl: null, currency: "GBP" };
  const items = cart.lines.edges.map(({ node }) => {
    const m = node.merchandise;
    const colour = m.selectedOptions.find((o) => o.name === "Colour")?.value || "";
    const size = m.selectedOptions.find((o) => o.name === "Size")?.value || null;
    const sizeLabel = [colour, size].filter(Boolean).join(" · ") || "One Size";
    return {
      key: node.id, // Shopify line id
      lineId: node.id,
      variantId: m.id,
      productHandle: m.product?.handle,
      name: m.product?.title || m.title,
      image: m.image?.url,
      price: Number(m.price.amount),
      currency: m.price.currencyCode,
      qty: node.quantity,
      size: sizeLabel,
    };
  });
  const subtotal = Number(cart.cost?.subtotalAmount?.amount || 0);
  const currency = cart.cost?.subtotalAmount?.currencyCode || "GBP";
  return {
    items,
    subtotal,
    count: cart.totalQuantity || 0,
    checkoutUrl: cart.checkoutUrl,
    currency,
  };
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  // Hydrate cart from saved cartId on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    getCart(saved)
      .then((c) => {
        if (c) setCart(c);
        else localStorage.removeItem(STORAGE_KEY);
      })
      .catch(() => localStorage.removeItem(STORAGE_KEY));
  }, []);

  const persist = (c) => {
    setCart(c);
    if (c?.id) localStorage.setItem(STORAGE_KEY, c.id);
  };

  const addItem = useCallback(
    async (variantId, qty = 1) => {
      if (!variantId) return;
      setBusy(true);
      try {
        if (!cart?.id) {
          const c = await createCart([{ merchandiseId: variantId, quantity: qty }]);
          persist(c);
        } else {
          const c = await addCartLines(cart.id, [{ merchandiseId: variantId, quantity: qty }]);
          persist(c);
        }
        setIsOpen(true);
      } finally {
        setBusy(false);
      }
    },
    [cart]
  );

  const updateQty = useCallback(
    async (lineId, qty) => {
      if (!cart?.id) return;
      setBusy(true);
      try {
        if (qty <= 0) {
          const c = await removeCartLines(cart.id, [lineId]);
          persist(c);
        } else {
          const c = await updateCartLines(cart.id, [{ id: lineId, quantity: qty }]);
          persist(c);
        }
      } finally {
        setBusy(false);
      }
    },
    [cart]
  );

  const removeItem = useCallback(
    async (lineId) => {
      if (!cart?.id) return;
      setBusy(true);
      try {
        const c = await removeCartLines(cart.id, [lineId]);
        persist(c);
      } finally {
        setBusy(false);
      }
    },
    [cart]
  );

  const clear = useCallback(async () => {
    if (!cart?.id) return;
    const ids = cart.lines.edges.map((e) => e.node.id);
    if (!ids.length) return;
    setBusy(true);
    try {
      const c = await removeCartLines(cart.id, ids);
      persist(c);
    } finally {
      setBusy(false);
    }
  }, [cart]);

  const value = useMemo(() => {
    const n = normalize(cart);
    return {
      ...n,
      isOpen,
      setIsOpen,
      busy,
      addItem,
      updateQty,
      removeItem,
      clear,
    };
  }, [cart, isOpen, busy, addItem, updateQty, removeItem, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
