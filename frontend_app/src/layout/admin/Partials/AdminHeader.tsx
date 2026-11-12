import { Avatar, Dropdown, Button, type MenuProps } from "antd";
import { MenuIcon, LogOut, ShieldCheck } from "lucide-react";

type AdminHeaderProps = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  onLogout: () => void;
};

const AdminHeader = ({ collapsed, setCollapsed, onLogout }: AdminHeaderProps) => {
  const adminData = {
    name: "Petugas Sarpras UNIBI",
    role: "Administrator Sistem",
  };

  const dropdownItems: MenuProps["items"] = [
    {
      key: "logout",
      danger: true,
      icon: <LogOut size={16} />,
      label: "Keluar Dashboard",
      onClick: onLogout,
      className: "px-4 py-2 font-medium",
    },
  ];

  return (
    <header className="sticky top-0 z-40 flex h-20 w-full items-center justify-between border-b border-gray-100 bg-white px-6 shadow-sm">
      
      <div className="flex items-center gap-4">
        <Button
          type="text"
          icon={collapsed ? <MenuIcon size={20} /> : <MenuIcon size={20} />}
          onClick={() => setCollapsed(!collapsed)}
          className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-50 text-gray-600"
        />
        <div className="flex items-center gap-2">
          <span className="hidden text-sm font-semibold tracking-wider text-gray-400 uppercase md:inline">
            Panel Kerja Petugas
          </span>
        </div>
      </div>

      <Dropdown
        menu={{ items: dropdownItems }}
        trigger={["click"]}
        placement="bottomRight"
        arrow={{ pointAtCenter: true }}
      >
        <div className="flex cursor-pointer items-center gap-3 rounded-xl p-2 transition-colors hover:bg-gray-50">
          <div className="hidden flex-col text-right sm:flex">
            <span className="text-[14px] font-semibold text-gray-700">
              {adminData.name}
            </span>
            <span className="text-[12px] text-gray-400 font-medium">
              {adminData.role}
            </span>
          </div>

          <Avatar
            size={40}
            icon={<ShieldCheck size={20} />}
            className="flex items-center justify-center bg-[#0D9488] text-white shadow-sm"
          />
        </div>
      </Dropdown>
    </header>
  );
};

export default AdminHeader;