export interface CategoriesDTO {
  id: number;
  nameCate: string;
  imageUrl?: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
  product?: Product[];
}