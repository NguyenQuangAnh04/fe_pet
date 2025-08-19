export interface ProductDTO {
  id: number;
  name: string;
  price: number;
  img: string;
  img2?: string;
}

export interface ProductDTO2 {
  id: number;
  namePro: string;
  price: number;
  description: string;
  createdAt?: string | Date ;
  updatedAt?:  string | Date ;
  imageUrl: string;
  imagesDTO: ImagesDTO[];
}

interface ImagesDTO {
  id: number;
  imageUrl: string;
  publicId: string;
  size: number;
}
