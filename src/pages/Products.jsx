import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Api/api.js";
import toast from "react-hot-toast"; // <-- import toast

const Products = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: "all",
    price: 3000,
    search: "",
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products", {
        params: { ...filters, page, limit: 6 },
      });
      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);
      setTotalProducts(res.data.total);
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to fetch products."); // <-- toast error
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters, page]);

  // Add product to cart
  const addCarts = async (id) => {
    try {
      await API.post("/products/add", { id });
      toast.success("Product added to cart!"); // <-- success toast
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to add product to cart."); // <-- error toast
    }
  };

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

  return (
    <main className="Products_page">
      <div className="Filter_and_Products">
        <div className="Filter">
          <h1>Filters</h1>
          <div className="search">
            <input
              type="text"
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
              value={filters.search}
            />
            <img src="/content/search.svg" alt="" />
            <p>Search Products</p>
          </div>

          <div className="categoryFilter">
            <h4>Category</h4>
            {["all", "electronics", "shoes", "clothes"].map((i) => (
              <label key={i}>
                <input
                  type="radio"
                  value={i}
                  checked={filters.category === i}
                  onChange={(e) =>
                    setFilters({ ...filters, category: e.target.value })
                  }
                />
                <span>{i.charAt(0).toUpperCase() + i.slice(1)}</span>
              </label>
            ))}
          </div>

          <div className="range">
            <div className="amount">
              <p>Price Range</p>
              <p>up to ${filters.price}</p>
            </div>
            <div>
              <input
                min={0}
                type="range"
                max="3000"
                onChange={(e) =>
                  setFilters({ ...filters, price: Number(e.target.value) })
                }
                value={filters.price}
              />
            </div>
            <div className="Max-and-min">
              <p>0$</p>
              <p>3000$</p>
            </div>
          </div>
        </div>

        <div className="Full-products">
          <div className="Total">
            <h1>Products</h1>
            <span> Showing {totalProducts} results</span>
          </div>
          <div className="whole_product">
            {products.map((product) => (
              <div key={product.id} className="product">
                <p className="Category">{product.category}</p>
                <div className="IMG">
                  <img src={product.image} alt={product.name} />
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
                  <div>
                    <p>Added {timeAgo(product.created_at)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="Pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          <img src="/content/previous.svg" alt="" />
        </button>
        <p>
          Page {page} of {totalPages}
        </p>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          <img src="/content/next.svg" alt="" />
        </button>
      </div>
    </main>
  );
};

export default Products;
