import { Button, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Eye } from "lucide-react";
import { memo, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import StatusBadge from "@/components/barang-laporan/StatusBadge";
import type { BarangLaporan } from "@/types/barangLaporan";

type Props = {
  items: BarangLaporan[];
};

const BarangLaporanTable = ({ items }: Props) => {
  const navigate = useNavigate();

  const columns = useMemo<ColumnsType<BarangLaporan>>(
    () => [
      {
        title: "Nama Barang",
        dataIndex: "nama_barang",
        key: "nama_barang",
      },
      {
        title: "Kategori",
        dataIndex: "kategori",
        key: "kategori",
      },
      {
        title: "Lokasi Hilang",
        dataIndex: "lokasi_hilang",
        key: "lokasi_hilang",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        align: "center",
        render: (_, item) => (
          <StatusBadge status={item.status} />
        ),
      },
      {
        title: "Aksi",
        key: "aksi",
        render: (_, item) => (
          <Button
            type="text"
            icon={<Eye size={15} />}
            onClick={() =>
              navigate(
                `/barang-laporan/${item.id_barang_hilang}`
              )
            }
          >
            Detail
          </Button>
        ),
      },
    ],
    [navigate]
  );

  return (
    <Table<BarangLaporan>
      columns={columns}
      dataSource={items}
      pagination={false}
      rowKey="id_barang_hilang"
    />
  );
};

export default memo(BarangLaporanTable);