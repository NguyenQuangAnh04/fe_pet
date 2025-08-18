import { useQuery } from "@tanstack/react-query";
import { findAllProduct } from "../../api/productService";
import type { ProductDTO2 } from "./../../types/product.d";
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
