import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalContextProvider from "./context/GlobalContextProvider";
import "./App.css";

// Import Components
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

function App() {
  return (
    <GlobalContextProvider>
      <BrowserRouter>
        <NavBar />

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/new-arrivals" element={<NewArrivals />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/men" element={<Men />} />
          <Route path="/women" element={<Women />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </GlobalContextProvider>
  );
}

export default App;
