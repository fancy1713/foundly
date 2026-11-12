import { CheckCircle, RefreshCw, SearchCheck } from "lucide-react";
import { memo } from "react";
import type { PublicReportStatus } from "@/data/publicReports";
import type { LucideIcon } from "lucide-react";

type ReportStatusBadgeProps = {
  status: PublicReportStatus;
};

const statusConfig: Record<
  PublicReportStatus,
  { className: string; Icon: LucideIcon }
> = {
  PROSES: {
    className: "bg-[#fdebd5] text-[#bd4d14]",
    Icon: RefreshCw,
  },
  DITEMUKAN: {
    className: "bg-[#e1f5ef] text-[#11998e]",
    Icon: SearchCheck,
  },
  SELESAI: {
    className: "bg-[#e7f5df] text-[#2d9d42]",
    Icon: CheckCircle,
  },
};

const ReportStatusBadge = ({ status }: ReportStatusBadgeProps) => {
  const { className, Icon } = statusConfig[status];

  return (
    <span
      className={`inline-flex min-w-[142px] items-center justify-center gap-2 rounded-md px-3 py-1 text-xs font-semibold ${className}`}
    >
      <Icon size={15} strokeWidth={2.3} />
      {status}
    </span>
  );
};

export default memo(ReportStatusBadge);
