import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getProduct } from "./catalog";

type CartLine = { productId: string; qty: number };

type CartValue = {
  lines: CartLine[];
  qtyOf: (id: string) => number;
  setQty: (id: string, qty: number) => void;
  add: (id: string, qty?: number) => void;
  clear: () => void;
  count: number;
  bags: number;
  subtotal: number;
  savings: number;
  notes: string;
  setNotes: (v: string) => void;
};

const CartContext = createContext<CartValue | null>(null);
const KEY = "feedlink.cart.v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [notes, setNotes] = useState("");

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
    const qtyOf = (id: string) => lines.find((l) => l.productId === id)?.qty ?? 0;

    const setQty = (id: string, qty: number) =>
      setLines((prev) => {
        if (qty <= 0) return prev.filter((l) => l.productId !== id);
        if (prev.some((l) => l.productId === id))
          return prev.map((l) => (l.productId === id ? { ...l, qty } : l));
        return [...prev, { productId: id, qty }];
      });

    const priced = lines.map((l) => ({ line: l, product: getProduct(l.productId) }));
    const subtotal = priced.reduce((s, p) => s + (p.product?.price ?? 0) * p.line.qty, 0);
    const savings = priced.reduce(
      (s, p) => s + ((p.product?.mrp ?? 0) - (p.product?.price ?? 0)) * p.line.qty,
      0,
    );

    return {
      lines,
      qtyOf,
      setQty,
      add: (id, qty) => setQty(id, qtyOf(id) + (qty ?? getProduct(id)?.moq ?? 1)),
      clear: () => setLines([]),
      count: lines.length,
      bags: lines.reduce((s, l) => s + l.qty, 0),
      subtotal,
      savings,
      notes,
      setNotes,
    };
  }, [lines, notes]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
