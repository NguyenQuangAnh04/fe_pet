import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import type { AppointmentDTO } from "../../types/appointment";

type UpdateStatusParams = {
  id: number;
  dto: AppointmentDTO;
};

export function useUpdateStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, dto }: UpdateStatusParams) => {
      const res = await axios.put(`/api/appointments/${id}/status`, dto);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointment"] });
      toast.success("Cập nhật trạng thái lịch khám thành công!");
    },
    onError: (err) => {
      console.error("Error updating appointment status:", err);
    },
  });
}
