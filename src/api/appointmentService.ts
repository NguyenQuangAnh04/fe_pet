import type { AppointmentDTO, AppointStatus } from "../types/appointment";
import api from "./axiosClient";

export const findAllAppointment = (
  ownerName?: string,
  email?: string,
  phoneNumber?: string,
  petName?: string,
  vetName?: string,
  status?: string,
  page?: number,
  userId?: number
) => {
  return api.get(`/appointment/${userId}`, {
    params: { ownerName, email, phoneNumber, petName, vetName, status, page },
  });
};
export interface updateStatus {
  appointStatus: AppointStatus;
}
export const updateAppointment = async (
  id: number,
  appointment: updateStatus
) => await api.put(`/appointment/update/${id}`, appointment);

export const updateStatusAppointment = async (
  userId: number,
  dto: AppointmentDTO
) => await api.put(`/appointment/update-status/${userId}`, dto);
export const deleteAppointment = async (id: number) =>
  await api.delete(`/appointment/delete/${id}`);

export const addAppointment = async (
  vetId: number,
  newAppoint: AppointmentDTO
) => await api.post(`/appointment/add/${vetId}`, newAppoint);

export const findAllAppointmentDoctor = (
  ownerName?: string,
  email?: string,
  phoneNumber?: string,
  petName?: string,
  vetName?: string,
  status?: string,
  page?: number,
  userId?: number
) => {
  return api.get(`/appointment/doctor/${userId}`, {
    params: { ownerName, email, phoneNumber, petName, vetName, status, page },
  });
};

export const getAppointmentByPhone = async (phoneNumber: string) =>
  await api.get(`/appointment/check-phone`, {
    params: { phoneNumber },
  });
