
import type { userDTO, userRegister, userUpdateRole } from "../types/user";
import api from "./axiosClient";

export const findAllUser = () => {
    return api.get("/user");
};
export const addUser = async (userRegister: userRegister) => {
    return await api.post("/user/create", userRegister);
};
export const updateRoleUser = async (id: number, userUpdateRole: userUpdateRole) => {
    return await api.put(`/user/update/${id}`, userUpdateRole);
}
export const deleteUser = async (id: number) => {
    return await api.delete(`/user/delete/${id}`);
};