import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { defaultAddresses, type Address } from "./catalog";

type AddressValue = {
  addresses: Address[];
  selected: Address | undefined;
  select: (id: string) => void;
  save: (a: Omit<Address, "isDefault"> & { isDefault?: boolean }) => void;
  setDefault: (id: string) => void;
};

const Ctx = createContext<AddressValue | null>(null);
const KEY = "feedlink.addresses.v1";

export function AddressProvider({ children }: { children: ReactNode }) {
  const [addresses, setAddresses] = useState<Address[]>(defaultAddresses);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setAddresses(JSON.parse(raw) as Address[]);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(addresses));
    } catch {
      /* ignore */
    }
  }, [addresses]);

  const value = useMemo<AddressValue>(() => {
    const selected =
      addresses.find((a) => a.id === selectedId) ??
      addresses.find((a) => a.isDefault) ??
      addresses[0];

    return {
      addresses,
      selected,
      select: setSelectedId,
      setDefault: (id) =>
        setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id }))),
      save: (a) =>
        setAddresses((prev) => {
          const exists = prev.some((p) => p.id === a.id);
          const next = exists
            ? prev.map((p) => (p.id === a.id ? { ...p, ...a, isDefault: p.isDefault } : p))
            : [...prev, { ...a, isDefault: prev.length === 0 }];
          return next;
        }),
    };
  }, [addresses, selectedId]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAddresses() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAddresses must be used inside AddressProvider");
  return ctx;
}
