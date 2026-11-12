import api from "../../api";
import type {
  DetailFoundReportResponse,
  MyFoundReportsResponse,
} from "@/types/barangTemuan";

export const barangTemuanService = {
  getMyFoundReports: async () => {
    const response =
      await api.get<MyFoundReportsResponse>(
        "/items-found/found/me"
      );

    return response.data;
  },

  getAllFoundReports: async () => {
    const response =
      await api.get("/items-found/found");

    return response.data;
  },

  getFoundReportById: async (
  id: number
  ) => {
    const response =
      await api.get<DetailFoundReportResponse>(
        `/items-found/found/${id}`
      );

    return response.data;
  },

  createFoundReport: async (
    formData: FormData
  ) => {
    const response =
      await api.post<DetailFoundReportResponse>(
        "/items-found/found",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
  },
};