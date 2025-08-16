import { BsEye } from "react-icons/bs";

const NewArrivals = () => {
  const product = [
    {
      id: 1,
      image:
        "https://paddy.vn/cdn/shop/files/hat-cho-meo-on25-cat-dam-cao.jpg?v=1755145247",
      image2:
        "https://paddy.vn/cdn/shop/files/hat-cho-meo-on25-cat-dam-cao_3_ed2193b6-7c98-4a89-b3f6-9a225fef5535.jpg?v=1755145247",
      name: "Hạt Cho Mèo On25 Cat Đạm Cao 32% Dành Cho Mèo Mọi Độ Tuổi",
      price: "45.000₫",
    },
    {
      id: 1,
      image:
        "https://paddy.vn/cdn/shop/files/hat-cho-meo-on25-cat-dam-cao.jpg?v=1755145247",
      image2:
        "https://paddy.vn/cdn/shop/files/hat-cho-meo-on25-cat-dam-cao_3_ed2193b6-7c98-4a89-b3f6-9a225fef5535.jpg?v=1755145247",
      name: "Hạt Cho Mèo On25 Cat Đạm Cao 32% Dành Cho Mèo Mọi Độ Tuổi",
      price: "45.000₫",
    },
    {
      id: 1,
      image:
        "https://paddy.vn/cdn/shop/files/hat-cho-meo-on25-cat-dam-cao.jpg?v=1755145247",
      image2:
        "https://paddy.vn/cdn/shop/files/hat-cho-meo-on25-cat-dam-cao_3_ed2193b6-7c98-4a89-b3f6-9a225fef5535.jpg?v=1755145247",
      name: "Hạt Cho Mèo On25 Cat Đạm Cao 32% Dành Cho Mèo Mọi Độ Tuổi",
      price: "45.000₫",
    },
    {
      id: 1,
      image:
        "https://paddy.vn/cdn/shop/files/hat-cho-meo-on25-cat-dam-cao.jpg?v=1755145247",
      image2:
        "https://paddy.vn/cdn/shop/files/hat-cho-meo-on25-cat-dam-cao_3_ed2193b6-7c98-4a89-b3f6-9a225fef5535.jpg?v=1755145247",
      name: "Hạt Cho Mèo On25 Cat Đạm Cao 32% Dành Cho Mèo Mọi Độ Tuổi",
      price: "45.000₫",
    },
    {
      id: 1,
      image:
        "https://paddy.vn/cdn/shop/files/hat-cho-meo-on25-cat-dam-cao.jpg?v=1755145247",
      image2:
        "https://paddy.vn/cdn/shop/files/hat-cho-meo-on25-cat-dam-cao_3_ed2193b6-7c98-4a89-b3f6-9a225fef5535.jpg?v=1755145247",
      name: "Hạt Cho Mèo On25 Cat Đạm Cao 32% Dành Cho Mèo Mọi Độ Tuổi",
      price: "45.000₫",
    },
  ];
  return (
    <div className=" py-12 space-y-16">
      <section>
        <h2 className="text-2xl font-bold mb-6">Hàng mới về</h2>
        <div className="grid grid-cols-5 gap-6 ">
          {product.map((p) => (
            <div className=" p-4 rounded-2xl  cursor-pointer">
              <div className="relative group">
                <img src={p.image} alt="" />
                <img
                  src={p.image2}
                  className="absolute top-0 left-0 right-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
                  alt=""
                />
                <button className="absolute bottom-0 left-0 right-0 border border-gray-400 rounded-xl px-2 py-2 bg-white translate-y-full opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ">
                  Thêm vào giỏ hàng
                </button>
                <button className="absolute w-8 h-8 rounded-full bg-white text-black shadow flex items-center justify-center right-0 top-2 opacity-0 translate-x-full group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                  <BsEye size={20} />
                </button>
              </div>
              <p className="font-semibold line-clamp-2">{p.name}</p>
              <p className="font-bold text-pink-600">{p.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default NewArrivals;
