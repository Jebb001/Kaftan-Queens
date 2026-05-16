import { useEffect, useState } from "react";
import { fetchProducts, fetchProductByHandle } from "../lib/shopify";

// Module-level cache so we don't re-fetch the full catalogue on every page change.
let cachedProducts = null;
let cachedPromise = null;

export function useProducts() {
  const [products, setProducts] = useState(cachedProducts || []);
  const [loading, setLoading] = useState(!cachedProducts);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cachedProducts) return;
    if (!cachedPromise) cachedPromise = fetchProducts(50);
    cachedPromise
      .then((list) => {
        cachedProducts = list;
        setProducts(list);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return { products, loading, error };
}

export function useProduct(handle) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!handle) return;
    setLoading(true);
    // Try cache first
    if (cachedProducts) {
      const hit = cachedProducts.find((p) => p.handle === handle);
      if (hit) {
        setProduct(hit);
        setLoading(false);
        return;
      }
    }
    fetchProductByHandle(handle)
      .then((p) => {
        setProduct(p);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [handle]);

  return { product, loading, error };
}
