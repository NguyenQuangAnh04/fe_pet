import axios from "axios";
import type { userLogin, userRegister } from "../types/user";
import api from "./axiosClient";

const register = (userRegister: userRegister) => {
  return axios.post("http://localhost:8080/api/auth/register", userRegister);
};

const login = (userLogin: userLogin) => {
  return axios.post("http://localhost:8080/api/auth/login", userLogin, {
    withCredentials: true,
  });
};

const logout = () => {
  return api.post("/auth/logout");
}
export { login, register, logout };
