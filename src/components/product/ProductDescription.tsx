import type { ProductDTO } from "../../types/product";
type ProductDescriptionProps = {
  product: ProductDTO;
};
const ProductDescription = ({ product }: ProductDescriptionProps) => {
  // mô tả sản phẩm
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="space-y-4">
        <div className="prose prose-gray max-w-none">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Mô tả sản phẩm
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            {product.categoryName}
            {product.description}
          </p>

          {/* <h4 className="text-md font-semibold text-gray-900 mb-2">Lợi ích chính:</h4>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>Kiểm soát mùi phân:</strong> Công thức đặc biệt giúp giảm mùi phân khó chịu</li>
            <li><strong>Hỗ trợ tiêu hóa:</strong> Protein dễ tiêu hóa và chất xơ phù hợp</li>
            <li><strong>Duy trì cân nặng:</strong> Hàm lượng calo được điều chỉnh cho mèo ít vận động</li>
            <li><strong>Sức khỏe đường tiết niệu:</strong> Cân bằng khoáng chất bảo vệ hệ tiết niệu</li>
            <li><strong>Lông bóng mượt:</strong> Omega-3 và Omega-6 nuôi dưỡng lông từ bên trong</li>
          </ul>

          <h4 className="text-md font-semibold text-gray-900 mb-2 mt-4">Đặc điểm nổi bật:</h4>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Xuất xứ từ Pháp - chất lượng châu Âu</li>
            <li>Công nghệ sản xuất hiện đại, đảm bảo dinh dưỡng tối ưu</li>
            <li>Hạt có kích thước phù hợp, dễ ăn và tiêu hóa</li>
            <li>Không chứa chất bảo quản nhân tạo có hại</li>
          </ul> */}
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
