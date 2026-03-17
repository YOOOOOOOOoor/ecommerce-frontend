import React, { useState, useEffect } from "react";
// import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../components/Auth.css";
import API from "../Api/api.js";

const Login = ({ setUser, user }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      setUser(res.data.users);
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="auth_split">
      <div className="auth_left">
        <h1>EthioCart</h1>
        <p>Welcome back shopper 🛍️</p>
      </div>

      <form className="auth_right" onSubmit={submit}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button>Login</button>

        <p>
          Don’t have account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
