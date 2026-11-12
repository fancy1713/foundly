import { Tag, Button, Tooltip } from "antd";
import { Eye } from "lucide-react";
import dayjs from "dayjs";
import type { BarangLaporan } from "@/types/barangLaporan";

export const getBarangLaporanColumns = (
  navigate: (path: string) => void
) => [
  {
    title: "NAMA BARANG",
    dataIndex: "nama_barang",
    key: "nama_barang",
    sorter: (
      a: BarangLaporan,
      b: BarangLaporan
    ) =>
      a.nama_barang.localeCompare(
        b.nama_barang
      ),
    className:
      "font-bold text-[#1B2559] text-[15px]",
  },

  {
    title: "KATEGORI",
    dataIndex: "kategori",
    key: "kategori",
    className:
      "font-medium text-[#A3AED0]",
  },

  {
    title: "PELAPOR",
    key: "pelapor",
    render: (_: any, record: BarangLaporan) => (
      <span className="font-medium text-[#1B2559]">
        {record.user?.nama || "-"}
      </span>
    ),
  },

  {
    title: "TANGGAL LAPORAN",
    dataIndex: "tgl_hilang",
    key: "tgl_hilang",
    sorter: (
      a: BarangLaporan,
      b: BarangLaporan
    ) =>
      new Date(
        a.tgl_hilang
      ).getTime() -
      new Date(
        b.tgl_hilang
      ).getTime(),

    render: (text: string) => (
      <span className="font-medium text-[#A3AED0]">
        {dayjs(text).format(
          "DD MMM YYYY"
        )}
      </span>
    ),
  },

  {
    title: "LOKASI KEHILANGAN",
    dataIndex: "lokasi_hilang",
    key: "lokasi_hilang",

    render: (text: string) => (
      <div
        className="max-w-[180px] truncate font-medium text-[#A3AED0]"
        title={text}
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

      if (status === "PROSES")
        color = "processing";

      if (status === "DITEMUKAN")
        color = "success";

      if (status === "SELESAI")
        color = "default";

      return (
        <Tag
          color={color}
          className="m-0 rounded-md border-none px-3 py-1 font-bold tracking-wide"
        >
          {status}
        </Tag>
      );
    },
  },

  {
    title: "AKSI",
    key: "aksi",

    render: (
      _: any,
      record: BarangLaporan
    ) => (
      <Tooltip title="Lihat Detail">
        <Button
          type="text"
          icon={
            <Eye
              size={20}
              className="text-[#A3AED0] transition-colors hover:text-[#0D9488]"
            />
          }
          onClick={() =>
            navigate(
              `/barang-laporan/${record.id_barang_hilang}`
            )
          }
          className="flex items-center justify-center"
        />
      </Tooltip>
    ),
  },
];