import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isNavActive, setIsNavActive] = useState(false);

  const toggleNav = () => {
    setIsNavActive(!isNavActive);
  };

  return (
    <header className="navbar">
      <div className="logo"></div>

      <div className="hamburger" onClick={toggleNav}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`navLinks ${isNavActive ? "active" : ""}`}>
        <a href="#">Home</a>
        <a href="#">About Us</a>
        <a href="#">Sponsors</a>
        <a href="#">FAQ</a>
        <a href="#">Contact Us</a>
        <button className="login">Login</button>
      </div>
    </header>
  );
};

export default Navbar;
