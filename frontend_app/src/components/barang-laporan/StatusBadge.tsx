import { Check, Search, X, RefreshCw } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { memo } from "react";

import type { BarangLaporanStatus } from "@/types/barangLaporan";

type StatusBadgeProps = {
  status: BarangLaporanStatus;
};

const statusConfig: Record<
  BarangLaporanStatus,
  { className: string; label: string; Icon: LucideIcon }
> = {
  PROSES: {
    className: "bg-orange-100 text-orange-600",
    label: "PROSES",
    Icon: RefreshCw,
  },
  DITEMUKAN: {
    className: "bg-blue-100 text-blue-600",
    label: "DITEMUKAN",
    Icon: Search,
  },
  TIDAK_DITEMUKAN: {
    className: "bg-red-100 text-red-600",
    label: "TIDAK DITEMUKAN",
    Icon: X,
  },
  SELESAI: {
    className: "bg-green-100 text-green-600",
    label: "SELESAI",
    Icon: Check,
  },
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const { className, label, Icon } = statusConfig[status];

  return (
    <span
      className={`inline-flex min-w-[154px] items-center justify-center gap-2 rounded-lg px-4 py-1.5 text-xs font-semibold ${className}`}
    >
      <Icon size={14} strokeWidth={2.4} />
      {label}
    </span>
  );
};

export default memo(StatusBadge);
