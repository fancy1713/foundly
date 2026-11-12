import type { FoundItem } from "@/types/item";

export const foundItems: FoundItem[] = [
  {
    id: 1,
    name: "Earphone Wireless",
    description: "Ditemukan pada meja laboratorium.",
    image: "https://picsum.photos/100?1",
    status: "COCOK",
  },
  {
    id: 2,
    name: "Tas Hitam",
    description: "Ditemukan di area parkir kampus.",
    image: "https://picsum.photos/100?2",
    status: "PROSES",
  },
  {
    id: 3,
    name: "Kunci Motor",
    description: "Ditemukan di depan perpustakaan.",
    image: "https://picsum.photos/100?3",
    status: "COCOK",
  },
];

export const verificationData = [
  { month: "Jan", cocok: 2, tidakCocok: 1 },
  { month: "Feb", cocok: 15, tidakCocok: 8 },
  { month: "Mar", cocok: 8, tidakCocok: 4 },
  { month: "Apr", cocok: 5, tidakCocok: 3 },
  { month: "Mei", cocok: 18, tidakCocok: 12 },
  { month: "Jun", cocok: 10, tidakCocok: 15 },
  { month: "Jul", cocok: 5, tidakCocok: 3 },
  { month: "Agu", cocok: 30, tidakCocok: 8 },
];

export const itemStatistics = [
  { month: "Jan", barangTemuan: 3, barangLaporan: 1 },
  { month: "Feb", barangTemuan: 10, barangLaporan: 5 },
  { month: "Mar", barangTemuan: 8, barangLaporan: 4 },
  { month: "Apr", barangTemuan: 12, barangLaporan: 7 },
  { month: "Mei", barangTemuan: 16, barangLaporan: 10 },
  { month: "Jun", barangTemuan: 13, barangLaporan: 9 },
  { month: "Jul", barangTemuan: 7, barangLaporan: 4 },
  { month: "Agu", barangTemuan: 25, barangLaporan: 12 },
];