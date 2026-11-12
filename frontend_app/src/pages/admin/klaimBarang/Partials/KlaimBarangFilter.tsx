import { Input, DatePicker } from "antd";
import { Search, CalendarDays } from "lucide-react";

type FilterProps = {
  onSearch: (value: string) => void;
  onDateChange: (date: any, dateString: string | null) => void;
};

const KlaimBarangFilter = ({ onSearch, onDateChange }: FilterProps) => {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="w-full md:w-[360px]">
        <Input
          size="large"
          placeholder="Cari nama pelapor, petugas, atau barang..."
          prefix={<Search size={18} className="text-[#A3AED0]" />}
          className="rounded-xl border-gray-200 bg-white"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div className="flex w-full sm:w-auto">
        <DatePicker
          size="large"
          onChange={onDateChange}
          placeholder="Filter Tanggal Klaim"
          className="w-full sm:w-[220px] rounded-xl border-gray-200"
          suffixIcon={<CalendarDays size={18} className="text-[#A3AED0]" />}
        />
      </div>
    </div>
  );
};

export default KlaimBarangFilter;