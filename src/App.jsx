import { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Nav from "./components/Nav";
import Products from "./pages/Products";
import Seller from "./pages/Seller";
import Carts from "./pages/Carts";
import ProductDetail from "./pages/ProductsDetail";

axios.defaults.withCredentials = true;

function AppContent() {
  const location = useLocation();

  const hideNav =
    location.pathname === "/login" || location.pathname === "/register";

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/auth/me");
        setUser(res.data.users);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      {!hideNav && <Nav user={user} setUser={setUser} />}

      <Routes>
        <Route path="/" element={<Home user={user} setUser={setUser} />} />
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
