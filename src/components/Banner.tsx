import banner from "../assets/banner.png";
const Banner = () => {
  return (
    <div className="mt-5 overflow-hidden rounded-lg">
      <img
        src={banner}
        alt=""
        className="max-h-[650px] w-full object-cover transition-transform duration-700 hover:scale-110 ease-in-out "
      />
    </div>
  );
};

export default Banner;
