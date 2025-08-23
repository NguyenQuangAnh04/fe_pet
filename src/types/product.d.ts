export interface ProductDTO {
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
