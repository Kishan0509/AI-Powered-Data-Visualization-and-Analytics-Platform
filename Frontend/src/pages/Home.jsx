import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/upload");
    }
  }, [navigate]);

  return (
    <div className="home-container">
      <div className="home-overlay">
        <div className="home-content fade-in">
          <h1> Welcome to <span>AI Insights Platform</span></h1>
          <p>Smart Data Visualization & AI-Powered Insights in One Place.</p>
          <div className="home-buttons">
            <button className="primary-btn" onClick={() => navigate("/login")}>  Login </button>
            <button className="secondary-btn" onClick={() => navigate("/signup")}>  Sign Up </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
