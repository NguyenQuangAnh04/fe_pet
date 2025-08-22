import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CategoriesDTO } from "../../types/category";
import {
  addCategory,
  deleteCategory,
  findAllCategory,
  updateCategory,
} from "../../api/categoryService";
import { toast } from "react-toastify";
type CategoryPage = {
  content: CategoriesDTO[];
  totalPages: number;
};
type UseQueryCategoryProps = {
  name?: string;
  page?: number;
};
export function useQueryCategory({
  page = 0,
  name = "",
}: UseQueryCategoryProps) {
  return useQuery<CategoryPage>({
    queryKey: ["category", page, name],
    queryFn: async () => {
      const res = await findAllCategory(page, name);
      const data = res.data.data;
      return { content: data.content, totalPages: data.totalPages };
    },
  });
}
type CategoryAddParams = {
  categoryDTO: CategoriesDTO;
  image: File;
};

type CategoryUpdateParams = {
  categoryDTO: CategoriesDTO;
  image?: File;
  id: number;
};
export function useAddCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ categoryDTO, image }: CategoryAddParams) => {
      return await addCategory(categoryDTO, image);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
      toast.success("Thêm danh mục thành công");
    },
    onError: () => {
      toast.error("Thêm danh mục thất bại");
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, categoryDTO, image }: CategoryUpdateParams) => {
      return await updateCategory(id, categoryDTO, image);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
      toast.success("Cập nhật sản phẩm thành công");
    },
    onError: () => {
      toast.error("Cập nhật sản phẩm thất bại");
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (cateId: number) => {
      return await deleteCategory(cateId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
      toast.success("Xóa sản phẩm thành công");
    },
    onError: () => {
      toast.error("Xóa sản phẩm thất bại");
    },
  });
}

export function useQueryAllCategory() {
  return useQuery<CategoriesDTO[]>({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await findAllCategory();
      return res.data.data.content;
    },
  });
}
