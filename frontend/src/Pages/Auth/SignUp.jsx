import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SignUp.css";
// import { auth } from "../firebaseConfig";
// import { signInWithEmailAndPassword } from "firebase/auth";
import { Toaster, toast } from "react-hot-toast";

import axios from "axios";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dob, setDob] = useState("");

  const navigate = useNavigate();

  const handleNext = () => {
    // Send user data to SignUp2 through router state
    navigate("/confirm-password", {
      state: { email, firstName, lastName, phoneNumber, dob },
    });
  };

  return (
    <div className="login-container">
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="login-text-container">
        <span className="auth-logo-title" onClick={() => navigate("/landing")}>
          Insight
        </span>
        <h1>Join Us Today</h1>
        <p>
          Sign up now and be part of a platform that makes giving accessible
          access to a powerful FinTech powered by AI.
        </p>
        <div className="login-form-container">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <input
            type="date"
            placeholder="Date of Birth"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          <button className="login-button" onClick={handleNext}>
            Next
          </button>
          <button
            className="register-button"
            onClick={() => navigate("/login")}
          >
            Go to Login
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

export default SignUp;
