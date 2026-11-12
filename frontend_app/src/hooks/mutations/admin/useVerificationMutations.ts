import { verifikasiService } from "@/services/admin/verification.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useProcessVerificationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: verifikasiService.processVerification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "verifications", "pending"] });
    },
  });
};

export const useRollbackVerificationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: verifikasiService.rollbackVerification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "verifications", "history"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "verifications", "pending"] });
    },
  });
};