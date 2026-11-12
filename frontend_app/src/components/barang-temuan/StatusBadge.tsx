import { Check, RefreshCw } from "lucide-react";
import { memo } from "react";

import type { BarangTemuanStatus } from "@/types/barangTemuan";

type StatusBadgeProps = {
  status: BarangTemuanStatus;
};

const statusClassName: Record<BarangTemuanStatus, string> = {
  MENUNGGU: "bg-[#ffecd3] text-[#b13b12]",
  PROSES: "bg-[#fff4cb] text-[#a77900]",
  COCOK: "bg-[#d9f8e4] text-[#07843e]",
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const Icon = status === "COCOK" ? Check : RefreshCw;

  return (
    <span
      className={`inline-flex min-w-[164px] items-center justify-center gap-2 rounded-lg px-4 py-1.5 text-sm font-semibold ${statusClassName[status]}`}
    >
      <Icon size={16} strokeWidth={2.4} />
      {status}
    </span>
  );
};

export default memo(StatusBadge);
