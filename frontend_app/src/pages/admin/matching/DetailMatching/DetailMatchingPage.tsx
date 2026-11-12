import { useParams, useNavigate } from "react-router-dom";
import { Button, Empty, Spin, Typography } from "antd";
import { ChevronLeft } from "lucide-react";

import MatchScoreHeader from "./Partials/MatchScoreHeader";
import LostItemDetailCard from "./Partials/LostItemDetailCard";
import FoundItemDetailCard from "./Partials/FoundItemDetailCard";
import { useGetVerificationDetailQuery } from "@/hooks/queries/admin/useVerificationQueries";

const { Text } = Typography
const BASE_URL = import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:3000';

const DetailMatchingPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: responseData, isLoading, isError } = useGetVerificationDetailQuery(Number(id));

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] w-full items-center justify-center">
        <Spin size="large" className="text-[#11998E]" />
      </div>
    );
  }

  if (isError || !responseData?.data) {
    return (
      <div className="flex min-h-[60vh] w-full items-center justify-center">
        <Empty description="Data pencocokan tidak ditemukan" />
      </div>
    );
  }

  const matchData = responseData.data;
  const lost = matchData.barang_hilang;
  const found = matchData.barang_temuan;

  console.log(found)

  const formattedLostReport = {
    pelapor: lost.user?.nama,
    namaBarang: lost.nama_barang,
    kategori: lost.kategori,
    tanggal: lost.tgl_hilang,
    waktu: new Date(lost.waktu_hilang).toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' }) + " WIB",
    lokasi: lost.lokasi_hilang,
    deskripsi: lost.deskripsi,
    image: lost.foto_barang ? `${BASE_URL}${lost.foto_barang}` : null,
  };

  const formattedFoundReport = {
    penemu: "Tanpa Nama",
    namaBarang: found.nama_barang,
    kategori: found.kategori,
    tanggal: found.tgl_temuan,
    waktu: new Date(found.waktu_temuan).toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' }) + " WIB",
    lokasi: found.lokasi_temuan,
    deskripsi: found.deskripsi,
    image: found.foto_barang ? `${BASE_URL}${found.foto_barang}` : null,
  };

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-2 duration-500 flex flex-col gap-6">
      
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3 mt-1">
          <Button
            type="text"
            icon={<ChevronLeft size={20} className="text-[#1B2559]" />}
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-gray-100 shadow-sm hover:bg-gray-50"
          />
          <Text className="m-0! text-[26px]! font-bold! leading-none! text-[#1B2559]!">
            Review Validasi Pencocokan
          </Text>
        </div>
      </div>

      <MatchScoreHeader 
        idVerifikasi={matchData.id_pencocokan} 
        skor={matchData.tingkat_kemiripan} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full items-stretch">
        <LostItemDetailCard data={formattedLostReport} />
        <FoundItemDetailCard data={formattedFoundReport} />
      </div>

    </div>
  );
};

export default DetailMatchingPage;