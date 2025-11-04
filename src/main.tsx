import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.tsx";

// Cấu hình React Query để tối ưu hiệu suất
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 phút - data vẫn fresh trong 5 phút
      gcTime: 10 * 60 * 1000, // 10 phút - giữ cache 10 phút
      refetchOnWindowFocus: false, // Không refetch khi focus window
      refetchOnMount: true, // Chỉ refetch khi mount lần đầu
      retry: 1, // Chỉ retry 1 lần nếu fail
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
