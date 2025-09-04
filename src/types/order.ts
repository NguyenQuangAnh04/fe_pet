export enum OrderStatus {
  ALL= "",
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  SHIPPING = "SHIPPING",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
}

export enum PaymentMethod {
  COD,
  MOMO,
  ZALOPAY,
  VNPAY,
  CREDIT_CARD,
}

export interface OrderDTO {
  id: number;
  userId?: number;
  fullName?: string;
  phoneNumber?: string;
  totalAmount?: number;
  status?: OrderStatus;
  orderDate?: string;
  note?: string;
  items?: ItemDTO[];
  paymentMethod?: PaymentMethod;
  orderDetailDTO?: OrderDetailDTO[];
  addressDTO?: AddressDTO;
}

export interface OrderDetailDTO {
  id?: number;
  quantity?: number;
  price?: number;
  size?: string;
  productName?: string;
  totalPrice?: number;
  urlProductImage?: string;
}
export interface ItemDTO {
  productId?: number;
  quantity?: number;
}
export interface AddressDTO {
  homeAddress?: string;
  city?: string;
  district?: string;
  commune?: string;
}
