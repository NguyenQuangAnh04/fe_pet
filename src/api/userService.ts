
import type { userRegister, userUpdateRole } from "../types/user";
import api from "./axiosClient";

export const findAllUser = (params?: { name?: string; phoneNumber?: string; email?: string }) => {
    return api.get("/user", { params });
};
export const addUser = async (userRegister: userRegister) => await api.post("/user/create", userRegister);
export const updateRoleUser = async (id: number, userUpdateRole: userUpdateRole) =>
    await api.put(`/user/update/${id}`, userUpdateRole);
export const deleteUser = async (id: number) => await api.delete(`/user/delete/${id}`);
export const selectRoleUser = async () => await api.get("/role");
