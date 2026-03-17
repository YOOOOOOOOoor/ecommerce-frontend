import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // <-- import Toaster
import API from "./Api/api.js";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Nav from "./components/Nav";
import Products from "./pages/Products";
import Seller from "./pages/Seller";
import Carts from "./pages/Carts";
import ProductDetail from "./pages/ProductsDetail";

function AppContent() {
  const location = useLocation();
  const hideNav = location.pathname === "/login" || location.pathname === "/register";

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/me"); // backend URL: /api/auth/me
        setUser(res.data.users);
      } catch (err) {
        console.error(err.response?.data || err.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <>
       <Toaster position="top-right" /> {/* <-- Add Toaster here */}
      {!hideNav && <Nav user={user} setUser={setUser} />}
      <Routes>
        <Route path="/" element={<Home user={user} setUser={setUser} />} />
        <Route path="/login" element={<Login user={user} setUser={setUser} />} />
        <Route path="/register" element={<Register user={user} setUser={setUser} />} />
        <Route path="/products" element={<Products user={user} setUser={setUser} />} />
        <Route path="/products/:id" element={<ProductDetail user={user} setUser={setUser} />} />
        <Route path="/carts" element={<Carts user={user} setUser={setUser} />} />
        <Route path="/seller" element={<Seller user={user} setUser={setUser} />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
