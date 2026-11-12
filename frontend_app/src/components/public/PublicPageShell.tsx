import { Avatar, Button } from "antd";
import { ChevronLeft, UserCircle } from "lucide-react";
import type { ReactNode } from "react";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

type PublicPageShellProps = {
  children: ReactNode;
  title?: string;
  showBack?: boolean;
  headerLeft?: ReactNode;
};

const PublicPageShell = ({
  children,
  title,
  showBack = false,
  headerLeft,
}: PublicPageShellProps) => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#eeeeee] text-[#353535]">
      <div className="mx-auto min-h-screen w-full max-w-[1440px] px-10 py-8">
        <header className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            {showBack ? (
              <Button
                aria-label="Kembali"
                className="foundly-icon-button"
                icon={<ChevronLeft size={18} />}
                shape="circle"
                type="text"
                onClick={() => navigate(-1)}
              />
            ) : null}
            {headerLeft}
            {title ? (
              <h1 className="m-0 text-xl font-medium text-[#3f3f3f]">
                {title}
              </h1>
            ) : null}
          </div>
          <Avatar
            className="bg-[#b8b8b8]"
            icon={<UserCircle size={42} strokeWidth={1.8} />}
            size={52}
          />
        </header>
        {children}
      </div>
    </main>
  );
};

export default memo(PublicPageShell);
