import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addProduct,
  deleteProduct,
  findAllProduct,
  updateProduct,
} from "../../api/productService";
import type { ProductDTO2 } from "./../../types/product.d";
import { toast } from "react-toastify";
export function useQueryProduct() {
  const { data } = useQuery<ProductDTO2[]>({
    queryKey: ["product"],
    queryFn: async () => {
      const res = await findAllProduct();
      return res.data.data.content ?? [];
    },
  });
  return { data };
}
type AddProductParams = {
  cateId: number;
  productDTO: ProductDTO2;
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
    onError: (err) => toast.error(err.message),
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
