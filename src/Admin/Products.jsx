import React from "react";
import { useState, useEffect } from "react";
import API from "../Api/api.js";
import Add from "./products/Add.jsx";
import UaD from "./products/UaD.jsx";

const Products = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFIlter] = useState({
    search: "",
    category: "all",
  });

  const refreshPage = () => {
    setRefreshKey(refreshKey + 1);
  };

  const fetchProducts = async () => {
    try {
      const res = await API.get("/admin/products", {
        params: { page: page, limit: 3, ...filter },
      });
      setProducts(res.data.product);
      setTotalPages(res.data.totalPages);
      // setTotalProducts(res.data.total);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, refreshKey, filter]);

  useEffect(() => {
    setPage(1);
  }, [refreshKey, filter]);

  return (
    <div className="part-admin">
      {/* <h1>Dashboard {totalProducts}</h1> */}
      <div className="Top-part-admin">
        <div>
          <h2>Product Management</h2>
          <p>Manage your marketplace inventory, pricing, and sellers.</p>
        </div>
        <div>
          <Add onSuccess={refreshPage} />
        </div>
      </div>
      <div className="Bottom-part-admin">
        <div className="conatainer">
          <div className="search" style={{ display: "flex" }}>
            <div>
              <img src="/IMG/search.svg" alt="" />
              <input
                type="text"
                name=""
                id=""
                value={filter.search}
                onChange={(e) =>
                  setFIlter({ ...filter, search: e.target.value })
                }
              />
            </div>
            <div>
              <select
                name=""
                id=""
                onChange={(e) =>
                  setFIlter({ ...filter, category: e.target.value })
                }
              >
                <option value="all">All</option>
                <option value="electronics">electronics</option>
                <option value="shoes">shoes</option>
                <option value="clothes">clothes</option>
              </select>
            </div>
          </div>
          <div className="view">
            <table className="admin-table">
              <thead>
                <tr className="idk">
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Seller</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody className="users">
                {products.map((i) => (
                  <tr key={i.id} className="users-admin">
                    <td className="product-name">
                      <img src="/IMG/product.svg" alt="" /> {i.name}
                    </td>
                    <td className="category">
                      <span>{i.category}</span>
                    </td>
                    <td>${i.price}</td>
                    <td className="seller_name">{i.seller_name}</td>
                    <td>
                      <UaD i={i} onSuccess={refreshPage} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="prev-next">
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>
            Previous
          </button>
          <span>
            {page}/{totalPages}
          </span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
