import { useState } from "react";
import "./AIInvestmentAdvisor.css";

const AIInvestmentAdvisor = () => {
  const [showSavedStrategies, setShowSavedStrategies] = useState(false);
  const [selectedRiskTolerance, setSelectedRiskTolerance] =
    useState("moderate");
  const [selectedGrowth, setSelectedGrowth] = useState(["low-mid-income"]);
  const [chatInput, setChatInput] = useState("");
  const [minInvestment, setMinInvestment] = useState(2772);
  const [maxInvestment, setMaxInvestment] = useState(8018);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleRiskToleranceChange = (value) => {
    setSelectedRiskTolerance(value);
  };

  const handleGrowthChange = (value) => {
    if (selectedGrowth.includes(value)) {
      // Remove the value if already selected
      setSelectedGrowth(selectedGrowth.filter((item) => item !== value));
    } else {
      // Add the value if not selected
      setSelectedGrowth([...selectedGrowth, value]);
    }
  };

  const handleMinChange = (value) => {
    const newMin = parseInt(value) || 0;
    setMinInvestment(newMin);

    // Ensure max is always greater than or equal to min
    if (newMin > maxInvestment) {
      setMaxInvestment(newMin);
    }
  };

  const handleMaxChange = (value) => {
    const newMax = parseInt(value) || 0;

    // Ensure max is always greater than or equal to min
    if (newMax < minInvestment) {
      setMaxInvestment(minInvestment);
    } else {
      setMaxInvestment(newMax);
    }
  };

  const handleChatInputChange = (e) => {
    setChatInput(e.target.value);
  };

  const toggleSavedStrategies = () => {
    setShowSavedStrategies(!showSavedStrategies);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Recommended strategies data
  const recommendedStrategies = [
    {
      name: "Diversified ETF Portfolio",
      targetReturn: "10%",
      riskLevel: "Moderate-High",
      timeHorizon: "7+ years",
      allocation: "50% - 15%",
    },
    {
      name: "Green Energy Focus",
      targetReturn: "12%",
      riskLevel: "High",
      timeHorizon: "5+ years",
      allocation: "45% - 15%",
    },
  ];

  // Additional saved strategies (shown when "View Saved Strategies" is clicked)
  const savedStrategies = [
    {
      name: "Technology & Innovation Portfolio",
      targetReturn: "12%",
      riskLevel: "High",
      timeHorizon: "5+ years",
      allocation: "50% - 20%",
    },
    {
      name: "Dividend Income",
      targetReturn: "8%",
      riskLevel: "Low",
      timeHorizon: "3+ years",
      allocation: "30% - 40%",
    },
    {
      name: "Balanced 60/40 Portfolio",
      targetReturn: "8%",
      riskLevel: "Moderate",
      timeHorizon: "4+ years",
      allocation: "60% - 40%",
    },
  ];

  return (
    <div className="ai-advisor-page">
      <div className="ai-advisor-content">
        <div className="main-content-padding">
          <div className="header-container">
            {/* Header */}
            <header className="goal-header">
              <h1>
                Investment Strategy |{" "}
                <span className="goal-header-specific">AI Advisor</span>
              </h1>
            </header>
            <button
              className="mobile-menu-toggle"
              onClick={toggleMobileMenu}
              aria-label="Toggle strategy panel"
            >
              {isMobileMenuOpen ? "✕" : "≡"}
            </button>
          </div>

          <div className="financial-plan-section">
            <div className="section-header">
              <span>Your Financial Plan</span>
              <button className="confirm-button">Confirm</button>
            </div>

            <div className="risk-tolerance-section">
              <h3>Risk Tolerance</h3>
              <div className="risk-options">
                <button
                  className={`risk-option ${
                    selectedRiskTolerance === "conservative" ? "selected" : ""
                  }`}
                  onClick={() => handleRiskToleranceChange("conservative")}
                >
                  Conservative
                </button>
                <button
                  className={`risk-option ${
                    selectedRiskTolerance === "moderate" ? "selected" : ""
                  }`}
                  onClick={() => handleRiskToleranceChange("moderate")}
                >
                  Moderate
                </button>
                <button
                  className={`risk-option ${
                    selectedRiskTolerance === "aggressive" ? "selected" : ""
                  }`}
                  onClick={() => handleRiskToleranceChange("aggressive")}
                >
                  Aggressive
                </button>
              </div>
            </div>

            <div className="growth-section">
              <h3>Growth</h3>
              <div className="growth-options">
                {[
                  ["low-mid-income", "Low-Mid-Income"],
                  ["capital-preservation", "Capital Preservation"],
                  ["retirement-planning", "Retirement Planning"],
                  ["short-term-savings", "Short Term Savings"],
                  ["specific-purchase", "Specific Purchase"],
                ].map(([id, label]) => (
                  <div className="growth-option" key={id}>
                    <input
                      type="checkbox"
                      id={id}
                      name="growth"
                      checked={selectedGrowth.includes(id)}
                      onChange={() => handleGrowthChange(id)}
                    />
                    <label htmlFor={id}>{label}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="investment-range-section">
              <h3>Investment Range</h3>
              <div className="min-max-input-container">
                <div className="input-group">
                  <label htmlFor="min-input">Min</label>
                  <input
                    id="min-input"
                    type="number"
                    className="range-input"
                    value={minInvestment}
                    onChange={(e) => handleMinChange(e.target.value)}
                    min="0"
                  />
                </div>
                <div className="range-separator">-</div>
                <div className="input-group">
                  <label htmlFor="max-input">Max</label>
                  <input
                    id="max-input"
                    type="number"
                    className="range-input"
                    value={maxInvestment}
                    onChange={(e) => handleMaxChange(e.target.value)}
                    min={minInvestment}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="chat-section">
            <button className="start-chat-button">
              <span className="chat-icon">💬</span>
              Start chat with FinSight!
            </button>
            <div className="chat-message">
              <span className="message-text">Hello, I am FinSight!</span>
            </div>
            <div className="chat-input-container">
              <input
                type="text"
                value={chatInput}
                onChange={handleChatInputChange}
                placeholder="Reply to FinSight..."
                className="chat-input"
              />
              <button className="send-button">→</button>
            </div>
          </div>
        </div>

        {/* Mobile and tablet view - below main content */}
        <div className="recommended-strategies-panel-mobile">
          <h2>Recommended Strategies</h2>
          <div className="strategies-container">
            {!showSavedStrategies &&
              recommendedStrategies.map((strategy, index) => (
                <div key={`mobile-${index}`} className="strategy-card">
                  <h3>{strategy.name}</h3>
                  <div className="strategy-details">
                    <div className="detail-row">
                      <span className="detail-label">Target return</span>
                      <span className="detail-value">
                        {strategy.targetReturn}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Risk level</span>
                      <span className="detail-value">{strategy.riskLevel}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Time horizon</span>
                      <span className="detail-value">
                        {strategy.timeHorizon}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">
                        Recommended allocation
                      </span>
                      <span className="detail-value">
                        {strategy.allocation}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

            {showSavedStrategies &&
              recommendedStrategies
                .concat(savedStrategies)
                .map((strategy, index) => (
                  <div key={`mobile-saved-${index}`} className="strategy-card">
                    <h3>{strategy.name}</h3>
                    <div className="strategy-details">
                      <div className="detail-row">
                        <span className="detail-label">Target return</span>
                        <span className="detail-value">
                          {strategy.targetReturn}
                        </span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Risk level</span>
                        <span className="detail-value">
                          {strategy.riskLevel}
                        </span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Time horizon</span>
                        <span className="detail-value">
                          {strategy.timeHorizon}
                        </span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">
                          Recommended allocation
                        </span>
                        <span className="detail-value">
                          {strategy.allocation}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
          </div>

          <div className="strategy-actions">
            <button className="save-strategy-button">Save Strategy</button>
            <button className="view-profile-button">View Profile</button>
            <button
              className="view-saved-strategies-button"
              onClick={toggleSavedStrategies}
            >
              {showSavedStrategies
                ? "Hide Saved Strategies"
                : "View Saved Strategies"}
            </button>
          </div>
        </div>

        {/* Desktop view - sidebar */}
        <div
          className={`recommended-strategies-panel ${
            isMobileMenuOpen ? "mobile-visible" : "mobile-hidden"
          }`}
        >
          <h2>Recommended Strategies</h2>
          <div className="strategies-container">
            {!showSavedStrategies &&
              recommendedStrategies.map((strategy, index) => (
                <div key={`desktop-${index}`} className="strategy-card">
                  <h3>{strategy.name}</h3>
                  <div className="strategy-details">
                    <div className="detail-row">
                      <span className="detail-label">Target return</span>
                      <span className="detail-value">
                        {strategy.targetReturn}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Risk level</span>
                      <span className="detail-value">{strategy.riskLevel}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Time horizon</span>
                      <span className="detail-value">
                        {strategy.timeHorizon}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">
                        Recommended allocation
                      </span>
                      <span className="detail-value">
                        {strategy.allocation}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

            {showSavedStrategies &&
              recommendedStrategies
                .concat(savedStrategies)
                .map((strategy, index) => (
                  <div key={`desktop-saved-${index}`} className="strategy-card">
                    <h3>{strategy.name}</h3>
                    <div className="strategy-details">
                      <div className="detail-row">
                        <span className="detail-label">Target return</span>
                        <span className="detail-value">
                          {strategy.targetReturn}
                        </span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Risk level</span>
                        <span className="detail-value">
                          {strategy.riskLevel}
                        </span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Time horizon</span>
                        <span className="detail-value">
                          {strategy.timeHorizon}
                        </span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">
                          Recommended allocation
                        </span>
                        <span className="detail-value">
                          {strategy.allocation}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
          </div>

          <div className="strategy-actions">
            <button className="save-strategy-button">Save Strategy</button>
            <button className="view-profile-button">View Profile</button>
            <button
              className="view-saved-strategies-button"
              onClick={toggleSavedStrategies}
            >
              {showSavedStrategies
                ? "Hide Saved Strategies"
                : "View Saved Strategies"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInvestmentAdvisor;
