import { Breadcrumb, Empty } from "antd";
import { useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

import DetailBarangLaporanCard from "@/components/barang-laporan/DetailBarangLaporanCard";
import { barangLaporan } from "@/data/barangLaporan";
import DashboardLayout from "@/layout/DashboardLayout";

const DetailBarangLaporanPage = () => {
  const { id } = useParams<{ id: string }>();

  const report = useMemo(
    () => barangLaporan.find((item) => item.id === id),
    [id]
  );

  if (!id) {
    return <Navigate replace to="/barang-laporan" />;
  }

  return (
    <DashboardLayout>
      <section className="px-2 pb-10">
        <Breadcrumb
          className="foundly-admin-breadcrumb mb-10"
          items={[
            {
              title: <Link to="/barang-laporan">Barang Laporan</Link>,
            },
            {
              title: "Detail Barang Laporan",
            },
          ]}
        />

        {report ? (
          <DetailBarangLaporanCard report={report} />
        ) : (
          <div className="rounded-lg bg-white py-24">
            <Empty description="Barang laporan tidak ditemukan" />
          </div>
        )}
      </section>
    </DashboardLayout>
  );
};

export default DetailBarangLaporanPage;
