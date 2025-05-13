import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SignIn.css";
// import { auth } from "../firebaseConfig";
// import { signInWithEmailAndPassword } from "firebase/auth";
import { Toaster, toast } from "react-hot-toast";

import axios from "axios";

const ForgotPassword = () => {
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
        <h1>Confirm Your Identity</h1>
        <p>
          Keep your account safe and secure by updating your password regularly.
          Before we make any changes, let’s make sure it’s really you. Please
          enter your current password to continue
        </p>
        <div className="login-form-container">
        
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="login-button"
            onClick={() => navigate("/create-new-password")}
          >
            Next
          </button>
          <button
            className="register-button"
            onClick={() => navigate("/login")}
          >
            Back
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

export default ForgotPassword;
