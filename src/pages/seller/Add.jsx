import React from "react";
import { useState } from "react";
// import axios from "axios";
import API from "../../Api/api.js";

const Add = ({ onSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 3000,
    image: "",
    category: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");

  const sendForm = async (e) => {
    e.preventDefault();
    if (
      !form.name ||
      !form.description ||
      !form.price ||
      !form.image ||
      !form.category
    ) {
      return setError("Please fill all the fields");
    }
    try {
      await API.post("/seller", form);
      setForm({
        name: "",
        description: "",
        price: 3000,
        image: "",
        category: "",
      });
      setError("");
      setShowForm(false);
      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <button onClick={() => setShowForm(true)} className="Add_products">
        Add products
      </button>
      {showForm && (
        <div className="Whole" onClick={() => setShowForm(false)}>
          <div onClick={(e) => e.stopPropagation()} className="form">
            <form onSubmit={sendForm}>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <label>
                <span>Products Name:</span>
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
                <span>Price: ${form.price}</span>

                <input
                  type="range"
                  min="0"
                  step={5}
                  max={3000}
                  value={form.price}
                  onChange={(e) =>
                    setForm({ ...form, price: Number(e.target.value) })
                  }
                />
              </label>

              <label>
                <span>Image:</span>
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
                <option value="electronics">Electonics</option>
                <option value="shoes">Shoes</option>
                <option value="clothes">Clothes</option>
              </select>
              <div className="editAdel subAndCAncel">
                <button>Submit</button>
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

export default Add;
