import React from "react";
import { useState, useEffect } from "react";
// import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import API from "../Api/api.js";

const ProductsDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  const fetchProduct = async () => {
    try {
      const res = await API.get(`/products/${id}`);
      setProduct(res.data);
      setError("");
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("404 Product not found");
      } else {
        setError("Something went wrong");
      }
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (error) {
    return <h2>{error}</h2>;
  }

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";

    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";

    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";

    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";

    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";

    return "just now";
  };

  const addCarts = async (id) => {
    try {
      await API.post("/products/add", {
        id,
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="products_detail">
      {product && (
        <div className="prod">
          <div className="back_to_results">
            <img src="/content/left-arrow.svg" alt="" />
            <Link to="/products">Back to results</Link>
          </div>
          <div className="inside_detail">
            <div className="left">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="right">
              <p className="category">{product.category}</p>
              <h1 className="Name">{product.name}</h1>
              <p className="desc">{product.description}</p>
              <p className="sold_by">
                Sold by <span>{product.seller_name}</span>
              </p>

              <p className="price">${product.price}</p>
              <button
                className="Add_to_cart"
                onClick={() => addCarts(product.id)}
              >
                <img src="/content/add-cart-white.svg" alt="" />
                <span>Add to cart</span>
              </button>

              <p className="time">Added {timeAgo(product.created_at)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsDetail;
