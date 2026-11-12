import { useParams, useNavigate } from "react-router-dom";
import { Button, Typography, Spin } from "antd";
import { ChevronLeft } from "lucide-react";

import DetailItemInfo from "./Partials/DetailItemInfo";
import DetailItemImage from "./Partials/DetailItemImage";

import {
  useGetFoundReportByIdQuery,
} from "@/hooks/queries/admin/useBarangTemuanQueries";

const { Text } = Typography;

const DetailBarangTemuanPage = () => {
  const { id } =
    useParams<{ id: string }>();

  const navigate =
    useNavigate();

  const {
    data,
    isLoading,
  } =
    useGetFoundReportByIdQuery(
      Number(id)
    );

  const item =
    data?.data;

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

  const detailItem = {
    id: item.id_temuan,
    namaBarang: item.nama_barang,
    kategori: item.kategori,
    tanggal: item.tgl_temuan,
    waktu: item.waktu_temuan,
    lokasi: item.lokasi_temuan,
    deskripsiTambahan: item.deskripsi,
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
              Detail Barang Temuan -
              {" "}
              {detailItem.id}
            </Text>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full">
        <div className="lg:col-span-7 xl:col-span-8 w-full">
          <DetailItemInfo
            item={detailItem}
          />
        </div>

        <div className="lg:col-span-5 xl:col-span-4 w-full">
          <DetailItemImage
            imageUrl={
              detailItem.image
            }
            itemName={
              detailItem.namaBarang
            }
          />
        </div>
      </div>
    </div>
  );
};

export default DetailBarangTemuanPage;