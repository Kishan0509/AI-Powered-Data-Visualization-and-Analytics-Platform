import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import PageWrapper from "../components/PageWrapper";
import "../styles/Signup.css";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        form
      );
      const token = res.data.token;
      localStorage.setItem("token", token);

      const decoded = jwtDecode(token);
      const role = decoded.role;

      setMessage(" Signup successful! Redirecting...");
      setTimeout(() => {
        if (role === "Admin") {
          navigate("/upload");
        } else {
          navigate("/");
        }
      }, 1000);

    } catch (err) {
      setMessage(` ${err.response?.data?.msg || "Signup failed!"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <div className="signup-page">
        <div className="signup-card">
          <h2>📝 Create an Account</h2>
          <p className="signup-subtext">Start your data journey</p>

          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email ID" value={form.email} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />

            {message && (
              <p className={message.includes("✅") ? "success-message" : "error-message"}>
                {message}
              </p>
            )}
            <button type="submit" className="btn-primary" disabled={loading}> {loading ? "🔄 Creating account..." : "🚀 Sign Up"} </button>
          </form>

          <p className="auth-link">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Login</span>
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}

export default Signup;
