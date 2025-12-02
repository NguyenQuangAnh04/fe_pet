import { useQuery } from "@tanstack/react-query";
import { getDistricts, getProvinces, getWards } from "../../api/addressService";

export const useProvinces = () => {
  return useQuery({
    queryKey: ["provinces"],
    queryFn: getProvinces,
    staleTime: 24 * 60 * 60 * 1000, // Cache for 24 hours
  });
};

export const useDistricts = (provinceCode?: number) => {
  return useQuery({
    queryKey: ["districts", provinceCode],
    queryFn: () => getDistricts(provinceCode!),
    enabled: !!provinceCode,
    staleTime: 24 * 60 * 60 * 1000,
  });
};

export const useWards = (districtCode?: number) => {
  return useQuery({
    queryKey: ["wards", districtCode],
    queryFn: () => getWards(districtCode!),
    enabled: !!districtCode,
    staleTime: 24 * 60 * 60 * 1000,
  });
};
