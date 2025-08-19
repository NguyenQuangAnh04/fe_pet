import type { ProductDTO2 } from "../types/product";
import api from "./axiosClient";

const findAllProduct = () => {
  return api.get("/product");
};
const addProduct = async (
  cateId: number,
  productDTO: ProductDTO2,
  images: File[]
) => {
  const formData = new FormData();
  formData.append("productDTO", JSON.stringify(productDTO));
  images.forEach((file) => formData.append("image", file));
  console.log(productDTO);

  return await api.post(`/product/add/${cateId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

const updateProduct = async (
  id: number,
  productDTO: ProductDTO2,
  images: File[]
) => {
  const formData = new FormData();
  formData.append("productDTO", JSON.stringify(productDTO));
  images.forEach((file) => formData.append("image", file));
  console.log(productDTO);

  return await api.put(`/product/update/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

const deleteProduct = (id: number) => {
  return api.delete(`/product/delete/${id}`);
};
export { findAllProduct, addProduct, updateProduct, deleteProduct };

