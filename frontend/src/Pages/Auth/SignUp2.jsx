import React, { useState } from "react";
import { useLocation,  useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SignUp.css";
// import { auth } from "../firebaseConfig";
// import { signInWithEmailAndPassword } from "firebase/auth";
import { Toaster, toast } from "react-hot-toast";

import axios from "axios";

const SignUp2 = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state;

  const handleRegister = async () => {
    if (!userData) {
      toast.error("Missing registration data.");
      return navigate("/register");
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        ...userData,
        password,
      });

      toast.success("🎉 Registration successful!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      console.error(error);
      toast.error("❌ Registration failed.");
    }
  };

  return (
    <div className="login-container">
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="login-text-container">
         <span className="auth-logo-title" onClick={() => navigate("/landing")}>
          Insight
        </span>
        <h1>You’re Almost Done</h1>
        <p>Please set your password to complete your sign-up process</p>
        <div className="login-form-container">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button className="login-button" onClick={handleRegister}>
            Complete Sign Up
          </button>
          <button
            className="register-button"
            onClick={() => navigate("/register")}
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

export default SignUp2;
