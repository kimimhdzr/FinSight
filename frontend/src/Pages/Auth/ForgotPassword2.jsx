import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SignIn.css";
// import { auth } from "../firebaseConfig";
// import { signInWithEmailAndPassword } from "firebase/auth";
import { Toaster, toast } from "react-hot-toast";

import axios from "axios";

const ForgotPassword2 = () => {
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
        <h1>Hello!</h1>
        <h1>Create a New Password</h1>
        <p>
          Your security matters. Choose a strong, memorable password and confirm
          it below to update your account. It’s a simple step toward keeping
          your financial data safe.
        </p>
        <div className="login-form-container">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Reconfirm Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-button" onClick={() => navigate("/login")}>
            Next
          </button>
          <button
            className="register-button"
            onClick={() => navigate("/forgotpassword")}
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

export default ForgotPassword2;
