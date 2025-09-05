import Banner from "../components/home/Banner";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import NewArrivals from "../components/home/NewArrivals";
import ShopContent from "../components/home/ShopContent";
import App from "../App";
import AppointmentForm from "../components/home/AppointmentForm";

const Home = () => {
  return (
    <>
      <Header />
      <div className="mx-auto max-w-[1440px] w-full">
        <Banner />
        <ShopContent />
        <NewArrivals />
        <AppointmentForm />
      </div>
      <Footer />
    </>
  );
};

export default Home;
