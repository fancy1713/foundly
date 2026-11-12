import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/services/admin/dashboard.service";

export const useDashboardStatsQuery =
  () => {
    return useQuery({
      queryKey: ["dashboard-stats"],
      queryFn:
        dashboardService.getStats,
    });
  };