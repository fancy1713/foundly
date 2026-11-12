import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth/auth.service";
import type { LoginDTO, RegisterDTO } from "@/types/auth/auth.type.service";


export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (data: LoginDTO) => authService.login(data),
  });
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (data: RegisterDTO) => authService.register(data),
  });
};