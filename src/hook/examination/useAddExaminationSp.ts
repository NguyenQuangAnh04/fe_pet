import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addExaminationSpecial } from "../../api/examinationService";
import { toast } from "react-toastify";

export function userAddExaminationSpecial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newExamSpecial: {
      appointmentId: number;
      examinationSpecialIds: number[];
    }) => {
      return await addExaminationSpecial(
        newExamSpecial.examinationSpecialIds,
        newExamSpecial.appointmentId
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointment"] });
      toast.success("Thêm dịch vụ khám đặc biệt thành công");
    },
    onError: (err) => {
      toast.error(err.message);
      console.error(err.message);
    },
  });
}
