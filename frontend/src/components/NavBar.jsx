import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100); // adjust scroll trigger as needed
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={isScrolled ? "scrolled" : "transparent"}>
      <div className="navbar-container">
        <div className="navbar-left">
          <h3>FinSight</h3>
        </div>
        <div className="navbar-center">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/features">Features</Link>
          <Link to="/connect">Connect</Link>
        </div>
        <div className="navbar-right">
          <button className="btnLogin" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="btnRegister" onClick={() => navigate("/register")}>
            Register
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
