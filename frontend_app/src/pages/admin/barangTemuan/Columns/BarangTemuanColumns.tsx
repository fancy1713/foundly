import { Tag, Button, Tooltip } from "antd";
import { Eye } from "lucide-react";
import dayjs from "dayjs";
import type { BarangTemuan } from "@/types/barangTemuan";

export const getBarangTemuanColumns = (
  navigate: (path: string) => void
) => [
  {
  title: "NAMA BARANG",
  dataIndex: "nama_barang",
  key: "nama_barang",
  sorter: (
  a: BarangTemuan,
  b: BarangTemuan
) =>
  a.nama_barang.localeCompare(
    b.nama_barang
  ),
  render: (text: string) => (
    <span className="font-bold text-[#1B2559]">
      {text}
    </span>
  ),
},
    {
    title: "KATEGORI",
    dataIndex: "kategori",
    key: "kategori",
    render: (text: string) => (
      <span className="font-medium text-[#A3AED0]">
        {text}
      </span>
    ),
  },
    {
    title: "TANGGAL DITEMUKAN",
    dataIndex: "tgl_temuan",
    key: "tgl_temuan",
    render: (text: string) => (
      <span className="font-medium text-[#A3AED0]">
        {dayjs(text).format(
          "DD MMM YYYY"
        )}
      </span>
    ),
    sorter: (
  a: BarangTemuan,
  b: BarangTemuan
) =>
  new Date(a.tgl_temuan).getTime() -
  new Date(b.tgl_temuan).getTime(),
  },
    {
    title: "LOKASI",
    dataIndex: "lokasi_temuan",
    key: "lokasi_temuan",
    render: (text: string) => (
      <div
        className="
        max-w-[200px]
        truncate
        font-medium
        text-[#A3AED0]
        "
      >
        {text}
      </div>
    ),
  },
  {
    title: "STATUS",
    dataIndex: "status",
    key: "status",
    render: (status: string) => {
    let color = "default";

    if (status === "DISIMPAN")
      color = "processing";

    if (status === "MENUNGGU")
      color = "warning";

    if (status === "DIAMBIL")
      color = "success";

    if (status === "SELESAI")
      color = "default";

    return (
      <Tag
        color={color}
        className="
          m-0
          rounded-md
          border-none
          px-3
          py-1
          font-bold
          tracking-wide
        "
      >
        {status}
      </Tag>
    );
  },
  },
  {
    title: "AKSI",
    key: "aksi",
    render: (_: any, record: any) => (
      <Tooltip title="Lihat Detail">
        <Button
          type="text"
          icon={<Eye size={18} />}
          onClick={() =>
            navigate(
              `/barang-temuan/${record.id_temuan}`
            )
          }
        />
      </Tooltip>
    ),
  },
];