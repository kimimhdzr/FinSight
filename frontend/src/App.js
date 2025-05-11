import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import About from "./Landing/About";
import Connect from "./Landing/Connect";
import Features from "./Landing/Features";
import Home from "./Landing/Home";
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SignUp";
import NavBar from "./components/NavBar"; // Navbar component for navigation
import Footer from "./components/Footer";
import Market from "./Insights/Market";
import Tool from "./Tool/Home";

const AppWrapper = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/register"]; // Add '/register' if you make one

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="App">
      {!shouldHideNavbar && <NavBar />}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="/features" element={<Features />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/market" element={<Market />} />
          <Route path="/tool" element={<Tool />} />
        </Routes>
      </div>
      <Footer /> {/* Footer added here */}
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
