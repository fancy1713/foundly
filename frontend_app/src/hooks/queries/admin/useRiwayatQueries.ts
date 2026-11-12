import { useQuery } from "@tanstack/react-query";
import { riwayatService } from "@/services/admin/riwayat.service";

export const useGetClaimHistoryQuery =
  () => {
    return useQuery({
      queryKey: [
        "admin",
        "claim-history",
      ],
      queryFn:
        riwayatService.getClaimHistory,
    });
  };