import { useMutation } from "@tanstack/react-query";
import { claimService } from "@/services/admin/claim.service";

export const useCreateClaimMutation =
  () => {
    return useMutation({
      mutationFn:
        claimService.createClaim,
    });
  };