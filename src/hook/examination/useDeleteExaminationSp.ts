import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addExaminationSpecial,
  deleteExaminationSpecial,
} from "../../api/examinationService";

export function useDeleteExaminationSpecial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newExamSpecial: {
      appointmentId: number;
      examinationSpecialIds: number[];
    }) => {
      return await deleteExaminationSpecial(
        newExamSpecial.examinationSpecialIds,
        newExamSpecial.appointmentId
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["examination"] });
    },
  });
}
