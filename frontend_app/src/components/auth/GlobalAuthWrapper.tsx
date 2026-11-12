import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import AuthModal from "./AuthModal";
import { Spin } from "antd";

const GlobalAuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading, isAuthModalOpen, showAuthModal, hideAuthModal } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      showAuthModal();
    }
  }, [isAuthenticated, isLoading, showAuthModal]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#F9FAFB]">
        <Spin size="large" className="text-[#11998E]" />
      </div>
    );
  }

  return (
    <>
      {children}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={hideAuthModal}
        onSuccess={hideAuthModal}
      />
    </>
  );
};

export default GlobalAuthWrapper;