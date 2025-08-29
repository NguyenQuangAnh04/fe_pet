import type { VariantDTO } from "./variant";

export interface ProductDTO {
  id: number;
  namePro: string;
  price: number;
  description: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  imageUrl: string;
  slug?: string;
  sl?: number;
  categoryName?: number;
  imagesDTO: ImagesDTO[];
  variants?: VariantDTO[];
}

export interface ImagesDTO {
  id: number;
  imageUrl: string;
  publicId: string;
  size: number;
}
