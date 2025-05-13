import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SignIn.css";
// import { auth } from "../firebaseConfig";
// import { signInWithEmailAndPassword } from "firebase/auth";
import { Toaster, toast } from "react-hot-toast";

import axios from "axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    // try {
    //   const userCredential = await signInWithEmailAndPassword(auth, email, password);
    //   toast.success("🎉 Login successful!");
    //   // Navigate to home after short delay
    //   setTimeout(() => navigate("/Home"), 2000);
    // } catch (error) {
    //   console.error("Login error:", error);
    //   toast.error("❌ Login failed. Please check your credentials.");
    // }
  };

  return (
    <div className="login-container">
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="login-text-container">
        <span className="auth-logo-title" onClick={() => navigate("/landing")}>
          Insight
        </span>
        <h1>Hello!</h1>
        <h1>Welcome Back!</h1>
        <p>
          Welcome back! Log in to stay on top of your finances with smart
          budgeting tools, real-time tracking, and personalized AI-driven
          insights—all designed to help you plan better, spend wiser, and reach
          your financial goals faster.
        </p>
        <div className="login-form-container">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="forgot-password"
            onClick={() => navigate("/forgotpassword")}
          >
            Forgot Password?
          </span>

          <button
            className="login-button"
            onClick={() => navigate("/app/home")}
          >
            Login
          </button>
          <button
            className="register-button"
            onClick={() => navigate("/register")}
          >
            Go to Register
          </button>
        </div>
      </div>
      <div className="login-image-container">
        <img
          src="staticimages/homebanner.jpeg"
          alt="Login Visual"
          className="login-image"
        />
      </div>
    </div>
  );
};

export default SignIn;
