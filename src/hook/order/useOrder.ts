import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { OrderDTO } from "../../types/order";
import { addOrder, findAllOrderUser } from "../../api/orderService";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// const navigate = useNavigate();
export function useQueryOrderByUser() {
  return useQuery<OrderDTO>({
    queryKey: ["order"],
    queryFn: async () => {
      const res = await findAllOrderUser();
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
