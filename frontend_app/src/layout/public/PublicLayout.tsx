import { Outlet } from "react-router-dom";
import PublicHeader from "./PublicHeader";

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans">
      <PublicHeader />

      <main className="mx-auto w-full max-w-[1440px]">
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;