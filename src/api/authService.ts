import axios from "axios";
import type { userRegister, userLogin } from "../types/user";

const register = (userRegister: userRegister) => {
  return axios.post("http://localhost:8080/api/auth/register", userRegister);
};

const login = (userLogin: userLogin) => {
  return axios.post("http://localhost:8080/api/auth/login", userLogin);
};

export { register, login };
