import React from "react";
import { useState } from "react";
import API from "../../Api/api.js";
import toast from "react-hot-toast";

const UaD = ({ onSuccess, i }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 3000,
    image: "",
    category: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

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

  const deleteProduct = async (id) => {
    try {
      await API.delete(`/admin/products/delete/${id}`);
      toast.success("Product deleted successfully!"); // <-- toast success
      onSuccess();
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to delete product."); // <-- toast error
    }
  };
  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/admin/products/update/${editId}`, form);
      setEditId(null);
      setShowForm(false);
      setForm({
        name: "",
        description: "",
        price: 3000,
        image: "",
        category: "",
      });
      toast.success("Product updated successfully!"); // <-- toast success
      onSuccess();
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to update product."); // <-- toast error
    }
  };
  return (
    <div>
      <div className="editAdel">
        <button onClick={() => startEdit(i)}>Edit</button>
        <button onClick={() => deleteProduct(i.id)} id="red">
          Delete
        </button>
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
    </div>
  );
};

export default UaD;
