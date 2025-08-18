import api from "./axiosClient";

const findAllProduct = () => {
  return api.get("/product");
};

export { findAllProduct };
