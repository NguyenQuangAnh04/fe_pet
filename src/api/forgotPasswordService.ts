import axios from "axios";

export const forgotPasswordService = {
  forgotPassword: (email: string) => {
    return axios.post("http://localhost:8080/api/forgot-password", { email });
  },

  resetPassword: (token: string, newPassword: string) => {
    return axios.post("http://localhost:8080/api/reset-password", {
      token,
      newPassword,
    });
  },
};
