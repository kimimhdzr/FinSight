import { useEffect, useState } from "react";
import "./AIInvestmentAdvisor.css";

const AIInvestmentAdvisor = () => {
  const [showSavedStrategies, setShowSavedStrategies] = useState(false);
  const [selectedRiskTolerance, setSelectedRiskTolerance] = useState("moderate");
  const [selectedGrowth, setSelectedGrowth] = useState(["low-mid-income"]);
  const [chatInput, setChatInput] = useState("");
  const [minInvestment, setMinInvestment] = useState(2772);
  const [maxInvestment, setMaxInvestment] = useState(8018);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedStrategies, setGeneratedStrategies] = useState([]);
  const [savedStrategiesList, setSavedStrategiesList] = useState([]);

  // Initial recommended strategies (before user confirms changes)
  const [recommendedStrategies, setRecommendedStrategies] = useState([
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
  ]);

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

  // Function to confirm selection and generate investment strategies
  const confirmSelection = async () => {
    setIsLoading(true);
    
    try {
      // For testing purposes, let's add a console log to verify the function is being called
      console.log("Confirming selection with:", {
        risk_tolerance: selectedRiskTolerance,
        growth_goals: selectedGrowth,
        min_investment: minInvestment,
        max_investment: maxInvestment
      });
      
      // First try to call the AI service
      const response = await fetch('http://localhost:8000/api/investment-advisor/generate-strategy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          risk_tolerance: selectedRiskTolerance,
          growth_goals: selectedGrowth,
          min_investment: minInvestment,
          max_investment: maxInvestment
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate strategy');
      }
      
      const data = await response.json();
      console.log("Received data from AI service:", data);
      
      // Update recommended strategies with AI-generated ones
      if (data.strategies && Array.isArray(data.strategies)) {
        setRecommendedStrategies(data.strategies);
      }
      
    } catch (error) {
      console.error('Error generating strategy:', error);
      // Fallback to simple update without AI
      console.log("Using fallback strategy generation");
      
      // Generate some basic recommendations based on selected risk tolerance
      let newStrategies = [];
      
      if (selectedRiskTolerance === "conservative") {
        newStrategies = [
          {
            name: "Conservative Income Portfolio",
            targetReturn: "5-7%",
            riskLevel: "Low",
            timeHorizon: "3+ years",
            allocation: "30% stocks, 60% bonds, 10% cash"
          },
          {
            name: "Dividend Focus",
            targetReturn: "6-8%",
            riskLevel: "Low-Moderate",
            timeHorizon: "4+ years",
            allocation: "40% dividend stocks, 50% bonds, 10% alternatives"
          }
        ];
      } else if (selectedRiskTolerance === "moderate") {
        newStrategies = [
          {
            name: "Balanced Growth Portfolio",
            targetReturn: "8-10%",
            riskLevel: "Moderate",
            timeHorizon: "5+ years",
            allocation: "60% stocks, 35% bonds, 5% alternatives"
          },
          {
            name: "Global Diversification",
            targetReturn: "7-9%",
            riskLevel: "Moderate",
            timeHorizon: "5+ years",
            allocation: "50% US stocks, 20% international stocks, 30% bonds"
          }
        ];
      } else { // aggressive
        newStrategies = [
          {
            name: "Growth Stock Focus",
            targetReturn: "10-12%",
            riskLevel: "High",
            timeHorizon: "7+ years",
            allocation: "80% stocks, 10% bonds, 10% alternatives"
          },
          {
            name: "Tech & Innovation Emphasis",
            targetReturn: "12-15%",
            riskLevel: "Very High",
            timeHorizon: "10+ years",
            allocation: "90% growth stocks, 10% alternatives"
          }
        ];
      }
      
      setRecommendedStrategies(newStrategies);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to save a strategy
  const saveStrategy = (strategy) => {
    // Check if strategy is already saved
    if (!savedStrategiesList.some(s => s.name === strategy.name)) {
      const updatedSavedStrategies = [...savedStrategiesList, strategy];
      setSavedStrategiesList(updatedSavedStrategies);
      
      // Optionally save to localStorage for persistence
      localStorage.setItem('savedStrategies', JSON.stringify(updatedSavedStrategies));
      
      alert(`Strategy "${strategy.name}" has been saved!`);
    } else {
      alert(`Strategy "${strategy.name}" is already saved.`);
    }
  };
  
  // Load saved strategies from localStorage on component mount
  useEffect(() => {
    const savedStrategies = localStorage.getItem('savedStrategies');
    if (savedStrategies) {
      setSavedStrategiesList(JSON.parse(savedStrategies));
    }
  }, []);
  
  // Enhance your getLocalAIResponse function with more investment keywords:

  const getLocalAIResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    // Risk tolerance responses
    if (lowerMessage.includes("aggressive") && lowerMessage.includes("risk")) {
      return "In investment terms, 'aggressive' risk tolerance means you're willing to accept higher volatility and potential losses for the chance of higher returns. Aggressive investors typically have a higher allocation to stocks (often 80%+) and may invest in higher-risk assets like small-cap stocks, emerging markets, or sector-specific investments.";
    }
    
    if (lowerMessage.includes("conservative") && lowerMessage.includes("risk")) {
      return "A 'conservative' risk tolerance means you prefer stability and preservation of capital over higher returns. Conservative investors typically focus on lower-risk investments like government bonds, high-quality corporate bonds, CDs, and blue-chip dividend stocks, with perhaps only 20-40% in equities.";
    }
    
    if (lowerMessage.includes("moderate") && lowerMessage.includes("risk")) {
      return "A 'moderate' risk tolerance balances growth with security. Moderate investors typically have a balanced portfolio with roughly 50-60% in stocks and 40-50% in bonds and cash, seeking reasonable returns while limiting volatility.";
    }
    
    // Investment type responses
    if (lowerMessage.includes("etf") || lowerMessage.includes("exchange traded fund")) {
      return "ETFs (Exchange-Traded Funds) are investment funds traded on stock exchanges. They hold assets like stocks, bonds, or commodities and trade close to their net asset value. ETFs offer diversification, low expense ratios, and tax efficiency, making them popular for both new and experienced investors.";
    }
    
    if (lowerMessage.includes("stock") || lowerMessage.includes("stocks")) {
      return "Stocks represent ownership in a company. When you buy a stock, you're purchasing a small piece of that company, which can increase in value if the company performs well. Stocks generally provide higher potential returns but with higher volatility compared to bonds or cash investments.";
    }
    
    if (lowerMessage.includes("bond") || lowerMessage.includes("bonds")) {
      return "Bonds are debt securities where you lend money to an entity (like a corporation or government) that borrows the funds for a defined period at a variable or fixed interest rate. They generally offer lower returns than stocks but with lower risk, making them important for income and stability in a diversified portfolio.";
    }
    
    if (lowerMessage.includes("mutual fund") || lowerMessage.includes("mutual funds")) {
      return "Mutual funds pool money from many investors to purchase securities like stocks and bonds. They're managed by professionals and offer diversification for investors who may not have the time or expertise to manage their own portfolios. They typically have higher fees than ETFs but can offer active management.";
    }
    
    if (lowerMessage.includes("diversif")) {
      return "Diversification means spreading your investments across various asset types to reduce risk. By not 'putting all your eggs in one basket,' you can potentially decrease the volatility of your portfolio and improve your risk-adjusted returns over time.";
    }
    
    // Time horizon responses
    if (lowerMessage.includes("time horizon") || lowerMessage.includes("long term") || lowerMessage.includes("short term")) {
      return "Your investment time horizon is how long you plan to hold an investment before needing the money. Longer time horizons (5+ years) generally allow for more aggressive strategies since you can weather market volatility. Shorter horizons (under 3 years) typically call for more conservative approaches to protect your principal.";
    }
    
    // Default response
    return "I'm currently operating in offline mode. For specific investment advice, please check your risk tolerance settings and use the 'Confirm' button to generate personalized investment strategies.";
  };

  // Enhance your sendMessage function to better handle API errors:

  const sendMessage = async () => {
    if (!chatInput.trim()) return;
    
    // Add user message to chat
    const newChatHistory = [
      ...chatHistory,
      { sender: 'user', text: chatInput }
    ];
    
    setChatHistory(newChatHistory);
    const userQuestion = chatInput;
    setChatInput('');
    setIsLoading(true);
    
    try {
      console.log("Attempting to use backend API for chat...");
      
      // Try the backend API first
      const response = await fetch('http://localhost:8000/api/investment-advisor/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userQuestion,
          context: {
            risk_tolerance: selectedRiskTolerance,
            growth_goals: selectedGrowth,
            investment_range: {
              min: minInvestment,
              max: maxInvestment
            }
          }
        })
      });
      
      // Check if the API request was successful
      if (response.ok) {
        const data = await response.json();
        
        // Add AI response to chat history
        setChatHistory([
          ...newChatHistory,
          { sender: 'ai', text: data.response }
        ]);
      } else {
        // If API fails, fall back to local response
        console.log("API request failed, using local fallback");
        
        setChatHistory([
          ...newChatHistory,
          { sender: 'ai', text: getLocalAIResponse(userQuestion) }
        ]);
      }
    } catch (error) {
      console.error("Error with API request:", error);
      
      // If any error occurs, use local response
      setChatHistory([
        ...newChatHistory,
        { sender: 'ai', text: getLocalAIResponse(userQuestion) }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Add this to handle Enter key press
  const handleChatKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  // Render your component UI here
  return (
    <div className="investment-advisor-container">
      <div className="financial-plan-section">
        <h2>Your Financial Plan</h2>
        
        <div className="risk-tolerance-section">
          <h3>Risk Tolerance</h3>
          <div className="risk-tolerance-options">
            <button 
              className={selectedRiskTolerance === "conservative" ? "selected" : ""}
              onClick={() => handleRiskToleranceChange("conservative")}
            >
              Conservative
            </button>
            <button 
              className={selectedRiskTolerance === "moderate" ? "selected" : ""}
              onClick={() => handleRiskToleranceChange("moderate")}
            >
              Moderate
            </button>
            <button 
              className={selectedRiskTolerance === "aggressive" ? "selected" : ""}
              onClick={() => handleRiskToleranceChange("aggressive")}
            >
              Aggressive
            </button>
          </div>
        </div>
        
        <div className="growth-section">
          <h3>Growth</h3>
          <div className="growth-options">
            <label>
              <input 
                type="checkbox" 
                checked={selectedGrowth.includes("low-mid-income")}
                onChange={() => handleGrowthChange("low-mid-income")}
              />
              Low-Mid-Income
            </label>
            <label>
              <input 
                type="checkbox" 
                checked={selectedGrowth.includes("capital-preservation")}
                onChange={() => handleGrowthChange("capital-preservation")}
              />
              Capital Preservation
            </label>
            <label>
              <input 
                type="checkbox" 
                checked={selectedGrowth.includes("retirement-planning")}
                onChange={() => handleGrowthChange("retirement-planning")}
              />
              Retirement Planning
            </label>
            <label>
              <input 
                type="checkbox" 
                checked={selectedGrowth.includes("short-term-savings")}
                onChange={() => handleGrowthChange("short-term-savings")}
              />
              Short Term Savings
            </label>
            <label>
              <input 
                type="checkbox" 
                checked={selectedGrowth.includes("specific-purchase")}
                onChange={() => handleGrowthChange("specific-purchase")}
              />
              Specific Purchase
            </label>
          </div>
        </div>
        
        <div className="investment-range-section">
          <h3>Investment Range</h3>
          <div className="range-inputs">
            <div>
              <label>Min</label>
              <input 
                type="number" 
                value={minInvestment}
                onChange={(e) => handleMinChange(e.target.value)}
              />
            </div>
            <div className="range-separator">-</div>
            <div>
              <label>Max</label>
              <input 
                type="number" 
                value={maxInvestment}
                onChange={(e) => handleMaxChange(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <button 
          className="confirm-button" 
          onClick={() => {
            console.log("Confirm button clicked");
            confirmSelection();
          }}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Confirm"}
        </button>
      </div>
      
      <div className="strategies-section">
        <h2>Recommended Strategies</h2>
        <div className="strategies-list">
          {recommendedStrategies.map((strategy, index) => (
            <div key={index} className="strategy-card">
              <h3>{strategy.name}</h3>
              <div className="strategy-details">
                <div className="detail-row">
                  <span>Target return</span>
                  <span>{strategy.targetReturn}</span>
                </div>
                <div className="detail-row">
                  <span>Risk level</span>
                  <span>{strategy.riskLevel}</span>
                </div>
                <div className="detail-row">
                  <span>Time horizon</span>
                  <span>{strategy.timeHorizon}</span>
                </div>
                <div className="detail-row">
                  <span>Recommended allocation</span>
                  <span>{strategy.allocation}</span>
                </div>
              </div>
              <button 
                className="save-strategy-button"
                onClick={() => saveStrategy(strategy)}
              >
                Save Strategy
              </button>
            </div>
          ))}
        </div>
        
        <button className="view-saved-button" onClick={toggleSavedStrategies}>
          {showSavedStrategies ? "Hide Saved Strategies" : "View Saved Strategies"}
        </button>
        
        {showSavedStrategies && (
          <div className="saved-strategies">
            <h3>Your Saved Strategies</h3>
            <div className="strategies-list">
              {savedStrategiesList.length > 0 ? (
                savedStrategiesList.map((strategy, index) => (
                  <div key={index} className="strategy-card">
                    <h3>{strategy.name}</h3>
                    <div className="strategy-details">
                      <div className="detail-row">
                        <span>Target return</span>
                        <span>{strategy.targetReturn}</span>
                      </div>
                      <div className="detail-row">
                        <span>Risk level</span>
                        <span>{strategy.riskLevel}</span>
                      </div>
                      <div className="detail-row">
                        <span>Time horizon</span>
                        <span>{strategy.timeHorizon}</span>
                      </div>
                      <div className="detail-row">
                        <span>Recommended allocation</span>
                        <span>{strategy.allocation}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No saved strategies yet.</p>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Chat section */}
      <div className="chat-section">
        <h3>Chat with FinSight AI</h3>
        
        <div className="chat-messages-container">
          {chatHistory.map((message, index) => (
            <div 
              key={index} 
              className={`chat-message ${message.sender === 'user' ? 'user-message' : 'ai-message'}`}
            >
              <div className="message-content">
                <span className="message-text">{message.text}</span>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="chat-message ai-message">
              <div className="message-content">
                <span className="message-text">Thinking...</span>
              </div>
            </div>
          )}
        </div>
        
        <div className="chat-controls">
          <input
            type="text"
            value={chatInput}
            onChange={handleChatInputChange}
            onKeyPress={handleChatKeyPress}
            placeholder="Ask something about investing..."
            disabled={isLoading}
          />
          <button 
            onClick={sendMessage}
            disabled={isLoading || !chatInput.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIInvestmentAdvisor;