import { Button, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Eye } from "lucide-react";
import { memo, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import StatusBadge from "@/components/barang-temuan/StatusBadge";
import type { BarangTemuan } from "@/types/barangTemuan";

type BarangTemuanTableProps = {
  items: BarangTemuan[];
  loading?: boolean;
};

const BarangTemuanTable = ({
  items,
  loading = false,
}: BarangTemuanTableProps) => {
  const navigate = useNavigate();

  const columns = useMemo<ColumnsType<BarangTemuan>>(
    () => [
      {
        title: "Nama Barang",
        dataIndex: "nama_barang",
        key: "nama_barang",
        width: "20%",
      },
      {
        title: "Tanggal Ditemukan",
        dataIndex: "tgl_temuan",
        key: "tgl_temuan",
        width: "20%",
      },
      {
        title: "Lokasi Barang",
        dataIndex: "lokasi_temuan",
        key: "lokasi_temuan",
        ellipsis: true,
        width: "24%",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        align: "center",
        width: "20%",
        render: (_: unknown, item: BarangTemuan) => (
          <StatusBadge status={item.status} />
        ),
      },
      {
        title: "Aksi",
        key: "aksi",
        width: "16%",
        render: (_: unknown, item: BarangTemuan) => (
          <Button
            className="foundly-detail-button"
            icon={<Eye size={17} />}
            type="text"
            onClick={() =>
              navigate(`/barang-temuan/${item.id_temuan}`)
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
    <Table
      loading={loading}
      className="foundly-barang-table"
      columns={columns}
      dataSource={items}
      pagination={false}
      rowKey="id_temuan"
    />
  );
};

export default memo(BarangTemuanTable);