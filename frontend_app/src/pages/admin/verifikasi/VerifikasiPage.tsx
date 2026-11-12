import { useState, useMemo } from "react";
import VerifikasiFilter from "./Partials/VerifikasiFilter";
import VerifikasiTable from "./Partials/VerifikasiTable";
import { useGetVerificationHistoryQuery } from "@/hooks/queries/admin/useVerificationQueries";

const VerifikasiPage = () => {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("semua");
  const [date, setDate] = useState<string | null>(null);

  const { data: responseData, isLoading } = useGetVerificationHistoryQuery();

  const filteredData = useMemo(() => {
    let result = responseData?.data || [];

    if (searchText) {
      const lowerSearch = searchText.toLowerCase();
      result = result.filter((item: any) => 
        item.catatan?.toLowerCase().includes(lowerSearch) ||
        item.admin?.nama?.toLowerCase().includes(lowerSearch)
      );
    }

    if (statusFilter !== "semua") {
      result = result.filter((item: any) => {
        if (statusFilter === "cocok") return item.status_verifikasi === true;
        if (statusFilter === "tidak_cocok") return item.status_verifikasi === false;
        return true;
      });
    }

    return result;
  }, [responseData, searchText, statusFilter]);

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="mb-6 flex flex-col gap-1">
        <h1 className="m-0 text-[34px] font-bold leading-tight text-[#1B2559]">
          Buku Log Verifikasi
        </h1>
        <p className="text-sm text-gray-500">
          Daftar riwayat keputusan pencocokan yang telah dieksekusi oleh petugas.
        </p>
      </div>

      <VerifikasiFilter
        onSearch={setSearchText}
        onStatusChange={setStatusFilter}
        onDateChange={(_, dateString) =>
          setDate(Array.isArray(dateString) ? dateString[0] : dateString)
        }
      />

      <VerifikasiTable
        data={filteredData}
        loading={isLoading}
      />
    </div>
  );
};

export default VerifikasiPage;