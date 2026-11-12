import { Button, Tag, Tooltip } from "antd";
import { Eye } from "lucide-react";
import dayjs from "dayjs";

export const getVerifikasiColumns = (navigate: (path: string) => void) => [
  {
    title: "Petugas / Admin",
    key: "admin",
    render: (_: any, record: any) => (
      <span className="font-bold text-[#1B2559] text-[14px]">
        {record.admin?.nama || "Admin System"}
      </span>
    ),
  },
  {
    title: "Keputusan Final",
    dataIndex: "status_verifikasi",
    key: "status_verifikasi",
    render: (status: boolean) => (
      <Tag 
        color={status ? "success" : "error"} 
        className="m-0! rounded-md! border-none! px-3! py-1! font-bold! shadow-sm!"
      >
        {status ? "COCOK & DISETUJUI" : "DITOLAK"}
      </Tag>
    ),
  },
  {
    title: "Tanggal Eksekusi",
    dataIndex: "tgl_verfikasi",
    key: "tgl_verfikasi",
    sorter: (a: any, b: any) => new Date(a.waktu_verifikasi).getTime() - new Date(b.waktu_verifikasi).getTime(),
    render: (_: any, record: any) => (
      <span className="font-medium text-[#A3AED0]">
        {dayjs(record.waktu_verifikasi).format("DD MMM YYYY • HH:mm")}
      </span>
    ),
  },
  {
    title: "Aksi",
    key: "aksi",
    render: (_: any, record: any) => (
      <Tooltip title="Lihat Dokumen Verifikasi & Rollback">
        <Button
          type="primary"
          ghost
          icon={<Eye size={18} />}
          onClick={() => navigate(`/verifikasi/history/${record.id_verifikasi}`)}
          className="flex items-center justify-center rounded-lg border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
        >
          Lihat Log
        </Button>
      </Tooltip>
    ),
  },
];