import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import api from "../api/axiosClient";

type AuthContextType = {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  role: string | null;
  setRole: (role: string | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("accessToken")
  );
  const [role, setRole] = useState<string | null>(null);
  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    } else {
      localStorage.removeItem("accessToken");
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken === null) {
      setRole(null);
      return;
    }
    const fetchRole = async () => {
      try {
        const res = await api.get("/auth/me");
        setRole(res.data.role);
      } catch (err) {
        console.error("Lỗi khi gọi /auth/me:", err);
        setAccessToken(null);
        setRole(null);
      }
    };
    fetchRole();
  }, [accessToken]);
  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken, role, setRole }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
