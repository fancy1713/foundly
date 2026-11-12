import { Breadcrumb, Empty } from "antd";
import { Link, Navigate, useParams } from "react-router-dom";

import ItemInformationCard from "@/components/barang-temuan/ItemInformationCard";
import { barangTemuan } from "@/data/barangTemuan";
import DashboardLayout from "@/layout/DashboardLayout";

const DetailBarangTemuanPage = () => {
  const { id } = useParams<{ id: string }>();
  const item = barangTemuan.find((barang) => barang.id === id);

  if (!id) {
    return <Navigate replace to="/barang-temuan" />;
  }

  return (
    <DashboardLayout>
      <section className="px-2 pb-10">
        <Breadcrumb
          className="foundly-admin-breadcrumb mb-12"
          items={[
            {
              title: <Link to="/barang-temuan">Barang Temuan</Link>,
            },
            {
              title: "Detail Barang Temuan",
            },
          ]}
        />

        {item ? (
          <ItemInformationCard item={item} />
        ) : (
          <div className="rounded-lg bg-white py-24">
            <Empty description="Barang temuan tidak ditemukan" />
          </div>
        )}
      </section>
    </DashboardLayout>
  );
};

export default DetailBarangTemuanPage;
