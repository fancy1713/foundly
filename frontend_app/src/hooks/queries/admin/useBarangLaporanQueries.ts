import { useQuery } from "@tanstack/react-query";
import { barangLaporanService } from "@/services/public/barang-laporan/barang-laporan.service";

export const useGetAllLostReportsQuery =
  () => {
    return useQuery({
      queryKey: [
        "admin",
        "lost-reports",
      ],
      queryFn:
        barangLaporanService.getAllLostReports,
      staleTime:
        5 * 60 * 1000,
    });
  };

export const useGetLostReportByIdQuery =
  (id: number) => {
    return useQuery({
      queryKey: [
        "admin",
        "lost-report",
        id,
      ],
      queryFn: () =>
        barangLaporanService.getLostReportById(
          id
        ),
      enabled: !!id,
    });
  };