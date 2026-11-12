import { Button } from "antd";
import { AlertTriangle, HelpCircle, SearchCheck } from "lucide-react";
import { memo } from "react";
import type { LucideIcon } from "lucide-react";

type ReportActionCardVariant = "found" | "lost";

type ReportActionCardProps = {
  variant: ReportActionCardVariant;
  title: string;
  description: string;
  onClick: () => void;
};

const variantConfig: Record<
  ReportActionCardVariant,
  { containerClassName: string; buttonClassName: string; Icon: LucideIcon }
> = {
  found: {
    containerClassName: "bg-white text-[#3f3f3f]",
    buttonClassName: "foundly-primary-button",
    Icon: SearchCheck,
  },
  lost: {
    containerClassName: "bg-[#bf1f24] text-white",
    buttonClassName: "foundly-white-button",
    Icon: AlertTriangle,
  },
};

const ReportActionCard = ({
  variant,
  title,
  description,
  onClick,
}: ReportActionCardProps) => {
  const { containerClassName, buttonClassName, Icon } = variantConfig[variant];
  const isFound = variant === "found";

  return (
    <article
      className={`relative flex h-[170px] w-[292px] flex-col justify-between rounded-lg p-6 shadow-[0_8px_20px_rgba(0,0,0,0.14)] ${containerClassName}`}
    >
      <div>
        <div className="flex items-center gap-3">
          <Icon
            color={isFound ? "#11998e" : "#ffffff"}
            size={28}
            strokeWidth={2}
          />
          <h2 className="m-0 text-lg font-semibold">{title}</h2>
        </div>
        <p
          className={`mt-4 text-[11px] leading-relaxed ${
            isFound ? "text-[#767676]" : "text-white"
          }`}
        >
          {description}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button block className={buttonClassName} onClick={onClick}>
          Laporkan
        </Button>
        {isFound ? (
          <Button
            aria-label="Petunjuk"
            className="foundly-help-button"
            icon={<HelpCircle size={18} />}
            shape="circle"
            type="text"
            onClick={onClick}
          />
        ) : null}
      </div>
    </article>
  );
};

export default memo(ReportActionCard);
