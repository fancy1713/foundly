import { Input, Select, DatePicker } from "antd";
import { Search, Filter, CalendarDays } from "lucide-react";

type FilterProps = {
  onSearch: (value: string) => void;
  onStatusChange: (value: string) => void;
  onDateChange: (date: any, dateString: string | null) => void;
};

const VerifikasiFilter = ({ onSearch, onStatusChange, onDateChange }: FilterProps) => {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="w-full md:w-[320px]">
        <Input
          size="large"
          placeholder="Cari pelapor atau penemu..."
          prefix={<Search size={18} className="text-[#A3AED0]" />}
          className="rounded-xl border-gray-200 bg-white"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
        <DatePicker
          size="large"
          onChange={onDateChange}
          placeholder="Tanggal Deteksi"
          className="rounded-xl border-gray-200"
          suffixIcon={<CalendarDays size={18} className="text-[#A3AED0]" />}
        />
        <Select
          size="large"
          defaultValue="semua"
          onChange={onStatusChange}
          className="w-full sm:w-[180px] [&_.ant-select-selector]:rounded-xl"
          suffixIcon={<Filter size={16} className="text-[#A3AED0]" />}
          options={[
            { value: "semua", label: "Semua Status" },
            { value: "cocok", label: "Cocok (>80%)" },
            { value: "evaluasi", label: "Evaluasi (50-79%)" },
            { value: "tidak_cocok", label: "Tidak Cocok (<50%)" },
          ]}
        />
      </div>
    </div>
  );
};

export default VerifikasiFilter;