import { useMutation, useQueryClient } from "@tanstack/react-query";
import { barangLaporanService } from "@/services/public/barang-laporan/barang-laporan.service";

export const useCreateLostReportMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => barangLaporanService.createLostReport(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports", "lost", "me"] });
    },
  });
};