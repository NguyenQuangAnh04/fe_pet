import { useQuery } from "@tanstack/react-query";
import { findAllVetFreeTime } from "../../api/veterinarianService";

export function useQueryFreeTime(start: string) {
  return useQuery({
    queryKey: ["free-time", start],
    queryFn: async () => {
      const res = await findAllVetFreeTime(start);
      return res.data;
    },
  });
}
