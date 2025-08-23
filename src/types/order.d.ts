export interface OrderDTO {
  id?: number;
  userId?: number;
  name?: string;
  phoneNumber?: string;
  totalAmount?: number;
  status?: OrderStatus;
  note?: string;
  paymentMethod?: PaymentMethod;
  orderDetailDTO?: OrderDetailDTO;
  addressDTO?: AddressDTO;
}

export interface OrderDetailDTO {
  id?: number;
  quantity?: number;
  price?: number;
  productName?: string;
  totalPrice?: number;
  urlProductImage?: string;
}
export enum OrderStatus {
  PENDING = "Chờ xác nhận",
  CONFIRMED = "Đã xác nhận",
  IN_PREPARATION = "Đang pha chế",
  SERVED = "Đã phục vụ",
  COMPLETED = "Hoàn tất",
  CANCELED = "Đã hủy",
}

export enum PaymentMethod {
  COD,
  MOMO,
  ZALOPAY,
  VNPAY,
  CREDIT_CARD,
}

export interface AddressDTO {
  homeAddress?: string;
  city?: string;
  district?: string;
  commune?: string;
}
