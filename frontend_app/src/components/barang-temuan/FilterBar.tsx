import { Button, Dropdown, Input, Space, Tag } from "antd";
import type { MenuProps } from "antd";
import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";
import { memo, useMemo } from "react";

import { kategoriBarangTemuan } from "@/data/barangTemuan";

type FilterBarProps = {
  activeCategory: string;
  activeDate: string;
  search: string;
  sort: string;
  onCategoryChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onClear: () => void;
};

const dateOptions = ["27-03-2026", "21-03-2026", "11-04-2026", "27-04-2026"];

const FilterBar = ({
  activeCategory,
  activeDate,
  search,
  sort,
  onCategoryChange,
  onDateChange,
  onSearchChange,
  onSortChange,
  onClear,
}: FilterBarProps) => {
  const categoryItems = useMemo<MenuProps["items"]>(
    () =>
      kategoriBarangTemuan.map((category) => ({
        key: category,
        label: category,
        onClick: () => onCategoryChange(category.toLowerCase()),
      })),
    [onCategoryChange]
  );

  const dateItems = useMemo<MenuProps["items"]>(
    () =>
      dateOptions.map((date) => ({
        key: date,
        label: date,
        onClick: () => onDateChange(date),
      })),
    [onDateChange]
  );

  const sortItems = useMemo<MenuProps["items"]>(
    () => [
      {
        key: "Newest",
        label: "Newest",
        onClick: () => onSortChange("Newest"),
      },
      {
        key: "Oldest",
        label: "Oldest",
        onClick: () => onSortChange("Oldest"),
      },
    ],
    [onSortChange]
  );

  return (
    <div className="mb-8">
      <div className="flex flex-wrap items-center justify-between gap-6 border-b border-[#bfbfbf] pb-4">
        <div className="flex flex-wrap items-center gap-7 text-base text-[#4d4d4d]">
          <span>Filter:</span>
          <Dropdown menu={{ items: categoryItems }} trigger={["click"]}>
            <button className="foundly-text-action" type="button">
              Kategori <ChevronDown size={18} />
            </button>
          </Dropdown>
          <Dropdown menu={{ items: dateItems }} trigger={["click"]}>
            <button className="foundly-text-action" type="button">
              Tanggal <ChevronDown size={18} />
            </button>
          </Dropdown>
          <span className="h-10 w-px bg-[#b9b9b9]" />
        </div>

        <div className="flex flex-wrap items-center gap-6 text-base text-[#4d4d4d]">
          <SlidersHorizontal size={21} />
          <span>Sort:</span>
          <Dropdown menu={{ items: sortItems }} trigger={["click"]}>
            <button className="foundly-text-action" type="button">
              {sort} <ChevronDown size={18} />
            </button>
          </Dropdown>
          <span className="h-10 w-px bg-[#b9b9b9]" />
          <Input
            aria-label="Cari barang temuan"
            className="foundly-search-input"
            placeholder="Cari"
            prefix={<Search size={27} strokeWidth={1.7} />}
            value={search}
            variant="borderless"
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>
      </div>

      <Space className="mt-6 flex flex-wrap" size={18}>
        {activeCategory ? (
          <Tag
            className="foundly-filter-chip"
            closeIcon={<X size={13} />}
            closable
            onClose={(event) => {
              event.preventDefault();
              onCategoryChange("");
            }}
          >
            {activeCategory}
          </Tag>
        ) : null}
        {activeDate ? (
          <Tag
            className="foundly-filter-chip"
            closeIcon={<X size={13} />}
            closable
            onClose={(event) => {
              event.preventDefault();
              onDateChange("");
            }}
          >
            {activeDate}
          </Tag>
        ) : null}
        <Button className="foundly-clear-button" type="link" onClick={onClear}>
          Clear all
        </Button>
      </Space>
    </div>
  );
};

export default memo(FilterBar);
