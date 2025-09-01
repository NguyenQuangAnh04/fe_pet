import {
   findAllAppointment,
   updateAppointment,
   deleteAppointment
} from "../../api/appointmentService";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AppointmentDTO } from "../../types/appointment";


type AppointPageRes = {
    content: AppointmentDTO[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
}

export function useQueryVeterinarian(searchParams = {}) {
    const { data, isLoading, error } = useQuery<AppointPageRes>({
        queryKey: ["appointment", searchParams],
        queryFn: async () => {
            const res = await findAllAppointment(searchParams);
            return res.data.data ?? [];
        },
    });
    return { data, isLoading, error };
}

type UpdateAppointment = {
    id: number;
    updateAppoint: AppointmentDTO;
};
export function useUpdateAppointment() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, updateAppoint }: UpdateAppointment) => {
            return await updateAppointment(id, updateAppoint);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["appointment"] });
            toast.success("Cập nhật lịch khám thành công!");
        },
        onError: (err) => {
            toast.error(err.message);
            console.error(err.message);
        },
    });
}

export function useDeleteAppointment() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: number) => {
            return await deleteAppointment(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["appointment"] });
            toast.success("Xóa lịch khám thành công!");
        },
        onError: (err) => {
            toast.error(err.message);
            console.error(err.message);
        },
    })
}