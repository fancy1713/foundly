import api from "@/services/api";

export const riwayatService = {
  getClaimHistory: async () => {
    const response =
      await api.get(
        "/claims/history"
      );

    return response.data;
  },
};