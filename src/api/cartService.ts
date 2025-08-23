import type { CartDTO, CartDTOItem } from "../types/cart";
import api from "./axiosClient";

export function findCartByUser() {
  return api.get("/cart");
}
export function addCart(cartItemDTO: CartDTOItem) {
  return api.post("/cart/add", cartItemDTO);
}

export function updateCart(cartItemDTO: CartDTOItem) {
  return api.put("/cart/update", cartItemDTO);
}

export function deleteCartUser(cartItemId: number) {
  return api.delete(`/cart/delete/${cartItemId}`);
}




