import type { ProductDTO } from "../types/product";
import api from "./axiosClient";

const findAllProduct = (page?: number, name?: string) => {
  return api.get("/product", {params: {page, name}});
};
const addProduct = async (
  cateId: number,
  productDTO: ProductDTO,
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
  productDTO: ProductDTO,
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

