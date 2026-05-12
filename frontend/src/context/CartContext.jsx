import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "kq_cart_v1";

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (product, opts = {}) => {
    const size = opts.size || "One Size";
    const qty = opts.qty || 1;
    setItems((prev) => {
      const key = `${product.id}__${size}`;
      const existing = prev.find((p) => p.key === key);
      if (existing) {
        return prev.map((p) =>
          p.key === key ? { ...p, qty: p.qty + qty } : p
        );
      }
      return [
        ...prev,
        {
          key,
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0],
          size,
          qty,
        },
      ];
    });
    setIsOpen(true);
  };

  const removeItem = (key) =>
    setItems((prev) => prev.filter((p) => p.key !== key));

  const updateQty = (key, qty) =>
    setItems((prev) =>
      prev
        .map((p) => (p.key === key ? { ...p, qty: Math.max(1, qty) } : p))
        .filter((p) => p.qty > 0)
    );

  const clear = () => setItems([]);

  const value = useMemo(() => {
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
    const count = items.reduce((s, i) => s + i.qty, 0);
    return {
      items,
      isOpen,
      setIsOpen,
      addItem,
      removeItem,
      updateQty,
      clear,
      subtotal,
      count,
    };
  }, [items, isOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
