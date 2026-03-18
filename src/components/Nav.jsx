import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./nav.css";
import toast from "react-hot-toast";
import API from "../Api/api.js";
import { useRef, useEffect, useState } from "react";

const Nav = ({ user, setUser }) => {
  const navigate = useNavigate();

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

  // Close dropdown if click outside
  const [show, setShow] = useState(false);
  const dropdownRef = useRef();
  const buttonRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
            <button
              ref={buttonRef}
              onClick={() => setShow(!show)}
              className="prof"
            >
              <img src="/content/user.svg" alt="" />
            </button>
            {show && (
              <div
                ref={dropdownRef}
                className={`profile-dropdown ${show ? "show" : ""}`}
              >
                <p className="profile-btn">Profile</p>
                <button className="logout-btn" onClick={logout}>
                  Logout
                </button>
                <button className="cancel-btn" onClick={() => setShow(false)}>
                  Cancel
                </button>
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
