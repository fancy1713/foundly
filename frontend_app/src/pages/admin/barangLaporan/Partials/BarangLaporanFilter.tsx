import { Input, Select, DatePicker } from "antd";
import { Search, Filter, CalendarDays } from "lucide-react";

type FilterProps = {
  onSearch: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onDateChange: (date: any, dateString: string | null) => void;
};

const BarangLaporanFilter = ({ onSearch, onCategoryChange, onDateChange }: FilterProps) => {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="w-full md:w-[320px]">
        <Input
          size="large"
          placeholder="Cari laporan kehilangan..."
          prefix={<Search size={18} className="text-[#A3AED0]" />}
          className="rounded-xl border-gray-200 bg-white"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
        <DatePicker
          size="large"
          onChange={onDateChange}
          placeholder="Pilih Tanggal"
          className="rounded-xl border-gray-200"
          suffixIcon={<CalendarDays size={18} className="text-[#A3AED0]" />}
        />
        <Select
          size="large"
          defaultValue="semua"
          onChange={onCategoryChange}
          className="w-full sm:w-[160px] [&_.ant-select-selector]:rounded-xl"
          suffixIcon={<Filter size={16} className="text-[#A3AED0]" />}
          options={[
            { value: "semua", label: "Semua Kategori" },
            { value: "elektronik", label: "Elektronik" },
            { value: "dokumen", label: "Dokumen" },
            { value: "aksesoris", label: "Aksesoris" },
          ]}
        />
      </div>
    </div>
  );
};

export default BarangLaporanFilter;