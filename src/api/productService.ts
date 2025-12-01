import axios from "axios";
import type { ProductDTO } from "../types/product";
import api from "./axiosClient";

const findAllProduct = (
  page?: number,
  name?: string,
  categoryId?: number,
  sizeVariant?: string,
  minPrice?: number,
  maxPrice?: number,
  size?: number
) => {
  return api.get("/product", {
    params: { page, name, categoryId, minPrice, maxPrice, sizeVariant, size },
  });
};
const addProduct = async (
  cateId: number,
  productDTO: ProductDTO,
  images: File[]
) => {
  const formData = new FormData();
  formData.append("productDTO", JSON.stringify(productDTO));
  images.forEach((file) => formData.append("image", file));

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

  return await api.put(`/product/update/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

const deleteProduct = (id: number) => {
  return api.delete(`/product/delete/${id}`);
};

const findProductBySlug = (slug: string) => {
  return axios.get(`http://localhost:8080/api/product/product-details/${slug}`);
};
export {
  findAllProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  findProductBySlug,
};
