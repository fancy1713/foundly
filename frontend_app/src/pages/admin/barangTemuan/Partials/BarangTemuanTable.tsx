import { Table } from "antd";
import { useNavigate } from "react-router-dom";
import { getBarangTemuanColumns } from "../Columns/BarangTemuanColumns";
import type { BarangTemuan } from "@/types/barangTemuan";

type TableProps = {
  items: BarangTemuan[];
  loading?: boolean;
};

const BarangTemuanTable = ({
  items,
  loading = false,
}: TableProps) => {
  const navigate = useNavigate();
  const columns =
    getBarangTemuanColumns(navigate);

  return (
    <div className="overflow-hidden rounded-[20px] bg-white p-6 shadow-[0px_18px_40px_rgba(112,144,176,0.06)]">
      <Table
        columns={columns}
        dataSource={items}
        loading={loading}
        rowKey="id_temuan"
        pagination={{
          pageSize: 10,
          showSizeChanger: false,
          className: "mt-6 mb-0",
        }}
        className="
          [&_.ant-table]:bg-transparent
          [&_.ant-table-thead_th]:bg-[#F8FAFC]
          [&_.ant-table-thead_th]:border-b-[#E2E8F0]
          [&_.ant-table-thead_th]:text-[#A3AED0]
          [&_.ant-table-thead_th]:font-semibold
          [&_.ant-table-thead_th]:text-[13px]
          [&_.ant-table-thead_th]:tracking-wider
          [&_.ant-table-tbody_td]:border-b-[#E2E8F0]
          [&_.ant-table-tbody_tr:last-child_td]:border-b-0
          [&_.ant-table-cell]:py-4
        "
      />
    </div>
  );
};

export default BarangTemuanTable;