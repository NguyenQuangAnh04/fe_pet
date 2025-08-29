import type { ProductDTO } from "./product";
export interface CartDTO {
  id?: number;
  cartItems: CartDTOItem[];
  createdAt: string;
  totalMoney: number;
  userId: number;
}
export interface CartDTOItem {
  id?: number;
  quantity?: number;
  price?: number;
  totalPrice?: number;
  productId?: number;
  product?: ProductDTO;
  size?: string
}
