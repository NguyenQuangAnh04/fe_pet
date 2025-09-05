import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addAppointment } from "../../api/appointmentService";
import type { AppointmentDTO } from "../../types/appointment";

export default function useAddAppointment() {
    const queryClient = useQueryClient();
    return useMutation( {

            mutationFn: async ({ vetId, newAppoint }: { vetId: number, newAppoint: AppointmentDTO }) => {
                await addAppointment(vetId, newAppoint);
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["appointment"] });
                toast.success("Đặt lịch hẹn thành công!");
            },
            onError: (error) => {
                console.error('Error adding appointment:', error);
            }
        })
    
}