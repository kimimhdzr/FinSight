import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./NavBar.css";

const NavBar = ({ scrollToSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100); // adjust scroll trigger as needed
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    if (location.pathname === "/" || location.pathname === "/home") {
      scrollToSection(sectionId);
    } else {
      navigate("/");
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100); // Small delay to ensure Home is rendered
    }
  };

  return (
    <nav className={isScrolled ? "scrolled" : "transparent"}>
      <div className="navbar-container">
        <div className="navbar-left">
          <h3>FinSight</h3>
        </div>
        <div className="navbar-center">
          <Link to="/landing">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/Features">Features</Link>
          <Link to="/Connect">Connect</Link>
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
