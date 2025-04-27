import React from "react";
import Sidebar from "../components/Sidebar";

function MainLayout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: "265px", width: "100%" }}>
        {children}
      </div>
    </div>
  );
}

export default MainLayout;
