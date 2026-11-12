import { useQuery } from "@tanstack/react-query";
import { barangTemuanService } from "@/services/public/barang-temuan/barang-temuan.service";

export const useGetAllFoundReportsQuery =
  () => {
    return useQuery({
      queryKey: [
        "admin",
        "found-reports",
      ],
      queryFn:
        barangTemuanService.getAllFoundReports,
      staleTime:
        5 * 60 * 1000,
    });
  };

export const useGetFoundReportByIdQuery =
  (id: number) => {
    return useQuery({
      queryKey: [
        "admin",
        "found-report",
        id,
      ],
      queryFn: () =>
        barangTemuanService.getFoundReportById(
          id
        ),
      enabled: !!id,
    });
  };