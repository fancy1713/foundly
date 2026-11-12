import { useMutation, useQueryClient } from "@tanstack/react-query";
import { barangTemuanService } from "@/services/public/barang-temuan/barang-temuan.service";

export const useCreateFoundReportMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => barangTemuanService.createFoundReport(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports", "found", "me"] });
    },
  });
};