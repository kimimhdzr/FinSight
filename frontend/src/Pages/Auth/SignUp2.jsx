import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SignUp.css";
// import { auth } from "../firebaseConfig";
// import { signInWithEmailAndPassword } from "firebase/auth";
import { Toaster, toast } from "react-hot-toast";

import axios from "axios";

const SignUp2 = () => {
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  return (
    <div className="login-container">
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="login-text-container">
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
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-button" onClick={() => navigate("/login")}>
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
