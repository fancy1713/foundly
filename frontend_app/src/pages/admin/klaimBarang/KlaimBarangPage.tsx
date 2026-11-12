import { useState, useMemo } from "react";
import KlaimBarangFilter from "./Partials/KlaimBarangFilter";
import KlaimBarangTable from "./Partials/KlaimBarangTable";
import DetailKlaimModal from "./Partials/DetailKlaimModal";
import { useGetClaimHistoryQuery } from "@/hooks/queries/admin/useRiwayatQueries";
import dayjs from "dayjs";

const BASE_URL = import.meta.env.VITE_API_URL?.replace('/api/v1', '') || "http://localhost:3000";

const KlaimBarangPage = () => {
  const { data, isLoading } = useGetClaimHistoryQuery();

  const [searchText, setSearchText] = useState("");
  const [date, setDate] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedKlaim, setSelectedKlaim] = useState<any | null>(null);

  const historyData = useMemo(() => {
    return data?.data?.map((item: any) => ({
      id: item.id_klaim,
      namaPetugas: "Admin Foundly",
      namaPelapor: item.user?.nama || "Tidak diketahui",
      namaBarang: item.barang_temuan?.nama_barang || "Tanpa Nama",
      tanggal: item.waktu_pengambilan,
      waktu: item.waktu_pengambilan,
      status: item.status,
      image: item.bukti_klaim ? `${BASE_URL}${item.bukti_klaim}` : null,
      email: item.user?.email,
      kontak: item.user?.kontak,
      kategori: item.barang_temuan?.kategori,
    })) || [];
  }, [data]);

  const filteredData = useMemo(() => {
    return historyData.filter((item: any) => {
      const matchSearch = 
        item.namaPelapor.toLowerCase().includes(searchText.toLowerCase()) ||
        item.namaBarang.toLowerCase().includes(searchText.toLowerCase());

      const matchDate = date 
        ? dayjs(item.tanggal).format("YYYY-MM-DD") === date 
        : true;

      return matchSearch && matchDate;
    });
  }, [historyData, searchText, date]);

  const handleViewDetail = (record: any) => {
    setSelectedKlaim(record);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedKlaim(null), 300);
  };

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="mb-6 flex flex-col gap-1">
        <p className="m-0 text-[14px] font-medium text-[#707EAE]">
          Pages / Daftar Riwayat
        </p>
        <h1 className="m-0 text-[34px] font-bold leading-tight text-[#1B2559]">
          Riwayat Klaim Barang
        </h1>
      </div>

      <KlaimBarangFilter
        onSearch={setSearchText}
        onDateChange={(_, dateString) => setDate(Array.isArray(dateString) ? dateString[0] : dateString)}
      />

      <KlaimBarangTable
        data={filteredData}
        loading={isLoading}
        onViewDetail={handleViewDetail}
      />

      <DetailKlaimModal
        open={isModalOpen}
        data={selectedKlaim}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default KlaimBarangPage;