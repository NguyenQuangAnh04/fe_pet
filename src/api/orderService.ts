import type { OrderDTO, OrderStatus } from "../types/order";
import api from "./axiosClient";
const findAllOrderUser = (status: string) => {
  return api.get("/order/history", { params: { status } });
};
const findAllOrder = (
  name: string,
  phoneNumber: string,
  status: string,
  page: number
) => {
  return api.get("/order", { params: { name, phoneNumber, status, page } });
};
const addOrder = (orderDTO: OrderDTO) => {
  return api.post("/order/add", orderDTO);
};
export interface OrderUpdateDTO {
  status: OrderStatus;
}
const editOrderAdmin = (orderId: number, orderDTO: OrderUpdateDTO) => {
  return api.put(`/order/update/${orderId}`, orderDTO);
};

const deleteOrder = (orderId: number) => {
  return api.delete(`/order/delete/${orderId}`);
};
const cancelOrder = (orderId: number) => {
  return api.put(`/order/cancel/${orderId}`);
};

const updateClient = (orderDTO: OrderDTO, orderId: number) => {
  return api.put(`/order/update_client/${orderId} `, orderDTO);
};
export {
  addOrder,
  editOrderAdmin,
  findAllOrderUser,
  findAllOrder,
  deleteOrder,
  cancelOrder,
  updateClient,
};
