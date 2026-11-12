import { barangTemuanService } from "@/services/public/barang-temuan/barang-temuan.service";
import { useQuery } from "@tanstack/react-query";

export const useGetMyFoundReportsQuery = () => {
  return useQuery({
    queryKey: ["reports", "found", "me"],
    queryFn: barangTemuanService.getMyFoundReports,
    staleTime: 5 * 60 * 1000,
  });
};