import {
  House,
  ClipboardList,
  FileText,
  CheckSquare,
  PackageCheck,
} from "lucide-react";

export const SIDEBAR_ITEMS = [
  {
    label: "Dashboard",
    icon: House,
    path: "/dashboard",
  },
  {
    label: "Barang Temuan",
    icon: ClipboardList,
    path: "/barang-temuan",
  },
  {
    label: "Barang Laporan",
    icon: FileText,
    path: "/barang-laporan",
  },
  {
    label: "Verifikasi",
    icon: CheckSquare,
    path: "/verification",
  },
  {
    label: "Klaim Barang",
    icon: PackageCheck,
    path: "/claim",
  },
] as const;