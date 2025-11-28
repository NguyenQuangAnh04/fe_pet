import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import api from "../api/axiosClient";
import type { AuthDTO } from "../types/auth";

type AuthContextType = {
  user: AuthDTO | null;
  loading: boolean;
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("accessToken")
  );
  const [user, setUser] = useState<AuthDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("AuthContext: accessToken changed", accessToken);
    if (!accessToken) {
      setUser(null);
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      setLoading(true);

      console.log("AuthContext: fetching user info");
      
      try {
        const res = await api.get("/auth/getInfoUser");
        setUser(res.data);
        console.log("AuthContext: fetched user", res.data);
      } catch (err) {
        console.error(err);
        setAccessToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{ user, loading, accessToken, setAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
