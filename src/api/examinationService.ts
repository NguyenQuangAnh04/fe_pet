
import type { ExaminationDTO } from "../types/examination";
import api from "./axiosClient";

export const findAllExamination = (params?: { name?: string; min?: Number | null; max?: Number | null; page?: Number }) => {
    return api.get("/examination", { params });
};
export const addExamination = async (examination: ExaminationDTO) => await api.post("/examination/create", examination);
export const updateExamination = async (id: number, examination: ExaminationDTO) =>
    await api.put(`/examination/update/${id}`, examination);
export const deleteExamination = async (id: number) => await api.delete(`/examination/delete/${id}`);

