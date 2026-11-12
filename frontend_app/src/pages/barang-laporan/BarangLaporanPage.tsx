import { Button, Dropdown, Input, Space, Tag } from "antd";
import type { MenuProps } from "antd";
import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";

import BarangLaporanTable from "@/components/barang-laporan/BarangLaporanTable";
import DashboardLayout from "@/layout/DashboardLayout";
import { useGetAllLostReportsQuery } from "@/hooks/queries/admin/useBarangLaporanQueries";
import { kategoriBarangLaporan } from "@/data/barangLaporan";
import type { BarangLaporan } from "@/types/barangLaporan";

const dateOptions = ["27-03-2026", "11-04-2026", "21-03-2026", "15-04-2026"];
const { data } = useGetAllLostReportsQuery();

const BarangLaporanPage = () => {
  const [activeCategory, setActiveCategory] = useState("hoodie");
  const [activeDate, setActiveDate] = useState("27-03-2026");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Newest");

  const categoryItems = useMemo<MenuProps["items"]>(
    () =>
      kategoriBarangLaporan.map((category) => ({
        key: category,
        label: category,
        onClick: () => setActiveCategory(category.toLowerCase()),
      })),
    []
  );

  const dateItems = useMemo<MenuProps["items"]>(
    () =>
      dateOptions.map((date) => ({
        key: date,
        label: date,
        onClick: () => setActiveDate(date),
      })),
    []
  );

  const sortItems = useMemo<MenuProps["items"]>(
    () => [
      {
        key: "Newest",
        label: "Newest",
        onClick: () => setSort("Newest"),
      },
      {
        key: "Oldest",
        label: "Oldest",
        onClick: () => setSort("Oldest"),
      },
    ],
    []
  );

  const filteredItems = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const nextItems =
  (data?.data || []).filter(
    (item: BarangLaporan) => {
      const categoryFilter =
        activeCategory && activeCategory !== "hoodie"
          ? item.kategori.toLowerCase() === activeCategory
          : true;
      const dateFilter =
    activeDate
      ? item.tgl_hilang === activeDate
      : true;

const searchFilter =
  normalizedSearch
    ? `${item.nama_barang}
       ${item.kategori}
       ${item.lokasi_hilang}`
        .toLowerCase()
        .includes(normalizedSearch)
    : true;
      return categoryFilter && dateFilter && searchFilter;
    });

    return [...nextItems].sort((first, second) => {
      const firstDate = first.tgl_hilang.split("-").reverse().join("-");
      const secondDate = second.tgl_hilang.split("-").reverse().join("-");

      return sort === "Newest"
        ? secondDate.localeCompare(firstDate)
        : firstDate.localeCompare(secondDate);
    });
  }, [activeCategory, activeDate, search, sort]);

  const tableItems = filteredItems;

  return (
    <DashboardLayout>
      <section className="px-2 pb-10">
        <h2 className="mb-12 mt-0 text-2xl font-semibold text-[#4d4d4d]">
          Barang Laporan
        </h2>

        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-6 border-b border-[#bfbfbf] pb-4">
            <div className="flex flex-wrap items-center gap-7 text-sm text-[#4d4d4d]">
              <span>Filter:</span>
              <Dropdown menu={{ items: categoryItems }} trigger={["click"]}>
                <button className="foundly-text-action" type="button">
                  Kategori <ChevronDown size={16} />
                </button>
              </Dropdown>
              <Dropdown menu={{ items: dateItems }} trigger={["click"]}>
                <button className="foundly-text-action" type="button">
                  Tanggal <ChevronDown size={16} />
                </button>
              </Dropdown>
              <span className="h-8 w-px bg-[#b9b9b9]" />
            </div>

            <div className="flex flex-wrap items-center gap-5 text-sm text-[#4d4d4d]">
              <SlidersHorizontal size={16} />
              <span>Sort:</span>
              <Dropdown menu={{ items: sortItems }} trigger={["click"]}>
                <button className="foundly-text-action" type="button">
                  {sort} <ChevronDown size={16} />
                </button>
              </Dropdown>
              <span className="h-8 w-px bg-[#b9b9b9]" />
              <Input
                aria-label="Cari barang laporan"
                className="foundly-search-input"
                placeholder="Cari"
                prefix={<Search size={22} strokeWidth={1.7} />}
                value={search}
                variant="borderless"
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
          </div>

          <Space className="mt-6 flex flex-wrap" size={18}>
            {activeCategory ? (
              <Tag
                className="foundly-filter-chip"
                closeIcon={<X size={12} />}
                closable
                onClose={(event) => {
                  event.preventDefault();
                  setActiveCategory("");
                }}
              >
                {activeCategory}
              </Tag>
            ) : null}
            {activeDate ? (
              <Tag
                className="foundly-filter-chip"
                closeIcon={<X size={12} />}
                closable
                onClose={(event) => {
                  event.preventDefault();
                  setActiveDate("");
                }}
              >
                {activeDate}
              </Tag>
            ) : null}
            <Button
              className="foundly-clear-button"
              type="link"
              onClick={() => {
                setActiveCategory("");
                setActiveDate("");
                setSearch("");
              }}
            >
              Clear all
            </Button>
          </Space>
        </div>

        <div className="rounded-md bg-white px-9 py-8">
          <BarangLaporanTable items={tableItems} />
          <p className="mb-0 mt-7 text-right text-xs text-[#777777]">
            Showing {tableItems.length} Result
          </p>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default BarangLaporanPage;
