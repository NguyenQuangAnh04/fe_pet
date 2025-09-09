import {
    findAllAppointment,
    updateAppointment,
    deleteAppointment
} from "../../api/appointmentService";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AppointmentDTO, AppointStatus } from "../../types/appointment";


type AppointPageRes = {
    content: AppointmentDTO[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
}

type useAppointmentProps = {
    ownerName?: string,
    email?: string,
    phoneNumber?: string,
    petName?: string,
    vetName?: string,
    status?: string,
    page?: number
}

export function useQueryAppoint({ ownerName, email, phoneNumber, petName, vetName, status, page
}: useAppointmentProps) {
    const { data, isLoading, error } = useQuery<AppointPageRes>({
        queryKey: ["appointment", ownerName, email, phoneNumber, petName, vetName, status, page],
        queryFn: async () => {
            const res = await findAllAppointment(ownerName, email, phoneNumber, petName, vetName, status, page);
            return res.data.data ?? [];
        },
    });
    return { data, isLoading, error };
}

type UpdateAppointment = {
    id: number;
    appointment: {
        appointStatus: AppointStatus;
    };
};
export function useUpdateAppointment() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, appointment }: UpdateAppointment) => {
            return await updateAppointment(id, appointment);
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