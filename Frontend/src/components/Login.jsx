import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import PageWrapper from "../components/PageWrapper";
import "../styles/Login.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      const token = res.data.token;
      localStorage.setItem("token", token);
      const decoded = jwtDecode(token);
      const role = decoded.role;

      setMessage(" Login successful! Redirecting...");
      setTimeout(() => {
        if (role === "Admin") {
          navigate("/upload");
        } else {
          navigate("/");
        }
      }, 1000);

    } catch (err) {
      setMessage(` ${err.response?.data?.msg || "Login failed!"}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log("Google user: ", decoded);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/google", {
        token: credentialResponse.credential,
      });
      const token = res.data.token;
      localStorage.setItem("token", token);
      const userData = jwtDecode(token);
      const role = userData.role;

      setMessage(" Google Login Successful! Redirecting...");
      setTimeout(() => {
        if (role === "Admin") {
          navigate("/upload");
        } else {
          navigate("/");
        }
      }, 1000);

    } catch (error) {
      console.error("Google Login Error:", error);
      setMessage(" Google login failed. Please try again.");
    }
  };

  const handleGoogleFailure = (error) => {
    console.error("Google Login Failed:", error);
    setMessage(" Google login failed. Please try again.");
  };

  return (
    <PageWrapper>
      <div className="login-page">
        <div className="login-card">
          <h2>🔐 Welcome Back</h2>
          <p className="login-subtext">Login to your account</p>

          <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
            {message && (
              <p className={message.includes("✅") ? "success-message" : "error-message"}> {message} </p> )}
            <button type="submit" className="btn-primary" disabled={loading}> {loading ? "🔄 Logging in..." : "🚀 Login"} </button>
          </form>

          <div className="google-login">
            <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleFailure} />
          </div>

          <p className="auth-link">
            New here? <Link to="/signup">Create an account</Link>
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}

export default Login;
