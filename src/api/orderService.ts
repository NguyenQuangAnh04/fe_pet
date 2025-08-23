import type { OrderDTO } from "../types/order";
import api from "./axiosClient";
const findAllOrderUser = () => {
  return api.get("/order");
};
const addOrder = (orderDTO: OrderDTO) => {
  return api.post("/order/add", orderDTO);
};
const editOrder = (orderId: number) => {
  return api.put(`/order/update/${orderId}`);
};
export { addOrder, editOrder, findAllOrderUser };
