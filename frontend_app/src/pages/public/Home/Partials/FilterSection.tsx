import { Input, Select } from "antd";
import { Search, Filter } from "lucide-react";

type FilterSectionProps = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  setFilterType: (value: string) => void;
};

const FilterSection = ({ searchTerm, setSearchTerm, setFilterType }: FilterSectionProps) => {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <h2 className="text-xl font-semibold text-gray-800">Daftar Barang Publik</h2>
      <div className="flex w-full gap-3 md:w-auto">
        <Input
          size="large"
          placeholder="Cari nama barang..."
          prefix={<Search size={18} className="text-gray-400" />}
          className="w-full rounded-xl md:w-72"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select
          size="large"
          defaultValue="semua"
          className="w-32 rounded-xl"
          suffixIcon={<Filter size={16} />}
          onChange={(value) => setFilterType(value)}
          options={[
            { value: 'semua', label: 'Semua' },
            { value: 'hilang', label: 'Hilang' },
            { value: 'temuan', label: 'Temuan' },
          ]}
        />
      </div>
    </div>
  );
};

export default FilterSection;