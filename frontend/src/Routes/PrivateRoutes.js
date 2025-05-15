import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "../Pages/Landing/Landing";
import SignIn from "../Pages/Auth/SignIn";
import SignUp from "../Pages/Auth/SignUp";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import "../App";

import Market from "../Pages/Insights/Market/Market";
import Tool from "../Pages/Tools/Tool";
import Insights from "../Pages/Insights/Insights";
import HomePriv from "../Pages/Home/Home";
import Track from "../Pages/Expenses/Expenses";
import Profile from "../Pages/Profile/Profile";
import GoalsOverview from "../Pages/FinancialPlanner/GoalsOverview";
import GoalsProfile from "../Pages/FinancialPlanner/GoalsProfile";

const PrivateRoutes = () => {
  return (
    <div className="App-private">
      <div className="app-content">
        {/* <div className="filler" /> */}
        <SideBar />
        <div className="app-content-path">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/market" element={<Market />} />
            <Route path="/tool" element={<Tool />} />
            <Route path="/Insights" element={<Insights />} />
            <Route path="/Home" element={<HomePriv />} />
            <Route path="/Track" element={<Track />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/GoalsOverview" element={<GoalsOverview />} />
            <Route path="/Goals-Profile" element={<GoalsProfile />} />
          </Routes>
        </div>
      </div>
      <Footer /> {/* Footer added here */}
    </div>
  );
};

export default PrivateRoutes;
