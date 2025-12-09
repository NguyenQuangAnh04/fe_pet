import {
    findAllExamination,
    addExamination,
    updateExamination,
    deleteExamination
} from "../../api/examinationService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ExaminationDTO } from "../../types/examination";
import { toast } from "react-toastify";


type ExaminationPageRes = {
    content: ExaminationDTO[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
}


export function useQueryExamination(searchParams = {}) {
    const { data, isLoading, error } = useQuery<ExaminationPageRes>({
        queryKey: ["examination", searchParams],
        queryFn: async () => {
            const res = await findAllExamination(searchParams);
            return res.data.data ?? [];
        },
    });
    return { data, isLoading, error };
}


export function userAddExamination() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newExam: ExaminationDTO) => {
            return await addExamination(newExam);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["examination"] });
            toast.success("Thêm dịch vụ khám thành công!");
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message || err.message);
            console.error(err);
        },
    });
}

type UpdateExaminationParams = {
    id: number;
    updateExam: ExaminationDTO;
};
export function userUpdateExamination() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, updateExam }: UpdateExaminationParams) => {
            return await updateExamination(id, updateExam);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["examination"] });
            toast.success("Cập nhật dịch vụ khám thành công!");
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message || err.message);
            console.error(err.message);
        },
    });
}

export function useDeleteExamination() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: number) => {
            return await deleteExamination(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["examination"] });
            toast.success("Xóa dịch vụ khám thành công!");
        },
        onError: (err) => {
            toast.error(err.message);
            console.error(err.message);
        },
    });
}