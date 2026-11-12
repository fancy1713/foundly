import { useState, useMemo } from "react";
import BarangTemuanFilter from "./Partials/BarangTemuanFilter";
import BarangTemuanTable from "./Partials/BarangTemuanTable";
import { useGetAllFoundReportsQuery } from "@/hooks/queries/admin/useBarangTemuanQueries";
import type { BarangTemuan } from "@/types/barangTemuan";

const BarangTemuanPage = () => {
  const { data, isLoading } =
    useGetAllFoundReportsQuery();

  const [searchText, setSearchText] =
    useState("");

  const [category, setCategory] =
    useState("semua");

  const [date, setDate] =
    useState<string | null>(null);

  const handleSearch = (
    value: string
  ) => setSearchText(value);

  const handleCategoryChange = (
    value: string
  ) => setCategory(value);

  const handleDateChange = (
    _: any,
    dateString: string | null
  ) => {
    setDate(
      Array.isArray(dateString)
        ? dateString[0]
        : dateString
    );
  };

  const filteredItems = useMemo(() => {
    const items = data?.data || [];

    return items.filter((item: BarangTemuan) => {
      const searchMatch =
        searchText === ""
          ? true
          : item.nama_barang
              .toLowerCase()
              .includes(
                searchText.toLowerCase()
              );

      const categoryMatch =
        category === "semua"
          ? true
          : item.kategori.toLowerCase() ===
            category.toLowerCase();

      const dateMatch =
        !date
          ? true
          : item.tgl_temuan
              .slice(0, 10)
              .includes(date);

      return (
        searchMatch &&
        categoryMatch &&
        dateMatch
      );
    });
  }, [
    data,
    searchText,
    category,
    date,
  ]);

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="mb-6 flex flex-col gap-1">
        <h1 className="m-0 text-[34px] font-bold leading-tight text-[#1B2559]">
          Data Barang Temuan
        </h1>
      </div>

      <BarangTemuanFilter
        onSearch={handleSearch}
        onCategoryChange={
          handleCategoryChange
        }
        onDateChange={
          handleDateChange
        }
      />

      <BarangTemuanTable
        items={filteredItems}
        loading={isLoading}
      />
    </div>
  );
};

export default BarangTemuanPage;