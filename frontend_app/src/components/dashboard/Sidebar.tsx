import { Menu } from "lucide-react";
import { NavLink } from "react-router-dom";
import { SIDEBAR_ITEMS } from "@/constants/sidebar";

const Sidebar = () => {
  return (
    <aside className="hidden md:flex flex-col items-center w-[110px] min-h-screen bg-white border-r border-[#ececec]">
      <div className="pt-10">
        <Menu
          size={42}
          strokeWidth={1.5}
          className="text-[#444]"
        />
      </div>

      <nav className="flex flex-col gap-16 mt-20">
        {SIDEBAR_ITEMS.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) => `
                transition-all
                ${
                  isActive
                    ? "text-[#11998E]"
                    : "text-gray-400 hover:text-[#11998E]"
                }
              `}
              title={item.label}
            >
              <Icon size={34} />
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
