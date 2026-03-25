import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Api/api.js";
import toast from "react-hot-toast"; // <-- import toast

const Carts = ({ user }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const fetchItems = async () => {
    try {
      const res = await API.get("/carts");
      setProducts(res.data.products);
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to fetch cart items."); // <-- toast error
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const increaseItem = async (id) => {
    await API.post("/products/add", { id });
    fetchItems();
  };
  const decreaseQty = async (cartId) => {
    await API.put(`/carts/decrease/${cartId}`);
    fetchItems();
  };

  const del = async (id) => {
    try {
      await API.delete(`/carts/delete/${id}`);
      await fetchItems();
      toast.success("Item removed from cart!"); // <-- toast success
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to remove item."); // <-- toast error
    }
  };

  const finalTotal = products.reduce(
    (sum, product) => sum + Number(product.total_price),
    0,
  );

  return (
    <main className="Carts">
      <div className="Shoping_cart">
        <h1>Shopping Cart</h1>
      </div>
      <div className="cart_and_total">
        <div className="cart_product">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="products">
                <div>
                  <img src={product.image} alt="" />
                </div>

                <div className="Others">
                  <div className="NameAndPrice">
                    <p>{product.name}</p>
                    <p className="price">${product.price}</p>
                  </div>

                  <div className="Description_cart">
                    <p>{product.category}</p>
                  </div>
                  <div className="QuantAndRemove">
                    <div className="QuantAndAS">
                      <button onClick={() => decreaseQty(product.cart_id)}>
                        -
                      </button>
                      <p>{product.quantity}</p>
                      <button onClick={() => increaseItem(product.id)}>
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => del(product.cart_id)}
                      className="remove"
                      id="red"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="subTotal">
                    <p>
                      Subtotal: <span>${product.total_price}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="cart_empty">
              <div
                className="empty"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  height: "100%",
                  // backgroundColor: "red",
                  width: "50%",
                  boxSizing: "border-box",
                  gap: "40px",
                  padding: "20px 0 0 0 ",
                  color: "gray",
                  textAlign: "center",
                }}
              >
                <img
                  src="/content/carts.svg"
                  alt=""
                  style={{
                    width: "60px",
                    height: "60px",
                    // backg  roundColor: "red",
                    borderRadius: "0px",
                  }}
                />

                <p style={{ fontSize: "20px", fontWeight: "600" }}>
                  Your cart is empty
                </p>

                <p>
                  Looks like you haven’t added anything yet. Start shopping and
                  fill your cart with amazing products.
                </p>

                <button
                  onClick={() => navigate("/products")}
                  className="Add_products"
                  style={{ width: "100%" }}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="total">
          <div className="Summary">
            <img src="/content/credit-card.svg" alt="" />
            <h1>Summary</h1>
          </div>
          <div className="subtotalAndshippingAndtax">
            <div>
              <p>Subtotal</p>
              <p className="Second">${finalTotal.toFixed(2)}</p>
            </div>
            <div>
              <p>Shipping</p>
              <p className="Second">FREE</p>
            </div>
            <div>
              <p>Estimated Tax (15%)</p>
              <p className="Second">${(finalTotal * 0.15).toFixed(2)}</p>
            </div>
          </div>
          <div className="totalAndTotalPrice">
            <p>Total</p>
            <p className="Second">${(finalTotal * 1.15).toFixed(2)}</p>
          </div>
          <div className="CheckOut">
            <button>Checkout</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Carts;
