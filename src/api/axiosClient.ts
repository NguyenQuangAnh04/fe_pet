import axios from "axios";
let accessToken = localStorage.getItem("accessToken"); // lưu token ở localStorage

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
  headers: {
    Authorization: accessToken ? `Bearer ${accessToken}` : "",
  },
});

const refreshToken = async () => {
  try {
    const response = await api.post("/auth/refresh-token");
    const newAccessToken = response.data.data.token;
    localStorage.setItem("accessToken", newAccessToken);
    return newAccessToken;
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
      localStorage.removeItem("accessToken");
      originalRequest._retry = true;
      const newToken = await refreshToken();
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default api;
