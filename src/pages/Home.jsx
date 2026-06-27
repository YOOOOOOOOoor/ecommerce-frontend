import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import ImageWithSkeleton from "../components/ImageWithSkeleton";
import "../responsive/mobile.css";
import API from "../Api/api.js";
import toast from "react-hot-toast";

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const res = await API.get("/products", {
        params: {
          limit: 4,
        },
      });
      setProducts(res.data.products);
    } catch (error) {
      console.error(error.message);
    }
  };
useEffect(() => {
  const toastId = toast.custom(
    (t) => (
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "#111827",
          color: "white",
          padding: "20px",
          borderRadius: "14px",
          width: "360px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          zIndex: 9999,
          textAlign: "center",
        }}
      >
        {/* Close button */}
        <button
          onClick={() => toast.dismiss(t.id)}
          style={{
            position: "absolute",
            top: 10,
            right: 12,
            background: "transparent",
            border: "none",
            color: "#aaa",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          ✕
        </button>

        <h3 style={{ marginBottom: 10 }}>⚡ Waking up server</h3>

        <p style={{ fontSize: "14px", lineHeight: 1.5, color: "#d1d5db" }}>
          I'm using Render's free hosting, so the first request can take up to a minute.
          <br />
          Please wait while everything loads.
        </p>

        <p style={{ marginTop: 15, color: "#60a5fa", fontWeight: "bold" }}>
          🚀 Please wait...
        </p>
      </div>
    ),
    { duration: 8000 } // auto close after 8s
  );

  return () => toast.dismiss(toastId);
}, []);
  useEffect(() => {
    fetchProducts();
  }, []);

  const addCarts = async (id) => {
    try {
      await API.post("/products/add", {
        id,
      });
      toast.success("Product added to cart!");
    } catch (error) {
      console.error(error.message);
      toast.error("Login or Register to add product");
    }
  };
  return (
    <div>
      <div className="Home">
        {/* <p>Welcome back {user.name}</p> */}
        <div className="First_LandingPage">
          <h1>
            Elevate your <span>Style</span> with Precision.
          </h1>
          <p>
            Discover a curated collection of premium products designed to
            enhance your modern lifestyle. Quality meets elegance in every
            piece.
          </p>
          <div>
            <Link to="/products">Shop Now</Link>
            <Link to="/seller">Start Selling</Link>
          </div>
        </div>
        <div className="Second_LandingPage">
          <div className="first">
            <h1>Featured Products</h1>
            <Link to="/products" className="ViewAll">
              View All Products
            </Link>
          </div>
          <div className="whole_product second">
            {products.map((product) => (
              <div key={product.id} className="product">
                <p className="Category">{product.category}</p>
                <div className="IMG">
                    <ImageWithSkeleton src={product.image} alt={product.name} />
                </div>
                <div className="Other_parts">
                  <div>
                    <h2> {product.name}</h2>
                    <p className="desc">{product.description}</p>
                    <p className="sold_by">
                      Sold by <span>{product.seller_name}</span>
                    </p>
                  </div>
                  <div className="price_Addtocart">
                    <p className="product_price">{product.price}$</p>

                    <div className="Buttons">
                      <button onClick={() => addCarts(product.id)}>
                        <img src="/content/cartplus.svg" alt="" />
                      </button>
                      <button
                        onClick={() => navigate(`/products/${product.id}`)}
                      >
                        <img src="/content/eye.svg" alt="" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
