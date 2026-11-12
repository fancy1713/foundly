import { Tag, Button, Tooltip } from "antd";
import { Eye } from "lucide-react";
import dayjs from "dayjs";

export const getKlaimBarangColumns = (onViewDetail: (record: any) => void) => [
  {
    title: "NAMA PETUGAS",
    dataIndex: "-",
    key: "-",
    className: "font-medium text-[#A3AED0]",
  },
  {
    title: "NAMA PELAPOR",
    dataIndex: "namaPelapor",
    key: "namaPelapor",
    sorter: (a: any, b: any) => a.namaPelapor.localeCompare(b.namaPelapor),
    className: "font-bold text-[#1B2559] text-[15px]",
  },
  {
    title: "BARANG YANG DIKLAIM",
    dataIndex: "namaBarang",
    key: "namaBarang",
    className: "font-medium text-[#1B2559]",
  },
  {
    title: "TANGGAL KLAIM",
    dataIndex: "tanggal",
    key: "tanggal",
    sorter: (a: any, b: any) => new Date(a.tanggal).getTime() - new Date(b.tanggal).getTime(),
    render: (text: string) => (
      <span className="font-medium text-[#A3AED0]">
        {dayjs(text).format("DD MMM YYYY")}
      </span>
    ),
  },
  {
    title: "STATUS",
    dataIndex: "status",
    key: "status",
    render: (status: string) => {
      return (
        <Tag color="success" className="m-0 rounded-md border-none px-3 py-1 font-bold tracking-wide">
          {status}
        </Tag>
      );
    },
  },
  {
    title: "AKSI",
    key: "aksi",
    render: (_: any, record: any) => (
      <Tooltip title="Lihat Bukti Klaim">
        <Button
          type="text"
          icon={<Eye size={20} className="text-[#A3AED0] transition-colors hover:text-[#0D9488]" />}
          onClick={() => onViewDetail(record)}
          className="flex items-center justify-center"
        />
      </Tooltip>
    ),
  },
];