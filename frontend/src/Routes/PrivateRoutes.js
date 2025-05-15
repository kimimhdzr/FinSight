import React from "react";
import {
  Route,
  Routes,
} from "react-router-dom";
import Home from "../Landing/Home";
import SignIn from "../Auth/SignIn";
import SignUp from "../Auth/SignUp";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../App.css";

import Market from "../Insights/Market";
import Tool from "../Tool/Home";

const PrivateRoutes = () => {
  return (
    <div className="App">
      <NavBar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
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

export default PrivateRoutes;
