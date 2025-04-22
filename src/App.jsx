import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalContextProvider from "./context/GlobalContextProvider";
import "./App.css";

// Import Components
import ProtectedRoutes from "./components/ProtectedRoute";
import { NavBar } from "./components/NavBar";
import { Hero } from "./components/Hero";
import { NewArrivals } from "./components/NewArrivals";
import { GridBanner } from "./components/GridBanner";
import { Cart } from "./components/Cart";
import { Footer } from "./components/Footer";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import { About } from "./components/About";
import { Men } from "./components/Men";
import { Women } from "./components/Women";
import Profile from "./components/Profile";
import { DetailedProduct } from "./components/ui/DetailedProduct";
import { Signup } from "./components/SignUp";
import Orders from "./components/Orders";
import AdminDashboard from "./components/admin/AdminDashboard";
import Unauthorized from "./components/Unauthorized";
import UserManagement from "./components/admin/UserManagement";
import ProductManagement from "./components/admin/ProductManagement";
import OrderManagement from "./components/admin/OrderManagement";

function App() {
  return (
    <GlobalContextProvider>
      <BrowserRouter>
        <NavBar />

        {/* Define Routes */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoutes requiredRole="7f7d8021-923b-429c-b76c-22462fd34b55">
                <AdminDashboard />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoutes requiredRole="7f7d8021-923b-429c-b76c-22462fd34b55">
                <UserManagement />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoutes requiredRole="7f7d8021-923b-429c-b76c-22462fd34b55">
                <ProductManagement />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <ProtectedRoutes requiredRole="7f7d8021-923b-429c-b76c-22462fd34b55">
                <OrderManagement />
              </ProtectedRoutes>
            }
          />
          <Route path="/" element={<Hero />} />
          <Route path="/men" element={<Men />} />
          <Route path="/women" element={<Women />} />
          <Route path="/new-arrivals" element={<NewArrivals />} />
          <Route path="/about" element={<About />} />
          <Route path="/detailedProduct" element={<DetailedProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/order" element={<Orders />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </GlobalContextProvider>
  );
}

export default App;

