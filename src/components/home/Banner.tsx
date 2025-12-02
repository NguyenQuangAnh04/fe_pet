import banner from "../../assets/banner.png";

const Banner = () => {
  return (
    <div className="mt-5 overflow-hidden rounded-2xl relative group shadow-xl">
      <img
        src={banner}
        alt="Pet Care Banner"
        className="max-h-[650px] w-full object-cover transition-transform duration-700 group-hover:scale-105 ease-in-out"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 to-transparent">
        <div className="max-w-xl">
          <h1 className="text-white text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg">
            Chăm sóc thú cưng yêu thương
          </h1>
          <p className="text-white/90 text-sm md:text-base drop-shadow">
            Dịch vụ thú y chuyên nghiệp & sản phẩm chất lượng cao
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
