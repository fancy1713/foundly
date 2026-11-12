import { Navigate, Route, Routes } from "react-router-dom";

import PublicLayout from "@/layout/public/PublicLayout";
import AdminLayout from "@/layout/admin/AdminLayout";

import LandingPage from "@/pages/public/Home/LandingPage";
import ReportHistoryPage from "@/pages/public/ReportHistoryPage";
import CreateLostItem from "@/pages/public/LostItem/CreateLostItem";

import CreateBarangTemuanPage from "@/pages/barang-temuan/CreateBarangTemuanPage";
import CreateFoundItem from "@/pages/public/FoundItem/CreateFoundItem";
import Dashboard from "@/pages/admin/Dashboard/Dashboard";
import BarangTemuanPage from "@/pages/admin/barangTemuan/BarangTemuanPage";
import DetailBarangTemuanPage from "@/pages/admin/barangTemuan/DetailBarangTemuan/DetailBarangTemuanPage";
import BarangLaporanPage from "@/pages/admin/barangLaporan/BarangLaporanPage";
import DetailBarangLaporanPage from "@/pages/admin/barangLaporan/DetailBarangLaporan/DetailBarangLaporanPage";
import VerifikasiPage from "@/pages/admin/verifikasi/VerifikasiPage";
import KlaimBarangPage from "@/pages/admin/klaimBarang/KlaimBarangPage";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import MatchingPage from "@/pages/admin/matching/MatchingPage";
import DetailMatchingPage from "@/pages/admin/matching/DetailMatching/DetailMatchingPage";
import DetailRiwayatPage from "@/pages/admin/verifikasi/DetailRiwayat/DetailRiwayatPage";

const AppRoutes = () => {
  return (
    <Routes>

      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/report-lost-item/create" element={<CreateLostItem />} />
        <Route path="/report-found-item/create" element={<CreateFoundItem />} />
        <Route path="/report-history" element={<ReportHistoryPage />} />
      </Route>

      {/* NOTES: gunakan path="/admin" di Route bawah ini agar prefix URL nya rapih (contoh: /admin/dashboard) */}
      <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />

          <Route path="/barang-temuan" element={<BarangTemuanPage />} />
          <Route path="/barang-temuan/create" element={<CreateBarangTemuanPage />} />
          <Route path="/barang-temuan/:id" element={<DetailBarangTemuanPage />} />

          <Route path="/barang-laporan" element={<BarangLaporanPage />} />
          <Route path="/barang-laporan/:id" element={<DetailBarangLaporanPage />} />

          <Route path="/matching" element={<MatchingPage />} />
          <Route path="/matching/:id" element={<DetailMatchingPage />} />
          
          <Route path="/verifikasi" element={<VerifikasiPage />} />
          <Route path="/verifikasi/history/:id" element={<DetailRiwayatPage />} />

          <Route path="/klaim-barang" element={<KlaimBarangPage />} />
        </Route>
      </Route>


      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
};

export default AppRoutes;