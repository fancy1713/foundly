import { Button, Tooltip, Progress } from "antd";
import { Eye } from "lucide-react";
import dayjs from "dayjs";

export const getVerifikasiColumns = (navigate: (path: string) => void) => [
    {
        title: "Barang Hilang",
        dataIndex: "barang_hilang",
        key: "barang_hilang",
        render: (_: any, record: any) => {
            return <div className="flex flex-col">
                <span className="font-bold text-[#1B2559] text-[15px]">
                    {record.barang_hilang?.nama_barang}
                </span>
                <span className="text-xs text-gray-500">ID Laporan: #{record.id_barang_hilang}</span>
            </div>
        }
    },
    {
        title: "Kandidat Temuan",
        key: "barang_temuan",
        render: (_: any, record: any) => {
            return <div className="flex flex-col">
                <span className="font-medium text-[#1B2559]">
                    {record.barang_temuan?.nama_barang || "Tanpa Identitas"}
                </span>
                <span className="text-xs text-gray-500">ID Temuan: #{record.id_temuan}</span>
            </div>
        },
    },
    {
        title: "Tingkat Kemiripan (AI)",
        dataIndex: "tingkat_kemiripan",
        key: "tingkat_kemiripan",
        sorter: (a: any, b: any) => a.tingkat_kemiripan - b.tingkat_kemiripan,
        render: (skor: number) => {
            let strokeColor = "#EE5D50";
            if (skor >= 80) strokeColor = "#05CD99";
            else if (skor >= 50) strokeColor = "#FFB547";

            return (
                <div className="w-[120px]">
                    <Progress
                        percent={skor}
                        size="small"
                        strokeColor={strokeColor}
                        format={(percent) => <span className="text-xs font-bold text-[#1B2559]">{percent}%</span>}
                    />
                </div>
            );
        },
    },
    {
        title: "Tanggal Deteksi",
        dataIndex: "createdAt",
        key: "createdAt",
        sorter: (a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        render: (text: string) => {
            return (
                <span className="font-medium text-[#A3AED0]">
                    {dayjs(text).format("DD MMM YYYY • HH:mm")}
                </span>
            )
        },
    },
    {
        title: "Aksi",
        key: "aksi",
        render: (_: any, record: any) => (
            <Tooltip title="Mulai Proses Verifikasi">
                <Button
                    type="primary"
                    ghost
                    icon={<Eye size={18} />}
                    onClick={() => navigate(`/matching/${record.id_pencocokan}`)}
                    className="flex items-center justify-center rounded-lg border-[#0D9488] text-[#0D9488] hover:bg-[#0D9488] hover:text-white"
                >
                    Cek Detail
                </Button>
            </Tooltip>
        ),
    },
];