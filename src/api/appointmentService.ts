
import type { AppointmentDTO } from "../types/appointment";
import api from "./axiosClient";

export const findAllAppointment = (params?: {
    ownerName?: string;
    email?: string;
    phoneNumber?: string;
    namePet?: string;
    nameVet?: string;
    status?: string;
    page?: Number
}) => {
    return api.get("/appointment", { params });
};
export const updateAppointment = async (id: number, appointment: AppointmentDTO) =>
    await api.put(`/appointment/update/${id}`, appointment);
export const deleteAppointment = async (id: number) => await api.delete(`/appointment/delete/${id}`);

