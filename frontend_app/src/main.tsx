import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "antd/dist/reset.css";
import "./index.css";

import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import GlobalAuthWrapper from "./components/auth/GlobalAuthWrapper";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#11998E",
            borderRadius: 8,
          },
        }}
      >
        <BrowserRouter>
          <AuthProvider>
            <GlobalAuthWrapper>
              <App />
            </GlobalAuthWrapper>
          </AuthProvider>
        </BrowserRouter>
      </ConfigProvider>
    </QueryClientProvider>
  </StrictMode>
);
