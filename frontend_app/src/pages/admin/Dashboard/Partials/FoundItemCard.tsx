import { useState } from "react";
import { Tag, Button, Spin } from "antd";
import ClaimReportModal, { type ClaimReportData } from "./ClaimReportModal";

import { useGetAllLostReportsQuery } from "@/hooks/queries/admin/useBarangLaporanQueries"; 

const BACKEND_URL = import.meta.env.VITE_API_URL?.replace('/api/v1', '') || "http://localhost:3000";

const FoundItemCard = () => {
  const { data, isLoading } = useGetAllLostReportsQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ClaimReportData | null>(null);

  const items = data?.data?.filter((item: any) => item.status === "DITEMUKAN") || [];

  const handleBuatLaporan = (item: any) => {
    setSelectedItem({
      idBarangHilang: item.id_barang_hilang,
      namaPetugas: "-", // Todo: get user admin and insert the name
      namaPelapor: item.user?.nama || "Tidak diketahui",
      namaBarang: item.nama_barang,
      tanggalKlaim: new Date().toLocaleDateString("id-ID").replace(/\//g, "-"),
      waktuKlaim: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " WIB",
      image: item.foto_barang ? `${BACKEND_URL}${item.foto_barang}` : undefined,
    });
    setIsModalOpen(true);
  };

  const handleSaveKlaim = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <Spin size="large" className="text-[#11998E]" />
      </div>
    );
  }

  return (
    <div className="flex min-h-[320px] flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="m-0 text-lg font-bold text-gray-800">
          Antrean Serah Terima
        </h3>
        <span className="rounded-full bg-[#E8F8F6] px-3 py-1 text-sm font-medium text-[#11998E]">
          {items.length} Menunggu Diambil
        </span>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-1 items-center justify-center text-sm text-gray-400">
          Tidak ada barang yang menunggu diklaim saat ini.
        </div>
      ) : (
        <div className="flex flex-col gap-5 overflow-y-auto pr-1">
          {items.slice(0, 4).map((item: any) => (
            <div
              key={item.id_barang_hilang}
              className="flex items-center gap-4 border-b border-gray-50 pb-4 last:border-b-0 last:pb-0"
            >
              <img
                src={item.foto_barang ? `${BACKEND_URL}${item.foto_barang}` : "/placeholder.png"}
                alt={item.nama_barang}
                className="h-16 w-16 shrink-0 rounded-xl border border-gray-100 object-cover"
              />

              <div className="min-w-0 flex-1">
                <h4 className="m-0 truncate text-[15px] font-semibold text-gray-800">
                  {item.nama_barang}
                </h4>
                <p className="m-0 mt-0.5 line-clamp-2 text-sm text-gray-500">
                  <span className="font-medium text-gray-700">Pelapor:</span> {item.user?.nama || "Tanpa Nama"}
                </p>
              </div>

              <div className="flex shrink-0 flex-col items-end gap-2">
                <Tag color="success" className="m-0 rounded-md border-none px-2.5 py-0.5 font-semibold">
                  SIAP DIAMBIL
                </Tag>
                <Button
                  type="primary"
                  size="small"
                  onClick={() => handleBuatLaporan(item)}
                  className="h-7 rounded-md border-none bg-[#11998E] px-3 text-[12px] font-medium hover:bg-teal-700"
                >
                  Proses Klaim
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ClaimReportModal
        open={isModalOpen}
        claimData={selectedItem}
        onCancel={() => {
          setIsModalOpen(false);
          setSelectedItem(null);
        }}
        onSave={handleSaveKlaim}
      />
    </div>
  );
};

export default FoundItemCard;