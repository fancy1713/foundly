import { useQuery } from "@tanstack/react-query";
import { authService } from "@/services/auth/auth.service";

export const useGetMeQuery = () => {
    const token = localStorage.getItem("token")

  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: authService.getMe,
    enabled: !!token,
    retry: false, 
  });
};