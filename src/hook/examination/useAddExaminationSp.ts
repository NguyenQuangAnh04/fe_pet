import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addExaminationSpecial } from "../../api/examinationService";

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
      
    },
  });
}
