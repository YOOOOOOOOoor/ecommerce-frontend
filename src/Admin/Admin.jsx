import React from "react";
import { useState, useEffect } from "react";
import "./Admin.css";
import Users from "./Users";
import { useNavigate } from "react-router-dom";
import Products from "./Products";
const Admin = ({ user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
    if (user.role !== "admin") {
      navigate("/");
    }
  });

  const [active, setActive] = useState("user");
  return (
    <div className="Admin">
      <div className="Admin-Filter">
        {["user", "products"].map((i) => (
          <label key={i} className={active === i ? "active" : ""}>
            <input
              type="radio"
              value={i}
              checked={active === i}
              onChange={(e) => setActive(e.target.value)}
            />
            <span> {i}</span>
          </label>
        ))}
      </div>
      <div className="show">jfroi</div>
      <div className="Admin-Content">
        {active === "user" && <Users />}
        {active === "products" && <Products />}
      </div>
    </div>
  );
};

export default Admin;
