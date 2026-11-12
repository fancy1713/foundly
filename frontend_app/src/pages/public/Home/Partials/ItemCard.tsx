import { Tag } from "antd";
import { MapPin, Clock, PackageOpen } from "lucide-react";
import dayjs from "dayjs";

type ItemCardProps = {
  item: any;
};

const BASE_URL = import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:3000';

const ItemCard = ({ item }: ItemCardProps) => {
  const isHilang = item.type === "HILANG";
  const imageSrc = item.foto_barang ? `${BASE_URL}${item.foto_barang}` : null;
  
  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case "PROSES": return "processing";
      case "MENUNGGU": return "warning";
      case "SELESAI": return "success";
      default: return "default";
    }
  };

  return (
    <div
      className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={item.nama_barang}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center text-gray-400">
            <PackageOpen size={40} strokeWidth={1} />
            <span className="mt-2 text-xs">Tanpa Foto</span>
          </div>
        )}

        <div className="absolute left-3 top-3">
          <Tag className="m-0 rounded-md border-none px-3 py-1 font-semibold shadow-sm" color={isHilang ? "error" : "success"}>
            {item.type}
          </Tag>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 text-base font-semibold leading-snug text-gray-800">
            {item.nama_barang}
          </h3>
          <Tag color={getStatusColor(item.status)} className="m-0 h-fit shrink-0 rounded-md border-none px-2 py-0.5 text-[11px] font-bold tracking-wide">
            {item.status}
          </Tag>
        </div>

        <div className="mt-auto flex flex-col gap-2 text-sm text-gray-500">
          <div className="flex items-start gap-2">
            <MapPin size={16} className="mt-0.5 shrink-0 text-gray-400" />
            <span className="line-clamp-1">{isHilang ? item.lokasi_hilang : item.lokasi_temuan}</span>
          </div>
          <div className="flex items-start gap-2">
            <Clock size={16} className="mt-0.5 shrink-0 text-gray-400" />
            <span>{dayjs(item.createdAt).format("DD MMM YYYY • HH:mm")} WIB</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;