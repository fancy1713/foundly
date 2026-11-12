import { Check, ChevronDown } from "lucide-react";
import { memo } from "react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type ReportFormSectionProps = {
  title: string;
  description: string;
  Icon: LucideIcon;
  children?: ReactNode;
  completed?: boolean;
  collapsible?: boolean;
};

const ReportFormSection = ({
  title,
  description,
  Icon,
  children,
  completed = false,
  collapsible = false,
}: ReportFormSectionProps) => {
  return (
    <section className="rounded-[20px] bg-white px-8 py-7">
      <div className="flex items-start justify-between gap-6">
        <div className="flex min-w-0 items-start gap-3">
          <Icon className="mt-1 shrink-0 text-[#4d4d4d]" size={22} />
          <div className="min-w-0">
            <h2 className="m-0 text-xl font-medium text-[#333333]">{title}</h2>
            <p className="m-0 mt-1 text-[13px] leading-relaxed text-[#a1a1a1]">
              {description}
            </p>
          </div>
        </div>
        {completed ? (
          <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#22bf44] text-white">
            <Check size={18} strokeWidth={3} />
          </span>
        ) : null}
        {collapsible ? (
          <ChevronDown className="mt-2 shrink-0 text-[#8a8a8a]" size={18} />
        ) : null}
      </div>
      {children ? <div className="mt-6">{children}</div> : null}
    </section>
  );
};

export default memo(ReportFormSection);
