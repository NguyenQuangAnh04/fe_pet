import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Category from "./components/dashboard/category/Category";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import Register from "./pages/Register";
import Services from "./pages/Services";
import PrivateRoute from "./routes/PrivateRoute";

import Appointment from "./components/dashboard/appointment/Appointment";
import DashboardHome from "./components/dashboard/dashboardHome/Dashboard";
import Examination from "./components/dashboard/examination/Examination";
import Order from "./components/dashboard/order/Order";
import Product from "./components/dashboard/product/Product";
import Review from "./components/dashboard/review/Review";
import User from "./components/dashboard/user/User";
import Vet from "./components/dashboard/veterinarian/Veterinarian";
import ProductFilter from "./components/product/ProductFilter";
import BlogPage from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import BookingForm from "./pages/BookingForm";
import OrdersPage from "./pages/OrdersPage";
import PaymentResult from "./pages/PaymentResult";
import OAuth2Success from "./components/OAuth2Success";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <div>
      <Routes>
        {/* Routes public */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/oauth2/success" element={<OAuth2Success />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/services" element={<Services />} />
        <Route path="/booking" element={<BookingForm />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/" element={<Home />} />
        {/* <Route path="/account" element={<Account />} /> */}
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment-result" element={<PaymentResult />} />
        <Route path="/product-details/:slug" element={<ProductDetails />} />
        <Route path="/search" element={<ProductFilter />} />
        <Route element={<PrivateRoute />}>
          <Route path="orders" element={<OrdersPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="dashboardHome" element={<DashboardHome />} />
            <Route path="products" element={<Product />} />
            <Route path="categories" element={<Category />} />
            <Route path="orders" element={<Order />} />
            <Route path="account" element={<User />} />
            <Route path="vet" element={<Vet />} />
            <Route path="exam" element={<Examination />} />
            <Route path="appoint" element={<Appointment />} />
            <Route path="reviews" element={<Review />} />
          </Route>
        </Route>
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
