import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import AppointmentForm from "../components/home/AppointmentForm";
import Banner from "../components/home/Banner";
import CustomerFeedback from "../components/home/CustomerFeedback";
import NewArrivals from "../components/home/NewArrivals";
import PetCareBlogs from "../components/home/PetCareBlogs";
import ShopContent from "../components/home/ShopContent";

const Home = () => {
  return (
    <>
      <Header />
      <div className="mx-auto max-w-[1440px] w-full">
        <Banner />
        <ShopContent />
        <NewArrivals />
        <PetCareBlogs />
        <CustomerFeedback />
        <AppointmentForm />
      </div>
      <Footer />
    </>
  );
};

export default Home;
