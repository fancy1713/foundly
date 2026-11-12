import { barangLaporanService } from "@/services/public/barang-laporan/barang-laporan.service";
import { useQuery } from "@tanstack/react-query";

export const useGetMyLostReportsQuery = () => {
  return useQuery({
    queryKey: ["reports", "lost", "me"],
    queryFn: barangLaporanService.getMyLostReports,
    staleTime: 5 * 60 * 1000,
  });
};