import { useParams, useNavigate } from "react-router-dom";
import { Button, Typography, Spin } from "antd";
import { ChevronLeft } from "lucide-react";

import DetailReportInfo from "./Partials/DetailReportInfo";
import DetailReportImage from "./Partials/DetailReportImage";

import {
  useGetLostReportByIdQuery,
} from "@/hooks/queries/admin/useBarangLaporanQueries";

const { Text } = Typography;

const DetailBarangLaporanPage = () => {
  const { id } =
    useParams<{ id: string }>();

  const navigate =
    useNavigate();

  const {
    data,
    isLoading,
  } =
    useGetLostReportByIdQuery(
      Number(id)
    );

  const item =
    data?.data;
    console.log(item);
console.log(item?.user);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spin size="large" />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="py-20 text-center">
        Data tidak ditemukan
      </div>
    );
  }

  const BACKEND_URL =
    "http://localhost:3000";

  const detailReport = {
    id: item.id_barang_hilang,
    namaBarang: item.nama_barang,
    kategori: item.kategori,
    namaPelapor:
      item.user?.nama ||
      "-",
    nomorKontak:
      item.user?.kontak ||
      "-",
    tanggal: item.tgl_hilang,
    waktu: item.waktu_hilang,
    lokasi: item.lokasi_hilang,
    deskripsiTambahan:
      item.deskripsi,
    status: item.status,
    image: item.foto_barang
      ? `${BACKEND_URL}${item.foto_barang}`
      : null,
  };

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-2 duration-500 flex flex-col gap-6">
      <div className="flex items-center justify-between border-b border-gray-100 pb-5">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3 mt-1">
            <Button
              type="text"
              icon={
                <ChevronLeft
                  size={20}
                  className="text-[#1B2559]"
                />
              }
              onClick={() =>
                navigate(-1)
              }
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-gray-100 shadow-sm hover:bg-gray-50"
            />

            <Text className="m-0! text-[26px]! font-bold! leading-none! text-[#1B2559]!">
              Detail Laporan -
              {" "}
              {detailReport.id}
            </Text>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full">
        <div className="lg:col-span-7 xl:col-span-8 w-full">
          <DetailReportInfo
            item={
              detailReport
            }
          />
        </div>

        <div className="lg:col-span-5 xl:col-span-4 w-full">
          <DetailReportImage
            imageUrl={
              detailReport.image
            }
            itemName={
              detailReport.namaBarang
            }
          />
        </div>
      </div>
    </div>
  );
};

export default DetailBarangLaporanPage;