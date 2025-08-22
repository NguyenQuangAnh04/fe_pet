import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
const refreshToken = async () => {
  try {
    const response = await api.post(
      "/auth/refresh-token",
      {},
      { withCredentials: true }
    );
    const newAccessToken = response.data.data.token;
    localStorage.setItem("accessToken", newAccessToken);
    return newAccessToken;
  } catch (err) {
    localStorage.removeItem("accessToken");
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
      try {
        const newToken = await refreshToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
