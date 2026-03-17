import React, { useState, useEffect } from "react";
import API from "../../Api/api.js";
import toast from "react-hot-toast"; // <-- import toast

const VaE = ({ refershKey }) => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 3000,
    image: "",
    category: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);

  const startEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category,
    });
    setEditId(product.id);
    setShowForm(true);
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/seller/update/${editId}`, form);
      setEditId(null);
      setShowForm(false);
      setForm({
        name: "",
        description: "",
        price: 3000,
        image: "",
        category: "",
      });
      await fetchProducts();
      toast.success("Product updated successfully!"); // <-- toast success
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to update product."); // <-- toast error
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await API.get("/seller", { params: { page, limit: 4 } });
      setProducts(res.data.products);
      setTotalPage(res.data.totalPages);
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to fetch products."); // <-- toast error
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [refershKey, page]);

  const deleteProduct = async (id) => {
    try {
      await API.delete(`/seller/delete/${id}`);
      await fetchProducts();
      toast.success("Product deleted successfully!"); // <-- toast success
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to delete product."); // <-- toast error
    }
  };

  return (
    <main className="Edit_and_delete">
      <h1>Products</h1>

      <div className="whole_product seller">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="product">
              <p className="Category">{product.category}</p>
              <div className="IMG">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="Other_parts">
                <div>
                  <h2> {product.name}</h2>
                  <p className="desc">{product.description}</p>
                </div>
                <div className="price_Addtocart">
                  <p className="product_price">{product.price}$</p>
                </div>
                <div className="editAdel">
                  <button onClick={() => startEdit(product)}>Edit</button>
                  <button onClick={() => deleteProduct(product.id)} id="red">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div
            className=""
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              // backgroundColor: "red",
              width: "100%",
              alignItems: "center",
              height: "50vh",
              boxSizing: "border-box",
              alignSelf: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                // backgroundColor: "blue",
                height: "100%",
                width: "30%",
                boxSizing: "border-box",
                // justifyContent: "space-around",
                gap: "20px",
                color: "gray",
              }}
            >
              <img
                src="/content/sell-productsvg.svg"
                alt=""
                style={{ width: "50px" }}
              />
              <p>No products found.</p>
              <p style={{ textAlign: "center" }}>
                Create your first product to start selling and grow your
                business.
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="Add_products"
                style={{ width: "100%" }}
              >
                Add Product
              </button>
            </div>
          </div>
        )}
      </div>

      {showForm && (
        <div className="Whole" onClick={() => setShowForm(false)}>
          <div onClick={(e) => e.stopPropagation()} className="form">
            <form onSubmit={updateProduct}>
              <label>
                <span> Name:</span>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </label>

              <label>
                <span>Description:</span>
                <input
                  type="text"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </label>

              <label>
                <span>Price: {form.price}$</span>
                <input
                  type="range"
                  min="0"
                  max="3000"
                  step="5"
                  value={form.price}
                  onChange={(e) =>
                    setForm({ ...form, price: Number(e.target.value) })
                  }
                />
              </label>

              <label>
                <span> Image:</span>
                <input
                  type="url"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                />
              </label>

              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option value="" disabled>
                  Select category
                </option>
                <option value="electronics">Electronics</option>
                <option value="shoes">Shoes</option>
                <option value="clothes">Clothes</option>
              </select>

              <div className="editAdel Update">
                <button type="submit">Update</button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  id="red"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="Pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          <img src="/content/previous.svg" alt="" />
        </button>
        <span>
          page {page} of {totalPage}
        </span>
        <button onClick={() => setPage(page + 1)} disabled={page === totalPage}>
          <img src="/content/next.svg" alt="" />
        </button>
      </div>
    </main>
  );
};

export default VaE;
