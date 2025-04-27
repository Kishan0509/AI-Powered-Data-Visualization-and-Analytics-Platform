import React from "react";
import Sidebar from "../components/Sidebar";
import "./MainLayout.css";

function MainLayout({ children }) {
  const isLoggedIn = localStorage.getItem("token");

  return (
    <div className={`main-layout ${isLoggedIn ? 'layout-with-sidebar' : ''}`}>
      {isLoggedIn && <Sidebar />}
      <div className="content">{children}</div>
    </div>
  );
}

export default MainLayout;
