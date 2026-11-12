import api from "@/services/api";

export const claimService = {
  createClaim: async (
    formData: FormData
  ) => {
    const response =
      await api.post(
        "/claims/process",
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