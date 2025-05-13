import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "../Pages/Landing/Landing";
import About from "../Pages/Landing/About";
import Connect from "../Pages/Landing/Connect";
import Features from "../Pages/Landing/Features";
import SignIn from "../Pages/Auth/SignIn";
import SignUp from "../Pages/Auth/SignUp";
import SignUp2 from "../Pages/Auth/SignUp2";
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import ForgotPassword2 from "../Pages/Auth/ForgotPassword2";
import NavBar from "../components/NavBar"; // Navbar component for navigation
import Footer from "../components/Footer";
import "../App";

const PublicRoutes = () => {
  const location = useLocation();
  const [scrollToSection, setScrollToSection] = useState(() => () => {});

  const hideNavbarRoutes = ["/login", "/register", "/confirm-password", "/forgotpassword", "/create-new-password"]; // Add '/register' if you make one
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="App">
      {!shouldHideNavbar && <NavBar scrollToSection={scrollToSection} />}
      <div className="main-content">
        <Routes>
          <Route
            path="/"
            element={<Home setScrollToSection={setScrollToSection} />}
          />
          <Route
            path="/landing"
            element={<Home setScrollToSection={setScrollToSection} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/Connect" element={<Connect />} />
          <Route path="/Features" element={<Features />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/confirm-password" element={<SignUp2 />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/create-new-password" element={<ForgotPassword2 />} />
        </Routes>
      </div>
      <Footer /> {/* Footer added here */}
    </div>
  );
};

export default PublicRoutes;
