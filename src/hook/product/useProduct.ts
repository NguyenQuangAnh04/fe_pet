import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addProduct,
  deleteProduct,
  findAllProduct,
  updateProduct,
} from "../../api/productService";
import type { ProductDTO } from "./../../types/product.d";
import { toast } from "react-toastify";
export type ProductResponse = {
  totalPages: number;
  content: ProductDTO[];
};
type UseQueryProductProps = {
  keyword?: string;
  page?: number;
  categoryId?: number;
  size?: string;
  minPrice?: number | null;
  maxPrice?: number | null;
};
export function useQueryProduct({
  page = 0,
  keyword = "",
  categoryId,
  size,
  minPrice,
  maxPrice,
}: UseQueryProductProps) {
  return useQuery<ProductResponse>({
    queryKey: ["product", page, keyword, categoryId, size, minPrice,maxPrice],
    queryFn: async () => {
      const res = await findAllProduct(
        page,
        keyword,
        categoryId,
        size,
        minPrice,
        maxPrice
      );
      const data = res.data.data;
      return { content: data.content, totalPages: data.totalPages };
    },
  });
}
type AddProductParams = {
  cateId: number;
  productDTO: ProductDTO;
  images: File[];
};
export function useAddProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ cateId, productDTO, images }: AddProductParams) => {
      return await addProduct(cateId, productDTO, images);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] }),
        toast.success("Thêm sản phẩm thành công!");
    },
    onError: (err) => {toast.error(err.message)},
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ cateId, productDTO, images }: AddProductParams) => {
      return await updateProduct(cateId, productDTO, images);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] }),
        toast.success("Cập nhật sản phẩm thành công!");
    },
    onError: (err) => {
      toast.error(err.message);
      console.error(err.message);
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      return await deleteProduct(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] }),
        toast.success("Xóa sản phẩm thành công!");
    },
    onError: (err) => {
      toast.error(err.message);
      console.error(err.message);
    },
  });
}

export function useQueryAllProducts() {
  return useQuery<ProductDTO[]>({
    queryKey: ["product"],
    queryFn: async () => {
      const res = await findAllProduct();
      return res.data.data.content;
    },
  });
}
