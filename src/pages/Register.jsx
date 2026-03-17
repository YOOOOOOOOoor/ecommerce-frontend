import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../components/Auth.css";
import API from "../Api/api.js";
import toast from "react-hot-toast"; // <-- import toast

const Register = ({ setUser, user }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", form);
      setUser(res.data.users);
      toast.success("Account created successfully!"); // <-- success toast
      navigate("/");
    } catch (err) {
      console.log(err.message);
      toast.error("Registration failed. Please try again."); // <-- error toast
    }
  };

  return (
    <div className="auth_split">
      <div className="auth_left">
        <h1>EthioCart</h1>
        <p>Start your shopping journey today</p>
      </div>

      <form className="auth_right" onSubmit={submit}>
        <h2>Create Account</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

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

        <button>Create Account</button>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
