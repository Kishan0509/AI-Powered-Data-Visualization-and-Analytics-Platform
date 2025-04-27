import React from "react";
import "./Footer.css";
import PageWrapper from "../components/PageWrapper";

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Infotact Project | All rights reserved</p>
    </footer>
  );
};

export default Footer;