import { useMemo, useState } from 'react';
import MatchingFilter from './Partials/MatchingFilter'
import MatchingTable from './Partials/MatchingTable'
import { useGetPendingVerificationsQuery } from '@/hooks/queries/admin/useVerificationQueries';

function MatchingPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("semua");

    const { data: responseData, isLoading } = useGetPendingVerificationsQuery();

    const filteredData = useMemo(() => {
        let result = responseData?.data || [];

        if (searchTerm) {
            const lowerSearch = searchTerm.toLowerCase();
            result = result.filter((item: any) =>
                item.barang_hilang?.nama_barang?.toLowerCase().includes(lowerSearch) ||
                item.barang_temuan?.nama_barang?.toLowerCase().includes(lowerSearch)
            );
        }

        if (statusFilter !== "semua") {
            result = result.filter((item: any) => {
                const skor = item.tingkat_kemiripan;
                if (statusFilter === "cocok") return skor >= 80;
                if (statusFilter === "evaluasi") return skor >= 50 && skor < 80;
                if (statusFilter === "tidak_cocok") return skor < 50;
                return true;
            });
        }

        return result;
    }, [responseData, searchTerm, statusFilter]);

    return (
        <div className="w-full animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="mb-6 flex flex-col gap-1">
                <h1 className="m-0 text-[34px] font-bold leading-tight text-[#1B2559]">
                    Antrean Verifikasi Sistem
                </h1>
                <p className="text-sm text-gray-500">
                    Daftar rekomendasi pencocokan dari sistem AI yang membutuhkan verifikasi manual Anda.
                </p>
            </div>

            <MatchingFilter
                onSearch={setSearchTerm}
                onStatusChange={setStatusFilter}
                onDateChange={(_, dateString) => console.log("Filter tanggal (opsional):", dateString)}
            />

            <MatchingTable
                data={filteredData}
                loading={isLoading}
            />
        </div>
    )
}

export default MatchingPage