import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

const refreshToken = async () => {
  try {
    await api.post("/auth/refresh-token");
  } catch (err) {
    window.location.href = "/login";
    return Promise.reject(err);
  }
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 403 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      await refreshToken();
      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);
export default api;