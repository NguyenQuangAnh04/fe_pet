import axios from "axios";
import type { userLogin, userRegister } from "../types/user";

const register = (userRegister: userRegister) => {
  return axios.post("http://localhost:8080/api/auth/register", userRegister);
};

const login = (userLogin: userLogin) => {
  return axios.post("http://localhost:8080/api/auth/login", userLogin, {
    withCredentials: true,
  });
};
export { login, register };
