import axios from "axios";
<<<<<<< HEAD
import type { userLogin, userRegister } from "../types/user";
=======
import type { userRegister, userLogin } from "../types/user";
>>>>>>> 39c1f37345943078520f7fedb0cfd608c9efc8e4

const register = (userRegister: userRegister) => {
  return axios.post("http://localhost:8080/api/auth/register", userRegister);
};

const login = (userLogin: userLogin) => {
<<<<<<< HEAD
  return axios.post("http://localhost:8080/api/auth/login", userLogin, {
    withCredentials: true,
  });
};
export { login, register };
=======
  return axios.post("http://localhost:8080/api/auth/login", userLogin);
};

export { register, login };
>>>>>>> 39c1f37345943078520f7fedb0cfd608c9efc8e4
