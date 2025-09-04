import {
    findAllVeterinarians,
    addVeterinarians,
    updateVeterinarians,
    deleteVeterinarians
} from "../../api/veterinarianService";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { VeterinarianDTO } from "../../types/veterinarian";


type VetPageRes = {
    content: VeterinarianDTO[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
}

export function useQueryVeterinarian(searchParams = {}) {
    const { data, isLoading, error } = useQuery<VetPageRes>({
        queryKey: ["veterinarian", searchParams],
        queryFn: async () => {
            const res = await findAllVeterinarians(searchParams);
            return res.data.data ?? [];
        },
    });
    return { data, isLoading, error };
}

export function useAddVeterinarian() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newVet: VeterinarianDTO) => {
            return await addVeterinarians(newVet);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["veterinarian"] });
            toast.success("Them vet thanh cong");
        },
        onError: (err) => {
            toast.error(err.message);

        },
    });
}

type UpdateVeterinarians = {
    id: number;
    updateVet: VeterinarianDTO;
};
export function useUpdateVeterinarian() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, updateVet }: UpdateVeterinarians) => {
            return await updateVeterinarians(id, updateVet);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["veterinarian"] });
            toast.success("Cập nhật vet thành công!");
        },
        onError: (err) => {
            toast.error(err.message);
            console.error(err.message);
        },
    });
}

export function deleteVeterinarian() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: number) => {
            return await deleteVeterinarians(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["veterinarian"] });
            toast.success("Xóa vet thành công!");
        },
        onError: (err) => {
            toast.error(err.message);
            console.error(err.message);
        },
    })
}