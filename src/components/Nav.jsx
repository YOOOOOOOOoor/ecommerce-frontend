import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./nav.css";
import toast from "react-hot-toast";
import API from "../Api/api.js";

const Nav = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [show, setShow] = React.useState(false);

  const logout = async () => {
    try {
      await API.post("/auth/logout");
      setUser(null);
      toast.success("Logged out successfully!"); // show success toast
      navigate("/login");
    } catch (err) {
      toast.error("Logout failed. Please try again."); // show error toast
      console.log(err); // log error for debugging
    }
  };

  return (
    <nav>
      <div className="Nav-Home-page">
        <Link to="/">
          <img src="/content/Home.svg" alt="" />
          Ethio<span>Cart</span>
        </Link>
      </div>

      <div className="Left-side">
        <Link to="">
          <img src="/content/Home(2).svg" alt="" />
          <span>Home</span>
        </Link>
        <Link to="/products">
          <img src="/content/products.svg" alt="" />
          <span>Products</span>
        </Link>

        {user && (
          <>
            <Link to="/seller">
              <img src="/content/sell-productsvg.svg" alt="" />
              <span>Seller</span>
            </Link>
            <Link to="/carts">
              <img src="/content/carts.svg" alt="" />
              <span>Carts</span>
            </Link>
          </>
        )}

        {user ? (
          <div className="profile">
            <button onClick={() => setShow(!show)} className="prof">
              <img src="/content/user.svg" alt="" />
            </button>
            {show && (
              <div className={`profile-dropdown ${show ? "show" : ""}`}>
                <p>Profile</p>
                <button onClick={logout}>Logout</button>
                <button onClick={() => setShow(false)}>Cancel</button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
