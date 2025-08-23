import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addCart,
  deleteCartUser,
  findCartByUser,
  updateCart,
} from "../../api/cartService";
import type { CartDTO, CartDTOItem } from "../../types/cart";

export function useQueryCartByUser() {
  return useQuery<CartDTO>({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await findCartByUser();
      return res.data.data;
    },
  });
}

export function useAddCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (cartItemDTO: CartDTOItem) => {
      return await addCart(cartItemDTO);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

export function useUpdateCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (cartItemDTO: CartDTOItem) => {
      return await updateCart(cartItemDTO);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
export function useDeleteCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (cartItemId: number) => {
      return await deleteCartUser(cartItemId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
