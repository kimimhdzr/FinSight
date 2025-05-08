import "./App.css";
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import About from "./Landing/About";
import Connect from "./Landing/Connect";
import Features from "./Landing/Features";
import Home from "./Landing/Home";
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SignUp";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Dashboard from "./Dashboard/Dashboard";

const AppWrapper = () => {
  const location = useLocation();

  const hideNavbarRoutes = ["/login", "/register"];
  const hideSidebarRoutes = ["/", "/login", "/register"];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);
  const shouldHideSidebar = hideSidebarRoutes.includes(location.pathname);

  return (
    <div className="App">
      {!shouldHideNavbar && <NavBar />}
      <div className="main-content" style={{ display: "flex" }}>
        {!shouldHideSidebar && <SideBar />}
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/connect" element={<Connect />} />
            <Route path="/features" element={<Features />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
};

export default App;