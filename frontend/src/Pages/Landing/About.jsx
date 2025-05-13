import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1 className="about-title">About FinSight</h1>
        <p className="about-description">
          FinSight is an intelligent personal finance platform built to help you
          plan, track, and optimize your financial journey. With powerful
          AI-driven insights and intuitive tools, FinSight empowers you to take
          control of your money—whether you're budgeting, investing, or planning
          for the future.
        </p>

        <div className="about-sections">
          <div className="about-section-card">
            <h2 className="about-section-title">🌍 Our Mission</h2>
            <p className="about-section-description">
              To simplify financial planning for everyone by combining smart
              technology with human-centered design—making personal finance more
              transparent, insightful, and empowering.
            </p>
          </div>

          <div className="about-section-card">
            <h2 className="about-section-title">💡 What We Offer</h2>
            <ul className="about-list">
              <li>AI-Powered Investment Recommendations</li>
              <li>Budget Planning & Expense Tracking</li>
              <li>Market Insights & News Feeds</li>
              <li>Smart Financial Calculators</li>
              <li>Exportable Reports & e-Statements</li>
            </ul>
          </div>

          <div className="about-section-card">
            <h2 className="about-section-title">🤝 Why FinSight?</h2>
            <p className="about-section-description">
              FinSight brings all your financial tools into one seamless
              platform. Unlike traditional finance apps, we deliver real-time AI
              insights and personalized strategies—giving you clarity, control,
              and confidence with every decision.
            </p>
          </div>

          <div className="about-section-card">
            <h2 className="about-section-title">📍 Get Involved</h2>
            <p className="about-section-description">
              Whether you’re just starting your financial journey or refining
              your investment strategies, FinSight has the tools and insights to
              guide your way. Sign up today and start building your smarter
              financial future.
            </p>
          </div>
        </div>

        <div className="about-image-container">
          <img
            src="staticimages/homebanner.jpeg"
            alt="FinSight Dashboard"
            className="about-image"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
