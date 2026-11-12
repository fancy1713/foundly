import { useState } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import AdminSider from "./Partials/AdminSider";
import AdminHeader from "./Partials/AdminHeader";
import { useAuth } from "@/context/AuthContext";

const { Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuth()

  return (
    <Layout className="min-h-screen bg-[#F4F7FE] font-sans">
      <AdminSider collapsed={collapsed} />
      
      <Layout className="flex flex-col">
        <AdminHeader 
          collapsed={collapsed} 
          setCollapsed={setCollapsed} 
          onLogout={logout} 
        />
        
        <Content className="p-6 md:p-8 max-w-[1600px] w-full mx-auto">
          <Outlet />
        </Content>
      </Layout>

    </Layout>
  );
};

export default AdminLayout;