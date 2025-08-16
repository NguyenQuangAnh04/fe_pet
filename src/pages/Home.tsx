import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import NewArrivals from "../components/NewArrivals";
import ShopContent from "../components/ShopContent";

const Home = () => {
  return (
    <>
      <Header />
      <div className="mx-auto max-w-[1300px] w-full">
        <Banner />
        <ShopContent />
        <NewArrivals />
      </div>
      <Footer />
    </>
  );
};

export default Home;
