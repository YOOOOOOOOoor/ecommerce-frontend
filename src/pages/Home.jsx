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
  // 👇 run only once per browser session
  const alreadyShown = sessionStorage.getItem("server-toast-shown");

  if (alreadyShown) return;

  sessionStorage.setItem("server-toast-shown", "true");

  let seconds = 60;

  const renderToast = (t) => (
    <div
      style={{
        background: "#111827",
        color: "white",
        padding: "16px",
        borderRadius: "12px",
        width: "340px",
        boxShadow: "0 10px 30px rgba(0,0,0,.3)",
        position: "relative",
      }}
    >
      <button
        onClick={() => toast.dismiss(t.id)}
        style={{
          position: "absolute",
          top: 8,
          right: 10,
          background: "transparent",
          border: "none",
          color: "#aaa",
          cursor: "pointer",
          fontSize: "18px",
        }}
      >
        ✕
      </button>

      <strong>⚡ First Visit?</strong>

      <p style={{ marginTop: 8, lineHeight: 1.5 }}>
        I'm using <b>Render's free hosting</b>, so the first visit can take up
        to one minute.
        <br />
        <br />
        Feel free to explore — everything will load shortly.
      </p>

      <p style={{ marginTop: 10, color: "#60a5fa", fontWeight: "bold" }}>
        🚀 Waking up the server... {seconds}s
      </p>
    </div>
  );

  const toastId = toast.custom(renderToast, {
    duration: Infinity,
  });

  const interval = setInterval(() => {
    seconds--;

    toast.custom(renderToast, {
      id: toastId,
      duration: Infinity,
    });

    if (seconds <= 0) {
      clearInterval(interval);
      toast.dismiss(toastId);
      toast.success("✅ Server is awake!");
    }
  }, 1000);

  return () => {
    clearInterval(interval);
    toast.dismiss(toastId);
  };
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
