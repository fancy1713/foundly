import { Button, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Plus } from "lucide-react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import ReportStatusBadge from "@/components/public/ReportStatusBadge";
import PublicPageShell from "@/components/public/PublicPageShell";
import { publicReports } from "@/data/publicReports";
import type { PublicReport } from "@/data/publicReports";

const ReportHistoryPage = () => {
  const navigate = useNavigate();

  const columns = useMemo<ColumnsType<PublicReport>>(
    () => [
      {
        title: "Nama Barang",
        dataIndex: "itemName",
        key: "itemName",
      },
      {
        title: "Nama Pelapor",
        dataIndex: "reporterName",
        key: "reporterName",
      },
      {
        title: "Nomor Telepon",
        dataIndex: "phoneNumber",
        key: "phoneNumber",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        align: "center",
        render: (_, report) => <ReportStatusBadge status={report.status} />,
      },
    ],
    []
  );

  return (
    <PublicPageShell showBack title="Riwayat Kehilangan">
      <section className="mx-auto mt-24 min-h-[640px] max-w-[1180px] rounded-lg bg-white px-11 py-10">
        <div className="mb-10 flex items-start justify-between gap-8">
          <div>
            <h2 className="m-0 text-xl font-medium text-[#4b4b4b]">Pelapor</h2>
            <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-[#aaaaaa]">
              Pantau status laporan Anda secara real-time di bawah ini. Jika
              ingin melaporkan kehilangan barang lainnya, silakan klik tombol
              Buat Laporan.
            </p>
          </div>
          <Button
            className="foundly-create-button"
            icon={<Plus size={18} />}
            type="primary"
            onClick={() => navigate("/report-lost-item/create")}
          >
            Buat Laporan
          </Button>
        </div>
        <Table<PublicReport>
          className="foundly-history-table"
          columns={columns}
          dataSource={publicReports}
          pagination={false}
          rowKey="id"
        />
      </section>
    </PublicPageShell>
  );
};

export default ReportHistoryPage;
