// file này import list ảnh sản phẩm qua trang chi tiết
import  { useState } from "react";

export default function ProductImages({images}: {images: string[]}) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="space-y-4">
      {/* Ảnh chính */}
      <div className="relative overflow-hidden rounded-lg bg-gray-100">
        <img
          src={selectedImage}
          alt="Sản phẩm chính"
          className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      
      {/* List ảnh phụ nằm bên dưới ảnh chính */}
      <div className="grid grid-cols-6 gap-2">
        {images.map((img, index) => (
          <div
            key={index}
            className={`relative cursor-pointer rounded-md overflow-hidden border-2 transition-all duration-200 ${
              selectedImage === img 
                ? "border-orange-500 ring-2 ring-orange-200" 
                : "border-gray-200 hover:border-orange-300"
            }`}
            onClick={() => setSelectedImage(img)}
          >
            <img
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-16 md:h-20 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
