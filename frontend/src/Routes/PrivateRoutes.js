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
import AIAdvisor from "../Pages/Insights/AI_module/AIInvestmentAdvisor";
import HomePriv from "../Pages/Home/Home";
import Expenses from "../Pages/Expenses/Expenses";
import Record from "../Pages/Expenses/Record";
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
            
            {/* Landing */}
            <Route path="/" element={<Home />} />
            
            {/* Auth */}
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />


            {/* Home */}
            <Route path="/Home" element={<HomePriv />} />

            {/* Goals */}
            <Route path="/GoalsOverview" element={<GoalsOverview />} />
            <Route path="/Goals-Profile" element={<GoalsProfile />} />
            
            {/* AI Advisor */}
            <Route path="/AIAdvisor" element={<AIAdvisor />} />

            {/* Market */}
            <Route path="/Market" element={<Market />} />
            
            {/* Tools */}
            <Route path="/Tool" element={<Tool />} />
            
            {/* Tracker */}
            {/* <Route path="/Track" element={<Expenses />} /> */}
            <Route path="/Track" element={<Record />} />
            
            {/* Profile */}
            <Route path="/Profile" element={<Profile />} />


          </Routes>
        </div>
      </div>
      <Footer /> {/* Footer added here */}
    </div>
  );
};

export default PrivateRoutes;
