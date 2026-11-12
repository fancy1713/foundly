import { Layout, Menu, type MenuProps } from "antd";
import { 
  LayoutDashboard, 
  Package, 
  ClipboardList, 
  CheckSquare, 
  FileClock, 
  ListOrdered
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const { Sider } = Layout;

type AdminSiderProps = {
  collapsed: boolean;
};

const AdminSider = ({ collapsed }: AdminSiderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems: MenuProps["items"] = [
    {
      key: "/dashboard",
      icon: <LayoutDashboard size={18} strokeWidth={2} />,
      label: "Dashboard",
      onClick: () => navigate("/admin/dashboard"),
    },
    {
      key: "/barang-temuan",
      icon: <Package size={18} strokeWidth={2} />,
      label: "Barang Temuan",
      onClick: () => navigate("/barang-temuan"),
    },
    {
      key: "/barang-laporan",
      icon: <ClipboardList size={18} strokeWidth={2} />,
      label: "Barang Laporan",
      onClick: () => navigate("/barang-laporan"),
    },
    {
      key: "/matching",
      icon: <CheckSquare size={18} strokeWidth={2} />,
      label: "Hasil Pencocokan",
      onClick: () => navigate("/matching"),
    },
    {
      key: "/verifikasi",
      icon: <ListOrdered size={18} strokeWidth={2} />,
      label: "Hasil Verifikasi",
      onClick: () => navigate("/verifikasi"),
    },
    {
      key: "/klaim-barang",
      icon: <FileClock size={18} strokeWidth={2} />,
      label: "Riwayat Aktivitas",
      onClick: () => navigate("/klaim-barang"),
    },
  ];

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={260}
      className="sticky! top-0! bottom-0! left-0! h-screen! border-r! border-gray-100! bg-white!"
    >
      <div className="flex h-20 items-center justify-center border-b border-gray-50 px-4">
        <img
          src="/unibi-logo.png"
          alt="UNIBI Logo"
          className={`object-contain transition-all duration-300 ${
            collapsed ? "h-10 w-10" : "h-12 w-12"
          }`}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </div>

      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        className="border-none pt-4 px-2 [&_.ant-menu-item-selected]:bg-teal-50 [&_.ant-menu-item-selected]:text-[#0D9488]"
      />
    </Sider>
  );
};

export default AdminSider;