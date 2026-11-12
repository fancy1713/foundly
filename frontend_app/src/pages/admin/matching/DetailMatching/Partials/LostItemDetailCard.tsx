import { Card, Tag } from "antd";
import { User, Package, MapPin, CalendarDays, FileText } from "lucide-react";
import dayjs from "dayjs";

type LostItemDetailCardProps = {
  data: any;
};

const LostItemDetailCard = ({ data }: LostItemDetailCardProps) => {
  return (
    <Card className="rounded-[20px] border border-gray-100 bg-white p-4 shadow-sm h-full" bordered={false}>
      <div className="flex flex-col gap-5">
        
        {/* Card Title */}
        <div className="flex items-center justify-between border-b border-gray-50 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-[#2B3674]">1. Data Laporan Kehilangan</span>
          </div>
          <Tag color="blue" className="m-0 border-none font-bold rounded-md">BARANG HILANG</Tag>
        </div>

        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center">
          {data.image ? (
            <img src={data.image} alt={data.namaBarang} className="h-full w-full object-cover" />
          ) : (
            <span className="text-sm text-gray-400">Tidak ada foto referensi</span>
          )}
        </div>

        <div className="flex flex-col gap-4 mt-2">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-[#A3AED0] flex items-center gap-1"><User size={12} /> NAMA PELAPOR</span>
            <span className="text-sm font-bold text-[#1B2559] mt-0.5">{data.pelapor}</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-[#A3AED0] flex items-center gap-1"><Package size={12} /> NAMA BARANG</span>
              <span className="text-sm font-bold text-[#1B2559] mt-0.5">{data.namaBarang}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-[#A3AED0] flex items-center gap-1"><FileText size={12} /> KATEGORI</span>
              <span className="text-sm font-bold text-[#1B2559] mt-0.5">{data.kategori}</span>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-xs font-semibold text-[#A3AED0] flex items-center gap-1"><CalendarDays size={12} /> WAKTU KEHILANGAN</span>
            <span className="text-sm font-bold text-[#1B2559] mt-0.5">
              {dayjs(data.tanggal).format("DD MMMM YYYY")} • {data.waktu}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs font-semibold text-[#A3AED0] flex items-center gap-1"><MapPin size={12} /> LOKASI TERAKHIR</span>
            <span className="text-sm font-bold text-[#1B2559] mt-0.5 leading-relaxed">{data.lokasi}</span>
          </div>

          <div className="flex flex-col border-t border-gray-50 pt-3">
            <span className="text-xs font-semibold text-[#A3AED0] flex items-center gap-1"><FileText size={12} /> CIRI FISIK SPESIFIK</span>
            <p className="m-0 text-sm font-medium text-gray-600 mt-1 leading-relaxed whitespace-pre-line bg-gray-55/40 p-3 rounded-lg">
              {data.deskripsi}
            </p>
          </div>
        </div>

      </div>
    </Card>
  );
};

export default LostItemDetailCard;