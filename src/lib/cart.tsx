import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getProduct, priceOf } from "./catalog";

export type CartLine = { productId: string; kg: number; qty: number };

type CartValue = {
  lines: CartLine[];
  qtyOf: (id: string, kg: number) => number;
  setQty: (id: string, kg: number, qty: number) => void;
  add: (id: string, kg: number, qty: number) => void;
  remove: (id: string, kg: number) => void;
  clear: () => void;
  bags: number;
  subtotal: number;
};

const CartContext = createContext<CartValue | null>(null);
const KEY = "feedlink.cart.v2";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines]);

  const value = useMemo<CartValue>(() => {
    const same = (l: CartLine, id: string, kg: number) => l.productId === id && l.kg === kg;

    const setQty = (id: string, kg: number, qty: number) =>
      setLines((prev) => {
        if (qty <= 0) return prev.filter((l) => !same(l, id, kg));
        if (prev.some((l) => same(l, id, kg)))
          return prev.map((l) => (same(l, id, kg) ? { ...l, qty } : l));
        return [...prev, { productId: id, kg, qty }];
      });

    return {
      lines,
      qtyOf: (id, kg) => lines.find((l) => same(l, id, kg))?.qty ?? 0,
      setQty,
      add: (id, kg, qty) =>
        setQty(id, kg, (lines.find((l) => same(l, id, kg))?.qty ?? 0) + qty),
      remove: (id, kg) => setQty(id, kg, 0),
      clear: () => setLines([]),
      bags: lines.reduce((s, l) => s + l.qty, 0),
      subtotal: lines.reduce(
        (s, l) => s + (getProduct(l.productId) ? priceOf(l.productId, l.kg) : 0) * l.qty,
        0,
      ),
    };
  }, [lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
