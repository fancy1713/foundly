import React, { createContext, useContext, useEffect, useState } from "react";
import { useGetMeQuery } from "@/hooks/queries/useAuthQueries";
import { useQueryClient } from "@tanstack/react-query";
import type { User } from "@/types/user.type";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAuthModalOpen: boolean;
  showAuthModal: () => void;
  hideAuthModal: () => void;
  login: (token: string, userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();

  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const { data: responseData, isLoading: isQueryLoading, isError } = useGetMeQuery();

  const currentUser = user || responseData?.data || null;
  const isAuthenticated = !!currentUser;

  const token = localStorage.getItem("token");
  const isLoading = isQueryLoading || (!!token && !currentUser && !isError);

  useEffect(() => {
    if (responseData?.status && responseData.data) {
      setUser(responseData.data);
    }
  }, [responseData]);

  useEffect(() => {
    if (isError) {
      localStorage.removeItem("token");
      setUser(null);
    }
  }, [isError]);

  const login = (token: string, userData: User) => {
    localStorage.setItem("token", token);
    setUser(userData);
    queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    queryClient.removeQueries({ queryKey: ["auth", "me"] });
  };

  const showAuthModal = () => setIsAuthModalOpen(true);
  const hideAuthModal = () => setIsAuthModalOpen(false);

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        isAuthenticated,
        isLoading,
        isAuthModalOpen,
        showAuthModal,
        hideAuthModal,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth harus digunakan di dalam AuthProvider");
  }
  return context;
};