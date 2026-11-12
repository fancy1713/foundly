import api from "@/services/api";

export const verifikasiService = {
  getPendingVerifications: async () => {
    const response = await api.get("/admin/verifications/pending");
    return response.data;
  },
  getVerificationDetail: async (id: number) => {
    const response = await api.get(`/admin/verifications/${id}`);
    return response.data;
  },
  processVerification: async (payload: { id_pencocokan: number; status_verifikasi: boolean; catatan: string }) => {
    const response = await api.post("/admin/verifications/process", payload);
    return response.data;
  },
  getVerificationHistory: async () => {
    const response = await api.get("/admin/verifications/history");
    return response.data; // Me-return tipe VerifikasiHistoryResponse
  },
  rollbackVerification: async (payload: { id_verifikasi: number; alasan_batal: string }) => {
    const response = await api.put(`/admin/verifications/${payload.id_verifikasi}/rollback`, {
      alasan_batal: payload.alasan_batal
    });
    return response.data;
  },
};