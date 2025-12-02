import api from "./axiosClient";

export interface Province {
  code: number;
  name: string;
  districts: District[];
}

export interface District {
  code: number;
  name: string;
  wards: Ward[];
}

export interface Ward {
  code: number;
  name: string;
}

// API từ provinces.open-api.vn
const ADDRESS_API_BASE = "https://provinces.open-api.vn/api";

export const getProvinces = async (): Promise<Province[]> => {
  try {
    const response = await fetch(`${ADDRESS_API_BASE}/p/`);
    return response.json();
  } catch (error) {
    console.error("Error fetching provinces:", error);
    return [];
  }
};

export const getDistricts = async (
  provinceCode: number
): Promise<District[]> => {
  try {
    const response = await fetch(
      `${ADDRESS_API_BASE}/p/${provinceCode}?depth=2`
    );
    const data = await response.json();
    return data.districts || [];
  } catch (error) {
    console.error("Error fetching districts:", error);
    return [];
  }
};

export const getWards = async (districtCode: number): Promise<Ward[]> => {
  try {
    const response = await fetch(
      `${ADDRESS_API_BASE}/d/${districtCode}?depth=2`
    );
    const data = await response.json();
    return data.wards || [];
  } catch (error) {
    console.error("Error fetching wards:", error);
    return [];
  }
};
