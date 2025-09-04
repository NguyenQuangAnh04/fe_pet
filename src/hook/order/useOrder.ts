import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { OrderDTO, OrderStatus } from "../../types/order";
import {
  addOrder,
  cancelOrder,
  deleteOrder,
  editOrderAdmin,
  findAllOrder,
  findAllOrderUser,
} from "../../api/orderService";
import { toast } from "react-toastify";


type OrderResponse = {
  content: OrderDTO[];
  totalPages: number;
};
export function useQueryOrderByUser(status: string) {
  return useQuery<OrderDTO[]>({
    queryKey: ["order", status],
    queryFn: async () => {
      const res = await findAllOrderUser(status);
      return res.data.data.content;
    },
  });
}
type OrderPropsQuery = {
  name: string;
  phoneNumber: string;
  status: string;
  page: number;
};
export function useQueryOrder({
  name,
  phoneNumber,
  status,
  page,
}: OrderPropsQuery) {
  return useQuery<OrderResponse>({
    queryKey: ["order", name, phoneNumber, status, page],
    queryFn: async () => {
      const res = await findAllOrder(name, phoneNumber, status, page);
      return res.data.data;
    },
  });
}

export function useAddOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (orderDTO: OrderDTO) => {
      return await addOrder(orderDTO);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order"] });
      toast.success("Đặt hàng thành công");
    },

    onError: (err) => {
      console.error(err.message);
    },
  });
}

export function useDeleteOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (orderId: number) => {
      return await deleteOrder(orderId);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order"] });
      toast.success("Xóa thành công đơn hàng");
    },
    onError: (err) => {
      console.error(err.message);
    },
  });
}

type OrderResponseUpdate = {
  orderId: number;
  orderDTO: {
    status: OrderStatus;
  };
};
export function useUpdateOrderAdmin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ orderId, orderDTO }: OrderResponseUpdate) => {
      return await editOrderAdmin(orderId, orderDTO);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order"] });
      toast.success("Cập nhật trạng thái đơn hàng");
    },

    onError: (err) => {
      console.error(err.message);
    },
  });
}

export function useCancelOrderUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (orderId: number) => {
      return await cancelOrder(orderId);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order"] });
      toast.success("Huỷ đơn hàng thành công");
    },

    onError: (err) => {
      console.error(err.message);
    },
  });
}
