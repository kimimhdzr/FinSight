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
  const [email, setEmail] = useState("");

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
        <h1>Oops,</h1>
        <h1>Don’t Worry</h1>
        <p>
          It seems you’ve forgotten your password, don’t worry, we will help you get it back !
        </p>
        <div className="login-form-container">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="login-button"
            onClick={() => navigate("/login")}
          >
            Retrieve
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
