import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "../Landing/Home";
import About from "../Landing/About";
import Connect from "../Landing/Connect";
import Features from "../Landing/Features";
import SignIn from "../Auth/SignIn";
import SignUp from "../Auth/SignUp";
import NavBar from "../components/NavBar"; // Navbar component for navigation
import Footer from "../components/Footer";
import "../App";

const PublicRoutes = () => {
  const location = useLocation();
  const [scrollToSection, setScrollToSection] = useState(() => () => {});

  const hideNavbarRoutes = ["/login", "/register"]; // Add '/register' if you make one
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="App">
      {!shouldHideNavbar && <NavBar scrollToSection={scrollToSection} />}
      <div className="main-content">
        <Routes>
            <Route path="/" element={<Home setScrollToSection={setScrollToSection}  />} />
            <Route path="/home" element={<Home setScrollToSection={setScrollToSection}  />} />
            <Route path="/about" element={<About />} />
            <Route path="/Connect" element={<Connect />} />
            <Route path="/Features" element={<Features />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
        </Routes>
      </div>
      <Footer /> {/* Footer added here */}
    </div>
  );
};

export default PublicRoutes;
