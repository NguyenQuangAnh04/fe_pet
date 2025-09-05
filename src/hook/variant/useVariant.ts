import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteVeterinarians } from "../../api/variantService";

export function useDeleteVariant() {
    const useQuery = useQueryClient();
    return useMutation({
        mutationFn: async (id: number) => {
            return await deleteVeterinarians(id);
        },
        onSuccess: () => {
            useQuery.invalidateQueries({ queryKey: ["product"] });
            toast.success("Xoá biến thể thành công");
        }
    })
}
