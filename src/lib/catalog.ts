import cattleImg from "@/assets/feed-cattle.jpg";
import goatImg from "@/assets/feed-goat.jpg";
import poultryImg from "@/assets/feed-poultry.jpg";
import mineralImg from "@/assets/feed-mineral.jpg";

export type Category = {
  slug: string;
  name: string;
  items: number;
  icon: "cattle" | "goat" | "poultry" | "supplement" | "mineral";
};

export type Product = {
  id: string;
  name: string;
  brand: string;
  weight: string;
  price: number;
  mrp: number;
  category: string;
  image: string;
  gallery: string[];
  stock: "in" | "low" | "out";
  moq: number;
  description: string;
  benefits: string[];
  nutrition: { label: string; value: string }[];
};

export const dealer = {
  name: "Rajesh Traders",
  contact: "Rajesh Kumar",
  phone: "+91 98765 43210",
  email: "rajesh@rajeshtraders.in",
  gstin: "27AABCR1234M1ZP",
  code: "DLR-10428",
  tier: "Gold Distributor",
  address: "Plot 14, Krishi Market Road, Nashik, Maharashtra 422011",
  since: "2019",
};

export const categories: Category[] = [
  { slug: "cattle-feed", name: "Cattle Feed", items: 24, icon: "cattle" },
  { slug: "goat-feed", name: "Goat Feed", items: 12, icon: "goat" },
  { slug: "poultry-feed", name: "Poultry Feed", items: 18, icon: "poultry" },
  { slug: "supplements", name: "Supplements", items: 9, icon: "supplement" },
  { slug: "minerals", name: "Minerals", items: 7, icon: "mineral" },
];

export const products: Product[] = [
  {
    id: "cf-101",
    name: "Milk Max Dairy Pellet",
    brand: "AgriPro",
    weight: "50 kg",
    price: 1240,
    mrp: 1390,
    category: "cattle-feed",
    image: cattleImg,
    gallery: [cattleImg, mineralImg, goatImg],
    stock: "in",
    moq: 5,
    description:
      "High-energy dairy pellet formulated for lactating cattle. Balanced bypass protein and digestible fibre support consistent milk yield through the full lactation cycle.",
    benefits: [
      "Up to 12% higher milk yield",
      "Improves fat and SNF content",
      "Bypass protein for better feed conversion",
      "Reduces post-calving weight loss",
    ],
    nutrition: [
      { label: "Crude Protein", value: "22% min" },
      { label: "Crude Fat", value: "3.5% min" },
      { label: "Crude Fibre", value: "12% max" },
      { label: "Moisture", value: "11% max" },
      { label: "Calcium", value: "0.9%" },
      { label: "Phosphorus", value: "0.6%" },
    ],
  },
  {
    id: "cf-102",
    name: "Buffalo Power Concentrate",
    brand: "AgriPro",
    weight: "50 kg",
    price: 1180,
    mrp: 1275,
    category: "cattle-feed",
    image: cattleImg,
    gallery: [cattleImg, mineralImg],
    stock: "in",
    moq: 5,
    description:
      "Dense concentrate mash for buffalo herds, blended with oilseed cake and molasses for high palatability.",
    benefits: ["Rich in bypass fat", "Highly palatable mash", "Supports heavy milkers"],
    nutrition: [
      { label: "Crude Protein", value: "20% min" },
      { label: "Crude Fat", value: "4% min" },
      { label: "Crude Fibre", value: "13% max" },
      { label: "Moisture", value: "11% max" },
    ],
  },
  {
    id: "cf-103",
    name: "Calf Starter Crumble",
    brand: "NutriFarm",
    weight: "25 kg",
    price: 890,
    mrp: 960,
    category: "cattle-feed",
    image: cattleImg,
    gallery: [cattleImg, poultryImg],
    stock: "low",
    moq: 4,
    description:
      "Soft crumble starter for calves from 15 days to 3 months, with milk protein and prebiotics for gut health.",
    benefits: ["Early rumen development", "Prebiotic gut support", "Easy to digest crumble"],
    nutrition: [
      { label: "Crude Protein", value: "24% min" },
      { label: "Crude Fat", value: "3% min" },
      { label: "Crude Fibre", value: "8% max" },
      { label: "Moisture", value: "10% max" },
    ],
  },
  {
    id: "gf-201",
    name: "Goat Grow Pellet",
    brand: "NutriFarm",
    weight: "40 kg",
    price: 1050,
    mrp: 1150,
    category: "goat-feed",
    image: goatImg,
    gallery: [goatImg, mineralImg],
    stock: "in",
    moq: 5,
    description:
      "Growth pellet for meat goats and sheep, formulated for faster weight gain with low wastage.",
    benefits: ["Faster daily weight gain", "Low wastage pellet", "Ideal for stall feeding"],
    nutrition: [
      { label: "Crude Protein", value: "18% min" },
      { label: "Crude Fat", value: "3% min" },
      { label: "Crude Fibre", value: "14% max" },
      { label: "Moisture", value: "11% max" },
    ],
  },
  {
    id: "gf-202",
    name: "Sheep & Goat Fattener",
    brand: "GreenValley",
    weight: "40 kg",
    price: 1120,
    mrp: 1240,
    category: "goat-feed",
    image: goatImg,
    gallery: [goatImg],
    stock: "in",
    moq: 5,
    description: "Finishing ration for the last 60 days before sale, high energy and low fibre.",
    benefits: ["High energy finisher", "Improves carcass weight", "Consistent intake"],
    nutrition: [
      { label: "Crude Protein", value: "16% min" },
      { label: "Crude Fat", value: "4% min" },
      { label: "Crude Fibre", value: "11% max" },
      { label: "Moisture", value: "11% max" },
    ],
  },
  {
    id: "pf-301",
    name: "Layer Mash Premium",
    brand: "GreenValley",
    weight: "50 kg",
    price: 1420,
    mrp: 1560,
    category: "poultry-feed",
    image: poultryImg,
    gallery: [poultryImg, mineralImg],
    stock: "in",
    moq: 10,
    description:
      "Complete layer mash with balanced calcium for strong shells and sustained peak egg production.",
    benefits: ["Stronger egg shells", "Longer peak production", "Deep yolk colour"],
    nutrition: [
      { label: "Crude Protein", value: "17% min" },
      { label: "Crude Fat", value: "3.5% min" },
      { label: "Calcium", value: "3.6%" },
      { label: "Moisture", value: "11% max" },
    ],
  },
  {
    id: "pf-302",
    name: "Broiler Finisher Crumble",
    brand: "AgriPro",
    weight: "50 kg",
    price: 1560,
    mrp: 1680,
    category: "poultry-feed",
    image: poultryImg,
    gallery: [poultryImg],
    stock: "out",
    moq: 10,
    description: "Finisher crumble for broilers from day 25 to lifting, optimised for FCR.",
    benefits: ["Best-in-class FCR", "Uniform body weight", "No added antibiotics"],
    nutrition: [
      { label: "Crude Protein", value: "19% min" },
      { label: "Crude Fat", value: "5% min" },
      { label: "Crude Fibre", value: "5% max" },
      { label: "Moisture", value: "11% max" },
    ],
  },
  {
    id: "sp-401",
    name: "Rumen Boost Supplement",
    brand: "VetiCare",
    weight: "5 kg",
    price: 640,
    mrp: 720,
    category: "supplements",
    image: mineralImg,
    gallery: [mineralImg, cattleImg],
    stock: "in",
    moq: 2,
    description:
      "Yeast and enzyme supplement that stabilises rumen pH and improves fibre digestion.",
    benefits: ["Prevents acidosis", "Better fibre digestion", "Improves appetite"],
    nutrition: [
      { label: "Live Yeast", value: "10^9 CFU/g" },
      { label: "Enzyme Blend", value: "2%" },
      { label: "Moisture", value: "8% max" },
    ],
  },
  {
    id: "mn-501",
    name: "Chelated Mineral Mixture",
    brand: "VetiCare",
    weight: "25 kg",
    price: 1320,
    mrp: 1480,
    category: "minerals",
    image: mineralImg,
    gallery: [mineralImg, cattleImg],
    stock: "in",
    moq: 2,
    description:
      "Chelated trace mineral mixture with vitamins A, D3 and E for fertility and immunity.",
    benefits: ["Improves conception rate", "Stronger immunity", "Reduces retained placenta"],
    nutrition: [
      { label: "Calcium", value: "24%" },
      { label: "Phosphorus", value: "12%" },
      { label: "Zinc", value: "9600 mg/kg" },
      { label: "Vitamin A", value: "700000 IU/kg" },
    ],
  },
  {
    id: "mn-502",
    name: "Cattle Lick Block",
    brand: "GreenValley",
    weight: "3 kg",
    price: 210,
    mrp: 245,
    category: "minerals",
    image: mineralImg,
    gallery: [mineralImg],
    stock: "low",
    moq: 12,
    description: "Free-choice mineral lick block for grazing herds, weather resistant.",
    benefits: ["Free-choice mineral intake", "Weather resistant", "No wastage"],
    nutrition: [
      { label: "Salt", value: "45%" },
      { label: "Calcium", value: "8%" },
      { label: "Trace Minerals", value: "Added" },
    ],
  },
];

export const featuredIds = ["cf-101", "pf-301", "mn-501"];
export const frequentIds = ["cf-102", "gf-201", "cf-103", "mn-502"];
export const recentIds = ["pf-301", "cf-101", "sp-401"];

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const byIds = (ids: string[]) =>
  ids.map((id) => getProduct(id)).filter((p): p is Product => Boolean(p));

export type OrderStatus = "delivered" | "in-transit" | "processing" | "cancelled";

export type Order = {
  id: string;
  date: string;
  status: OrderStatus;
  total: number;
  lines: { productId: string; qty: number }[];
  payment: string;
  delivery: string;
  timeline: { label: string; time: string; done: boolean }[];
};

export const orders: Order[] = [
  {
    id: "ORD-24815",
    date: "28 Jul 2026",
    status: "in-transit",
    total: 14680,
    payment: "Credit — 30 days",
    delivery: "01 Aug 2026",
    lines: [
      { productId: "cf-101", qty: 8 },
      { productId: "mn-501", qty: 3 },
    ],
    timeline: [
      { label: "Order placed", time: "28 Jul, 09:12 AM", done: true },
      { label: "Confirmed by plant", time: "28 Jul, 11:40 AM", done: true },
      { label: "Dispatched from Nashik depot", time: "30 Jul, 06:20 AM", done: true },
      { label: "Out for delivery", time: "Expected 01 Aug", done: false },
      { label: "Delivered", time: "—", done: false },
    ],
  },
  {
    id: "ORD-24790",
    date: "19 Jul 2026",
    status: "delivered",
    total: 22540,
    payment: "UPI",
    delivery: "22 Jul 2026",
    lines: [
      { productId: "pf-301", qty: 12 },
      { productId: "gf-201", qty: 5 },
    ],
    timeline: [
      { label: "Order placed", time: "19 Jul, 04:02 PM", done: true },
      { label: "Confirmed by plant", time: "19 Jul, 05:15 PM", done: true },
      { label: "Dispatched", time: "21 Jul, 07:00 AM", done: true },
      { label: "Delivered", time: "22 Jul, 01:35 PM", done: true },
    ],
  },
  {
    id: "ORD-24752",
    date: "08 Jul 2026",
    status: "processing",
    total: 6300,
    payment: "Credit — 30 days",
    delivery: "12 Jul 2026",
    lines: [{ productId: "gf-202", qty: 6 }],
    timeline: [
      { label: "Order placed", time: "08 Jul, 10:22 AM", done: true },
      { label: "Confirmed by plant", time: "08 Jul, 12:05 PM", done: true },
      { label: "Dispatch scheduled", time: "Expected 10 Jul", done: false },
    ],
  },
  {
    id: "ORD-24690",
    date: "26 Jun 2026",
    status: "cancelled",
    total: 4260,
    payment: "UPI",
    delivery: "—",
    lines: [{ productId: "sp-401", qty: 7 }],
    timeline: [
      { label: "Order placed", time: "26 Jun, 03:11 PM", done: true },
      { label: "Cancelled by dealer", time: "26 Jun, 06:44 PM", done: true },
    ],
  },
];

export const getOrder = (id: string) => orders.find((o) => o.id === id);

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
