import api from "@/services/api";

export const dashboardService = {
  getStats: async () => {
    const response = await api.get(
      "/admin/stats"
    );

    return response.data;
  },
};