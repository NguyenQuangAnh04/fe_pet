import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Account from "./pages/Account";
import Checkout from "./pages/Checkout";
import PrivateRoute from "./routes/PrivateRoute";
import Category from "./components/dashboard/category/Category";
import Services from "./pages/Services";

import SearchPage from "./pages/SearchPage";
import OrdersPage from "./pages/OrdersPage";
import Order from "./components/dashboard/order/Order";
import User from "./components/dashboard/user/User";
import Product from "./components/dashboard/product/Product";

function App() {
  return (
    <div>
      <Routes>
        {/* Routes public */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/services" element={<Services />} />
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product-details/:slug" element={<ProductDetails />} />
        <Route path="/search" element={<SearchPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="orders" element={<OrdersPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="products" element={<Product />} />
            <Route path="categories" element={<Category />} />
            <Route path="orders" element={<Order />} />

            <Route path="account" element={<User />} />
          </Route>
        </Route>
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
