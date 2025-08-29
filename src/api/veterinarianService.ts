import type { VeterinarianDTO } from "../types/veterinarian";
import api from "./axiosClient";

export const findAllVeterinarians = (params?: { name?: string; phone?: string; email?: string; page?: Number }) => {
    return api.get("/vet", { params });
}
export const addVeterinarians = async (veterinarian: VeterinarianDTO) => await api.post("/vet/create", veterinarian);
export const updateVeterinarians = async (id: number, veterinarian: VeterinarianDTO) =>
    await api.put(`/vet/update/${id}`, veterinarian);
export const deleteVeterinarians = async (id: number) => await api.delete(`/vet/delete/${id}`);