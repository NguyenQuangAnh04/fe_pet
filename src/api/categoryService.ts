import type { CategoriesDTO } from "../types/category";
import api from "./axiosClient";

const findAllCategory = (page?: number, name?: string) => {
  return api.get("/category", {
    params: { page, name: name && name.trim() !== "" ? name : null },
  });
};

const addCategory = (categoriesDTO: CategoriesDTO, file: File) => {
  const formData = new FormData();
  formData.append("categoriesDTO", JSON.stringify(categoriesDTO));
  formData.append("image", file);
  return api.post("/category/add", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

const updateCategory = (
  id: number,
  categoriesDTO: CategoriesDTO,
  file?: File
) => {
  const formData = new FormData();
  formData.append("categoryDTO", JSON.stringify(categoriesDTO));
  if (file) {
    formData.append("image", file);
  }
  return api.put(`/category/update/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

const deleteCategory = (id: number) => {
  return api.delete(`/category/delete/${id}`);
};
export { findAllCategory, addCategory, updateCategory, deleteCategory };
