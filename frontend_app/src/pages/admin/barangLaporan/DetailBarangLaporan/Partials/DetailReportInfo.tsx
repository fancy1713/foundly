import { Card, Tag } from "antd";
import { ClipboardList, Tag as TagIcon, MapPin, CalendarDays, FileText, User } from "lucide-react";
import dayjs from "dayjs";

type DetailReportInfoProps = {
    item: any;
};

const DetailReportInfo = ({ item }: DetailReportInfoProps) => {
    const getStatusColor = (status: string) => {
        if (status === "DITEMUKAN") return "success";
        if (status === "SELESAI") return "default";
        return "processing";
    };

    return (
        <Card className="w-full rounded-[20px] border border-gray-100 bg-white p-2 shadow-[0px_18px_40px_rgba(112,144,176,0.04)]" bordered={false}>
            <div className="flex flex-col gap-6 p-4">

                <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF8EB] text-[#FFB547]">
                            <ClipboardList size={20} />
                        </div>
                        <h3 className="m-0 text-lg font-bold text-[#1B2559]">Informasi Laporan Kehilangan</h3>
                    </div>
                    <Tag color={getStatusColor(item.status)} className="m-0 rounded-md border-none px-3 py-1 font-bold">
                        {item.status}
                    </Tag>
                </div>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">

                    <div className="flex flex-col gap-1">
                        <span className="text-[13px] font-semibold text-[#A3AED0] flex items-center gap-1.5"><ClipboardList size={14} /> NAMA BARANG</span>
                        <span className="text-[16px] font-bold text-[#1B2559]">{item.namaBarang}</span>
                    </div>

                    <div className="flex flex-col gap-1">
                        <span className="text-[13px] font-semibold text-[#A3AED0] flex items-center gap-1.5"><TagIcon size={14} /> KATEGORI</span>
                        <span className="text-[16px] font-bold text-[#1B2559]">{item.kategori}</span>
                    </div>

                    <div className="flex flex-col gap-1 sm:col-span-2">
                        <span className="text-[13px] font-semibold text-[#A3AED0] flex items-center gap-1.5"><User size={14} /> DATA PELAPOR</span>
                        <span className="text-[16px] font-bold text-[#1B2559]">{item.namaPelapor} <span className="text-[#A3AED0] font-medium ml-2">({item.nomorKontak})</span></span>
                    </div>

                    <div className="flex flex-col gap-1 sm:col-span-2">
                        <span className="text-[13px] font-semibold text-[#A3AED0] flex items-center gap-1.5"><CalendarDays size={14} /> PERKIRAAN WAKTU KEHILANGAN</span>
                        <span className="text-[16px] font-bold text-[#1B2559]">{dayjs(item.tanggal).format("DD MMMM YYYY")} • {item.waktu}</span>
                    </div>

                    <div className="flex flex-col gap-1 sm:col-span-2">
                        <span className="text-[13px] font-semibold text-[#A3AED0] flex items-center gap-1.5"><MapPin size={14} /> LOKASI TERAKHIR TERLIHAT</span>
                        <span className="text-[16px] font-bold text-[#1B2559] leading-relaxed">{item.lokasi}</span>
                    </div>

                    <div className="flex flex-col gap-1 sm:col-span-2 border-t border-gray-50 pt-4">
                        <span className="text-[13px] font-semibold text-[#A3AED0] flex items-center gap-1.5"><FileText size={14} /> DESKRIPSI CIRI-CIRI BARANG</span>
                        <p className="m-0 text-[15px] font-medium text-[#475569] leading-relaxed mt-1 whitespace-pre-line">
                            {item.deskripsiTambahan}
                        </p>
                    </div>

                </div>
            </div>
        </Card>
    );
};

export default DetailReportInfo;