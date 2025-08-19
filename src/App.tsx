import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Product from "./components/dashboard/Product";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <div>
      <Routes>
        {/* Routes public */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="products" element={<Product />} />
          </Route>
        </Route>
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
