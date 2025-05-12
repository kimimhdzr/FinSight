import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "../Landing/Home";
import SignIn from "../Auth/SignIn";
import SignUp from "../Auth/SignUp";
import Footer from "../components/Footer";
import "../App";

import Market from "../Insights/Market"
import Tool from "../Tool/Home"

const PrivateRoutes = () => {
  return (
    <div className="App">
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
