import { useQuery } from "@tanstack/react-query";
import { verifikasiService } from "@/services/admin/verification.service";

export const useGetPendingVerificationsQuery = () => {
  return useQuery({
    queryKey: ["admin", "verifications", "pending"],
    queryFn: verifikasiService.getPendingVerifications,
    refetchInterval: 1000 * 60,
  });
};

export const useGetVerificationDetailQuery = (id: number) => {
  return useQuery({
    queryKey: ["admin", "verifications", "detail", id],
    queryFn: () => verifikasiService.getVerificationDetail(id),
    enabled: !!id,
  });
};

export const useGetVerificationHistoryQuery = () => {
  return useQuery({
    queryKey: ["admin", "verifications", "history"],
    queryFn: verifikasiService.getVerificationHistory,
  });
};