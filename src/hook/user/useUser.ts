import {
    addUser,
    findAllUser,
    updateRoleUser,
    deleteUser,
    selectRoleUser
} from "../../api/userService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { userDTO, userUpdateRole } from "../../types/user";
import { toast } from "react-toastify";

export function useQueryUser(searchParams: { name?: string; email?: string; phoneNumber?: string } = {}) {
    const { data, isLoading, error } = useQuery<userDTO[]>({
        queryKey: ["user", searchParams],
        queryFn: async () => {
            const res = await findAllUser(searchParams);
            return res.data.data.content ?? [];
        },
    });
    return { data, isLoading, error };
}

export function roleQuery() {
    return useQuery({
        queryKey: ["role"],
        queryFn: async () => {
            const res = await selectRoleUser();
            return res.data.data;
        },
    });
}

type AddUserParams = userDTO;
export function userAddUser() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newUser: AddUserParams) => {
            return await addUser(newUser);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
            toast.success("Thêm user thành công!");
        },
        onError: (err) => {
            toast.error(err.message);
            console.error(err.message);
        },
    });
}

type UpdateUserParams = {
    id: number;
    userUpdateRole: userUpdateRole;
};
export function userUpdateRoleUser() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, userUpdateRole }: UpdateUserParams) => {
            return await updateRoleUser(id, userUpdateRole);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
            toast.success("Cập nhật user thành công!");
        },
        onError: (err) => {
            toast.error(err.message);
            console.error(err.message);
        },
    });
}

export function useDeleteUser() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: number) => {
            return await deleteUser(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
            toast.success("Xóa user thành công!");
        },
        onError: (err) => {
            toast.error(err.message);
            console.error(err.message);
        },
    });
}