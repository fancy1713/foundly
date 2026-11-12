import { useAuth } from "@/context/AuthContext";
import { Dropdown, Button, type MenuProps } from "antd";
import { LogOut, User, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";

const PublicHeader = () => {
  const { user, isAuthenticated, logout, showAuthModal } = useAuth();

  const userMenu: MenuProps["items"] = [
    {
      key: "profile",
      label: (
        <div className="flex flex-col py-1">
          <span className="font-bold text-[#1B2559]">{user?.nama}</span>
          <span className="text-xs text-[#A3AED0]">{user?.email}</span>
        </div>
      ),
      disabled: true,
    },
    { type: "divider" },
    ...(user?.role === "ADMIN"
      ? [
        {
          key: "dashboard",
          icon: <LayoutDashboard size={16} className="text-[#11998E]" />,
          label: <Link to="/admin/dashboard">Masuk Dashboard Admin</Link>,
          
        },
        { type: "divider" as const },
      ]
      : []),
    {
      key: "logout",
      icon: <LogOut size={16} />,
      label: "Keluar Akun",
      danger: true,
      onClick: logout,
    },
  ];

  return (
    <header className="sticky top-0 z-40 flex h-20 w-full items-center justify-between border-b border-gray-100 bg-white px-8 shadow-sm">
      <div className="flex items-center gap-2">
        <img
          src="/unibi-logo.png"
          alt="UNIBI Logo"
          className="h-10 object-contain"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </div>

      <div>
        {isAuthenticated ? (
          <Dropdown menu={{ items: userMenu }} placement="bottomRight" trigger={["click"]}>
            <Button type="text" className="flex h-12 items-center gap-3 rounded-full border border-gray-100 px-3 hover:bg-gray-50">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8F8F6] text-[#11998E]">
                <User size={16} />
              </div>
              <span className="font-semibold text-[#1B2559]">{user?.nama}</span>
            </Button>
          </Dropdown>
        ) : (
          <Button
            type="primary"
            size="large"
            onClick={showAuthModal}
            className="h-11 rounded-xl border-none bg-[#11998E] px-6 font-semibold shadow-md shadow-teal-500/20 hover:bg-teal-700"
          >
            Masuk / Daftar
          </Button>
        )}
      </div>
    </header>
  );
};

export default PublicHeader;