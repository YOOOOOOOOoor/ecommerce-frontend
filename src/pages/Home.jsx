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
  // Show only once per browser session
  if (sessionStorage.getItem("server-toast-shown")) return;

  sessionStorage.setItem("server-toast-shown", "true");

  let seconds = 60;

  const id = toast.loading(
    `🚀 Waking up the server... ${seconds}s`,
    {
      duration: 45000,
    }
  );

  const timer = setInterval(() => {
    seconds--;

    toast.loading(
      `🚀 Waking up the server... ${seconds}s

I'm using Render's free hosting, so the first visit can take up to one minute.

Feel free to explore the page and everything should be ready shortly.`,
      {
        id,
        duration: 45000,
      }
    );

    if (seconds <= 0) {
      clearInterval(timer);
      toast.success("✅ Server should now be ready!", {
        id,
        duration: 3000,
      });
    }
  }, 1000);

  return () => {
    clearInterval(timer);
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
