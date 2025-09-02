
import type { AppointmentDTO, AppointStatus } from "../types/appointment";
import api from "./axiosClient";

export const findAllAppointment = (params?: {
    ownerName?: string;
    email?: string;
    phoneNumber?: string;
    petName?: string;
    vetName?: string;
    status?: string;
    page?: Number
}) => {
    return api.get("/appointment", { params });
};
export interface updateStatus{
    appointStatus: AppointStatus;
}
export const updateAppointment = async (id: number, appointment: updateStatus) =>
    await api.put(`/appointment/update/${id}`, appointment);
export const deleteAppointment = async (id: number) => await api.delete(`/appointment/delete/${id}`);

