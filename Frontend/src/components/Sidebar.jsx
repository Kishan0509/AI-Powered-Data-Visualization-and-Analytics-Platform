import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaTachometerAlt, FaUpload, FaChartBar, FaBrain, FaSignOutAlt } from "react-icons/fa";
import "../styles/Sidebar.css";

function Sidebar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>AI Insights</h2>
      </div>

      <ul className="sidebar-menu">
        <li className={isActive("/dashboard") ? "active" : ""}>
          <Link to="/dashboard"><FaTachometerAlt /> Dashboard</Link>
        </li>
        <li className={isActive("/upload") ? "active" : ""}>
          <Link to="/upload"><FaUpload /> Upload</Link>
        </li>
        <li className={isActive("/graphs") ? "active" : ""}>
          <Link to="/graphs"><FaChartBar /> Graphs</Link>
        </li>
        <li className={isActive("/insights") ? "active" : ""}>
          <Link to="/insights"><FaBrain /> Insights</Link>
        </li>
      </ul>

      <div className="sidebar-footer">
        <button onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}>
          <FaSignOutAlt style={{ marginRight: "8px" }} />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
