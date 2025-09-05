import api from "./axiosClient";

export function deleteVeterinarians(id: number) {
    return api.delete(`/variant/delete/${id}`);
}