import api from "@/services/api";
import type { DetailLostReportResponse, MyLostReportsResponse } from "@/types/barangLaporan";

export const barangLaporanService = {
  getMyLostReports: async () => {
    const response = await api.get<MyLostReportsResponse>("/items/lost/me");
    return response.data;
  },

  getAllLostReports: async () => {
  const response =
    await api.get(
      "/items/lost"
    );

  return response.data;
},

  getLostReportById: async (
  id: number
) => {
  const response =
    await api.get<DetailLostReportResponse>(
      `/items/lost/${id}`
    );

  return response.data;
},

  createLostReport: async (formData: FormData) => {
    const response = await api.post<DetailLostReportResponse>("/items/lost", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};

