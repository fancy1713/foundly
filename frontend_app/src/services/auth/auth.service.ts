import type { LoginDTO, RegisterDTO } from "@/types/auth/auth.type.service";
import api from "../api";
import type { BaseResponse } from "@/types/common";

export const authService = {
  register: async (data: RegisterDTO) => {
    const response = await api.post<BaseResponse<any>>("/auth/register", data);
    return response.data;
  },

  login: async (data: LoginDTO) => {
    const response = await api.post<BaseResponse<{ token: string; user: any }>>("/auth/login", data);
    return response.data;
  },

  getMe: async () => {
    const response = await api.get<BaseResponse<any>>("/users/me");
    return response.data;
  },

};