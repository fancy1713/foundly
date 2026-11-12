import { Button } from "antd";
import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import BarangTemuanTable from "@/components/barang-temuan/BarangTemuanTable";
import FilterBar from "@/components/barang-temuan/FilterBar";
import DashboardLayout from "@/layout/DashboardLayout";
import { useGetAllFoundReportsQuery } from "@/hooks/queries/admin/useBarangTemuanQueries";
import type { BarangTemuan } from "@/types/barangTemuan";

const BarangTemuanPage = () => {
  const [activeCategory, setActiveCategory] = useState("");
  const [activeDate, setActiveDate] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Newest");
  const navigate = useNavigate();

  const { data, isLoading,} = useGetAllFoundReportsQuery();

  const filteredItems = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const nextItems = (data?.data || []).filter(
  (item: BarangTemuan) => {
      const matchesCategory = activeCategory
        ? item.kategori.toLowerCase() === activeCategory
        : true;
      const matchesDate = activeDate ? item.tgl_temuan === activeDate : true;
      const matchesSearch = normalizedSearch
        ? `${item.nama_barang} ${item.lokasi_temuan} ${item.kategori}`
            .toLowerCase()
            .includes(normalizedSearch)
        : true;

      return matchesCategory && matchesDate && matchesSearch;
    });

    return [...nextItems].sort((first, second) => {
      const firstTime = first.tgl_temuan.split("-").reverse().join("-");
      const secondTime = second.tgl_temuan.split("-").reverse().join("-");

      return sort === "Newest"
        ? secondTime.localeCompare(firstTime)
        : firstTime.localeCompare(secondTime);
    });
  }, [activeCategory, activeDate, search, sort]);

  return (
    <DashboardLayout>
      <section className="px-2 pb-10">
        <div className="mb-12 flex items-center justify-between gap-6">
          <h2 className="m-0 text-3xl font-semibold text-[#4d4d4d]">
            Barang Temuan
          </h2>
          <Button
            className="foundly-admin-primary"
            icon={<Plus size={22} />}
            type="primary"
            onClick={() => navigate("/barang-temuan/create")}
          >
            Buat Laporan
          </Button>
        </div>

        <FilterBar
          activeCategory={activeCategory}
          activeDate={activeDate}
          search={search}
          sort={sort}
          onCategoryChange={setActiveCategory}
          onClear={() => {
            setActiveCategory("");
            setActiveDate("");
            setSearch("");
          }}
          onDateChange={setActiveDate}
          onSearchChange={setSearch}
          onSortChange={setSort}
        />

        <div className="rounded-md bg-white px-9 py-8">
          <BarangTemuanTable
            items={filteredItems}
            loading={isLoading}
          />
        </div>
      </section>
    </DashboardLayout>
  );
};

export default BarangTemuanPage;
