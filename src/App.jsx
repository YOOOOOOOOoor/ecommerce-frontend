import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
// import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import API from "./Api/api.js";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Nav from "./components/Nav";
import Products from "./pages/Products";
import Seller from "./pages/Seller";
import Carts from "./pages/Carts";
import ProductDetail from "./pages/ProductsDetail";
import Profile from "./pages/Profile"; /**Future use */
import Footer from "./components/Footer";
import Admin from "./Admin/Admin.jsx";

function AppContent() {
  const location = useLocation();
  const hideNav =
    location.pathname === "/login" || location.pathname === "/register";
  const hideFooter =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/admin";

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/me"); // backend URL: /api/auth/me
        setUser(res.data.users);
      } catch (err) {
        console.error("Fetch user error:", err.response?.data || err.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);
  useEffect(() => {
    console.log("API URL:", import.meta.env.VITE_API_URL);
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="app-container">
      <Toaster position="top-right" /> {/* <-- keep this */}
      {!hideNav && <Nav user={user} setUser={setUser} />}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home user={user} setUser={setUser} />} />
          <Route
            path="/profile"
            element={<Profile user={user} setUser={setUser} />}
          />

          <Route
            path="/login"
            element={<Login user={user} setUser={setUser} />}
          />
          <Route
            path="/register"
            element={<Register user={user} setUser={setUser} />}
          />
          <Route
            path="/products"
            element={<Products user={user} setUser={setUser} />}
          />
          <Route
            path="/products/:id"
            element={<ProductDetail user={user} setUser={setUser} />}
          />
          <Route
            path="/carts"
            element={<Carts user={user} setUser={setUser} />}
          />
          <Route
            path="/seller"
            element={<Seller user={user} setUser={setUser} />}
          />
          <Route
            path="/admin"
            element={<Admin user={user} setUser={setUser} />}
          />
        </Routes>
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
      <Analytics />
      <SpeedInsights />
    </Router>
  );
}

export default App;
