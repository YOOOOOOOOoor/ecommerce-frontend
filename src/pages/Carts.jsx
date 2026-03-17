import React from "react";
import { useState, useEffect } from "react";
// import axios from "axios";
import API from "../Api/api.js";

const Carts = () => {
  const [products, setProducts] = useState([]);
  // console.log(products);
  const fetchItems = async () => {
    try {
      const res = await API.get("/carts");
      setProducts(res.data.products);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const del = async (id) => {
    try {
      await API.delete(`/carts/delete/${id}`);
      await fetchItems();
    } catch (error) {
      console.error(error.message);
    }
  };

  const finalTotal = products.reduce(
    (sum, product) => sum + Number(product.total_price),
    0,
  );

  // console.log(products, products[0]);

  return (
    <main className="Carts">
      <div className="Shoping_cart">
        <h1>Shopping Cart</h1>
      </div>
      <div className="cart_and_total">
        <div className="cart_product">
          {products.length === 0 ? (
            <p>Cart is Empty</p>
          ) : (
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
                      <button>-</button>
                      <p>{product.quantity}</p>
                      <button>+</button>
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
              <p className="Second">${finalTotal.toFixed(2) * 0.15}</p>
            </div>
          </div>
          <div className="totalAndTotalPrice">
            <p>Total</p>
            <p className="Second">${finalTotal.toFixed(2) * 1.15}</p>
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
