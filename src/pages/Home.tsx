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
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8">
        <Banner />
        <ShopContent />
        <NewArrivals />
        <PetCareBlogs />
        <AppointmentForm />
        <CustomerFeedback />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
