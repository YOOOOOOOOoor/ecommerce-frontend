import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const dateofYear = new Date().getFullYear();
  return (
    <footer>
      <div className="footers">
        <div className="Nav-Home-page">
          <Link to="/">
            Ethio<span>Cart</span>
          </Link>
          <p>
            A modern e-commerce platform built for speed and simplicity.
            Experience the future of online shopping today.
          </p>
        </div>
        <div>
          <h3>Shop</h3>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
        </div>
        <div>
          <h3>Support</h3>
          <Link to="/#">Contact</Link>
          <Link to="/#">FAQ</Link>
          <Link to="/#">About</Link>
        </div>
      </div>
      <div className="copyright">
        <p>
          © {dateofYear} Ethio<span>Cart</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
