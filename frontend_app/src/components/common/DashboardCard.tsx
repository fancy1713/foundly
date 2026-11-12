import type { ReactNode } from "react";

interface DashboardCardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

const DashboardCard = ({
  title,
  children,
  className = "",
}: DashboardCardProps) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-sm p-6 ${className}`}
    >
      {title && (
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          {title}
        </h3>
      )}

      {children}
    </div>
  );
};

export default DashboardCard;