import axios from "axios";
import type { userRegister } from "../types/user";

const register = (userRegister: userRegister) => {
  return axios.post("http://localhost:8080/api/auth/register", userRegister);
};

export { register };
