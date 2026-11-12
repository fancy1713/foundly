import { useState } from "react";
import BarangLaporanFilter from "./Partials/BarangLaporanFilter";
import BarangLaporanTable from "./Partials/BarangLaporanTable";
import { useGetAllLostReportsQuery } from "@/hooks/queries/admin/useBarangLaporanQueries";


  
const BarangLaporanPage = () => {
    const [searchText, setSearchText] = useState("");
    const [category, setCategory] = useState("semua");
    const [date, setDate] = useState<string | null>(null);
    const { data,isLoading } =useGetAllLostReportsQuery();
    return (
        <div className="w-full animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="mb-6 flex flex-col gap-1">
                <h1 className="m-0 text-[34px] font-bold leading-tight text-[#1B2559]">
                    Data Barang Laporan
                </h1>
            </div>

            <BarangLaporanFilter
                onSearch={setSearchText}
                onCategoryChange={setCategory}
                onDateChange={(_, dateString) => setDate(Array.isArray(dateString) ? dateString[0] : dateString)}
            />

            <BarangLaporanTable
            data={data?.data || []}
            loading={isLoading}
            />
        </div>
    );
};

export default BarangLaporanPage;