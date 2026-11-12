import { Dropdown } from "antd";
import { Plus, Search, PackageOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FloatingActionMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-6 right-6 z-50 md:hidden">
      <Dropdown
        trigger={['click']}
        placement="topLeft"
        menu={{
          items: [
            {
              key: '1',
              label: <span className="font-medium text-red-500 group-hover:text-white">Lapor Kehilangan</span>,
              icon: <Search size={16} className="text-red-500 group-hover:text-white" />,
              onClick: () => navigate('/report-lost-item/create'),
              className: "py-3 px-4 hover:bg-red-500! group",
            },
            {
              key: '2',
              label: <span className="font-medium text-gray-700">Lapor Temuan</span>,
              icon: <PackageOpen size={16} className="text-[#0D9488]" />,
              onClick: () => navigate('/report-found-item/create'),
              className: "py-3 px-4",
            },
          ]
        }}
      >
        <button className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0D9488] text-white shadow-lg shadow-teal-600/30 transition-transform active:scale-95">
          <Plus size={28} strokeWidth={2.5} className="text-white" />
        </button>
      </Dropdown>
    </div>
  );
};

export default FloatingActionMenu;