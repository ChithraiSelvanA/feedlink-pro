import cattleImg from "@/assets/feed-cattle.jpg";
import goatImg from "@/assets/feed-goat.jpg";
import poultryImg from "@/assets/feed-poultry.jpg";
import mineralImg from "@/assets/feed-mineral.jpg";

export type Category = {
  slug: string;
  name: string;
  items: number;
  icon: "cattle" | "goat" | "poultry" | "husk" | "mineral";
};

export type BagSize = { kg: number; price: number };

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  sizes: BagSize[];
  inStock: boolean;
};

export const dealer = {
  business: "Rajesh Traders",
  owner: "Rajesh Kumar",
  phone: "+91 98765 43210",
  code: "DLR-10428",
};

export type Address = {
  id: string;
  label: string;
  line: string;
  city: string;
  pincode: string;
  isDefault: boolean;
};

export const defaultAddresses: Address[] = [
  {
    id: "addr-1",
    label: "Shop",
    line: "Plot 14, Krishi Market Road",
    city: "Nashik, Maharashtra",
    pincode: "422011",
    isDefault: true,
  },
  {
    id: "addr-2",
    label: "Godown",
    line: "Survey 88, Dindori Highway",
    city: "Nashik, Maharashtra",
    pincode: "422202",
    isDefault: false,
  },
];

export const categories: Category[] = [
  { slug: "cattle-feed", name: "Cattle Feed", items: 4, icon: "cattle" },
  { slug: "goat-feed", name: "Goat Feed", items: 3, icon: "goat" },
  { slug: "poultry-feed", name: "Poultry Feed", items: 3, icon: "poultry" },
  { slug: "husk", name: "Husk", items: 3, icon: "husk" },
  { slug: "minerals", name: "Minerals", items: 3, icon: "mineral" },
];

export const products: Product[] = [
  {
    id: "cf-101",
    name: "Milk Max Dairy Pellet",
    brand: "AgriPro",
    category: "cattle-feed",
    image: cattleImg,
    inStock: true,
    sizes: [
      { kg: 35, price: 880 },
      { kg: 50, price: 1240 },
    ],
  },
  {
    id: "cf-102",
    name: "Buffalo Power Concentrate",
    brand: "AgriPro",
    category: "cattle-feed",
    image: cattleImg,
    inStock: true,
    sizes: [
      { kg: 35, price: 830 },
      { kg: 50, price: 1180 },
    ],
  },
  {
    id: "cf-103",
    name: "Calf Starter Crumble",
    brand: "NutriFarm",
    category: "cattle-feed",
    image: cattleImg,
    inStock: true,
    sizes: [
      { kg: 25, price: 890 },
      { kg: 50, price: 1720 },
    ],
  },
  {
    id: "cf-104",
    name: "Daily Dairy Mash",
    brand: "GreenValley",
    category: "cattle-feed",
    image: cattleImg,
    inStock: false,
    sizes: [{ kg: 50, price: 1090 }],
  },
  {
    id: "gf-201",
    name: "Nutririch Premium Feed",
    brand: "Nutririch",
    category: "goat-feed",
    image: goatImg,
    inStock: true,
    sizes: [
      { kg: 35, price: 740 },
      { kg: 50, price: 1050 },
    ],
  },
  {
    id: "gf-202",
    name: "Goat Grow Pellet",
    brand: "NutriFarm",
    category: "goat-feed",
    image: goatImg,
    inStock: true,
    sizes: [
      { kg: 40, price: 1050 },
      { kg: 50, price: 1290 },
    ],
  },
  {
    id: "gf-203",
    name: "Sheep & Goat Fattener",
    brand: "GreenValley",
    category: "goat-feed",
    image: goatImg,
    inStock: true,
    sizes: [{ kg: 40, price: 1120 }],
  },
  {
    id: "pf-301",
    name: "Layer Mash Premium",
    brand: "GreenValley",
    category: "poultry-feed",
    image: poultryImg,
    inStock: true,
    sizes: [
      { kg: 35, price: 1010 },
      { kg: 50, price: 1420 },
    ],
  },
  {
    id: "pf-302",
    name: "Broiler Finisher Crumble",
    brand: "AgriPro",
    category: "poultry-feed",
    image: poultryImg,
    inStock: true,
    sizes: [{ kg: 50, price: 1560 }],
  },
  {
    id: "pf-303",
    name: "Chick Starter Mash",
    brand: "Nutririch",
    category: "poultry-feed",
    image: poultryImg,
    inStock: true,
    sizes: [
      { kg: 25, price: 810 },
      { kg: 50, price: 1580 },
    ],
  },
  {
    id: "hk-401",
    name: "Wheat Bran Husk",
    brand: "GreenValley",
    category: "husk",
    image: mineralImg,
    inStock: true,
    sizes: [
      { kg: 35, price: 520 },
      { kg: 50, price: 730 },
    ],
  },
  {
    id: "hk-402",
    name: "Rice Husk Fine",
    brand: "AgriPro",
    category: "husk",
    image: mineralImg,
    inStock: true,
    sizes: [{ kg: 50, price: 610 }],
  },
  {
    id: "hk-403",
    name: "Cotton Seed Husk",
    brand: "NutriFarm",
    category: "husk",
    image: mineralImg,
    inStock: true,
    sizes: [
      { kg: 40, price: 690 },
      { kg: 50, price: 840 },
    ],
  },
  {
    id: "mn-501",
    name: "Chelated Mineral Mixture",
    brand: "VetiCare",
    category: "minerals",
    image: mineralImg,
    inStock: true,
    sizes: [
      { kg: 5, price: 320 },
      { kg: 25, price: 1320 },
    ],
  },
  {
    id: "mn-502",
    name: "Cattle Lick Block",
    brand: "GreenValley",
    category: "minerals",
    image: mineralImg,
    inStock: true,
    sizes: [{ kg: 3, price: 210 }],
  },
  {
    id: "mn-503",
    name: "Rumen Boost Supplement",
    brand: "VetiCare",
    category: "minerals",
    image: mineralImg,
    inStock: true,
    sizes: [
      { kg: 5, price: 640 },
      { kg: 25, price: 2980 },
    ],
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const productsIn = (slug: string) => products.filter((p) => p.category === slug);
export const priceOf = (id: string, kg: number) =>
  getProduct(id)?.sizes.find((s) => s.kg === kg)?.price ?? 0;

export type OrderStatus = "delivered" | "in-transit" | "processing" | "cancelled";

export type Order = {
  id: string;
  date: string;
  status: OrderStatus;
  total: number;
  lines: { productId: string; kg: number; qty: number }[];
};

export const orders: Order[] = [
  {
    id: "ORD-24815",
    date: "28 Jul 2026",
    status: "in-transit",
    total: 13880,
    lines: [
      { productId: "cf-101", kg: 50, qty: 8 },
      { productId: "mn-501", kg: 25, qty: 3 },
    ],
  },
  {
    id: "ORD-24790",
    date: "19 Jul 2026",
    status: "delivered",
    total: 22290,
    lines: [
      { productId: "pf-301", kg: 50, qty: 12 },
      { productId: "gf-201", kg: 50, qty: 5 },
    ],
  },
  {
    id: "ORD-24752",
    date: "08 Jul 2026",
    status: "processing",
    total: 6720,
    lines: [{ productId: "gf-203", kg: 40, qty: 6 }],
  },
  {
    id: "ORD-24690",
    date: "26 Jun 2026",
    status: "cancelled",
    total: 4380,
    lines: [{ productId: "hk-401", kg: 50, qty: 6 }],
  },
];

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
