import { useEffect, useState, useRef } from "react";
import "./AIInvestmentAdvisor.css";
import axios from "axios";

const AIInvestmentAdvisor = () => {
  // All your state variables first
  const [savedStrategiesList, setSavedStrategiesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [strategyToDelete, setStrategyToDelete] = useState(null);
  const [showSavedStrategies, setShowSavedStrategies] = useState(false);
  const [selectedRiskTolerance, setSelectedRiskTolerance] = useState("moderate");
  const [selectedGrowth, setSelectedGrowth] = useState(["low-mid-income"]);
  const [chatInput, setChatInput] = useState("");
  const [minInvestment, setMinInvestment] = useState(2772);
  const [maxInvestment, setMaxInvestment] = useState(8018);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

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

  const chatInputRef = useRef(null);

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
    // Convert the value to a number, or use 0 if it's not a valid number
    const parsedValue = value === '' ? 0 : parseInt(value, 10);
    
    // Only update if the value is a valid number
    if (!isNaN(parsedValue)) {
      setMinInvestment(parsedValue);
      
      // If current max is less than new min, update max to match min
      if (maxInvestment < parsedValue) {
        setMaxInvestment(parsedValue);
      }
    }
  };

  // Fix the handleMaxChange function to correctly handle user input
  const handleMaxChange = (value) => {
    // Convert the value to a number, or use 0 if it's not a valid number
    const parsedValue = value === '' ? 0 : parseInt(value, 10);
    
    // Only update if the value is a valid number
    if (!isNaN(parsedValue)) {
      // Ensure max is always greater than or equal to min
      setMaxInvestment(Math.max(parsedValue, minInvestment));
    } else {
      // If the input is not a valid number, just set it to the current min investment
      setMaxInvestment(minInvestment);
    }
  };

  const handleChatInputChange = (e) => {
    // Add debugging
    console.log("Input changing:", e.target.value);
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
      console.log("Confirming selection with:", {
        risk_tolerance: selectedRiskTolerance,
        growth_goals: selectedGrowth,
        min_investment: minInvestment,
        max_investment: maxInvestment
      });
      
      // Call the AI service
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
      } else {
        // If the API doesn't return strategies array, throw an error
        throw new Error('Invalid response format from AI service');
      }
      
    } catch (error) {
      console.error('Error generating strategy:', error);
      // Fallback with AI-simulated strategies
      console.log("Using AI-simulated strategy generation");
      
      // Use local AI simulation to generate strategies
      const simulatedAIStrategies = generateAISimulatedStrategies(
        selectedRiskTolerance, 
        selectedGrowth, 
        minInvestment, 
        maxInvestment
      );
      
      setRecommendedStrategies(simulatedAIStrategies);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Add fetchSavedStrategies function EARLY in the component
  const fetchSavedStrategies = async () => {
    try {
      setIsLoading(true);
      
      // Try API first
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          // Call AI service API
          const response = await axios.get('http://localhost:8000/strategies/', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          
          if (response.data.success) {
            setSavedStrategiesList(response.data.strategies);
            return;
          }
        } catch (error) {
          console.log("API fetch failed, falling back to localStorage");
        }
      }
      
      // Fall back to localStorage if API fails or no token
      const savedStrategiesString = localStorage.getItem('savedStrategies');
      if (savedStrategiesString) {
        try {
          const saved = JSON.parse(savedStrategiesString);
          if (Array.isArray(saved)) {
            setSavedStrategiesList(saved);
          }
        } catch (error) {
          console.error('Error parsing saved strategies from localStorage:', error);
        }
      }
    } catch (error) {
      console.error("Error fetching strategies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Now define your other functions that call fetchSavedStrategies
  const saveStrategy = async (strategy) => {
    try {
      setIsLoading(true);
      
      // Check for duplicates
      const isDuplicate = savedStrategiesList.some(
        saved => saved.name === strategy.name
      );
      
      if (isDuplicate) {
        alert("This strategy is already saved");
        return;
      }

      // Try API first
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          const response = await axios.post('http://localhost:8000/strategies/', strategy, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          
          if (response.data.success) {
            // Refresh the list after successful save
            fetchSavedStrategies(); // This should now work
            alert("Strategy saved successfully!");
            return;
          }
        } catch (error) {
          console.log("API save failed, falling back to localStorage");
        }
      }
      
      // Fall back to localStorage
      const updatedList = [...savedStrategiesList, strategy];
      setSavedStrategiesList(updatedList);
      localStorage.setItem('savedStrategies', JSON.stringify(updatedList));
      alert("Strategy saved successfully!");
      
    } catch (error) {
      console.error("Error saving strategy:", error);
      alert("Failed to save strategy. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
        
        // Format the AI response text for better readability
        const formattedText = formatAIResponse(data.response);
        
        // Add AI response to chat history
        setChatHistory([
          ...newChatHistory,
          { sender: 'ai', text: formattedText }
        ]);
      } else {
        // If API fails, fall back to local response
        console.log("API request failed, using local fallback");
        
        // Format the local response as well
        const formattedText = formatAIResponse(getLocalAIResponse(userQuestion));
        
        setChatHistory([
          ...newChatHistory,
          { sender: 'ai', text: formattedText }
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
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Add this formatting helper function
  const formatAIResponse = (text) => {
    // If text is already formatted with HTML, return it as is
    if (text.includes("<p>") || text.includes("<ul>") || text.includes("<br>")) {
      return text;
    }
    
    // Add basic formatting
    let formatted = text;
    
    // Format list items
    formatted = formatted.replace(/\* ([^\n]+)/g, '• $1<br>');
    
    // Format headings and sections
    formatted = formatted.replace(/([\d]+\. [\w\s]+:)/g, '<strong>$1</strong>');
    formatted = formatted.replace(/([\w\s]+:)\s/g, '<strong>$1</strong> ');
    
    // Format paragraphs
    formatted = formatted.split('\n\n').map(p => `<p>${p}</p>`).join('');
    
    // Replace single line breaks
    formatted = formatted.replace(/\n/g, '<br>');
    
    return formatted;
  };

  // Add this function to simulate AI-generated strategies when the backend is unavailable
  const generateAISimulatedStrategies = (riskTolerance, growthGoals, minInvestment, maxInvestment) => {
    // Calculate investment size tier (small, medium, large)
    let investmentTier = "small";
    const avgInvestment = (minInvestment + maxInvestment) / 2;
    
    if (avgInvestment > 50000) {
      investmentTier = "large";
    } else if (avgInvestment > 10000) {
      investmentTier = "medium";
    }
    
    // Base strategies on risk tolerance
    let strategies = [];
    
    // Include growth goals in strategy naming and allocation
    const hasIncome = growthGoals.includes("low-mid-income");
    const hasPreservation = growthGoals.includes("capital-preservation");
    const hasRetirement = growthGoals.includes("retirement-planning");
    const hasShortTerm = growthGoals.includes("short-term-savings");
    const hasSpecificPurchase = growthGoals.includes("specific-purchase");
    
    // Generate different strategies based on risk tolerance
    if (riskTolerance === "conservative") {
      strategies.push({
        name: hasPreservation 
          ? "Capital Preservation Portfolio" 
          : (hasIncome ? "Income Focus Portfolio" : "Conservative Allocation"),
        targetReturn: "4-6%",
        riskLevel: "Low",
        timeHorizon: hasRetirement ? "10+ years" : (hasShortTerm ? "2-3 years" : "3-5 years"),
        allocation: hasPreservation 
          ? "20% stocks, 60% bonds, 20% cash" 
          : "30% stocks, 60% bonds, 10% cash"
      });
      
      strategies.push({
        name: hasIncome 
          ? "Dividend Income Strategy" 
          : (hasShortTerm ? "Short-Term Conservative Mix" : "Stable Value Portfolio"),
        targetReturn: "5-7%",
        riskLevel: "Low to Moderate",
        timeHorizon: hasShortTerm ? "1-3 years" : "4+ years",
        allocation: hasIncome 
          ? "40% dividend stocks, 50% bonds, 10% cash" 
          : "25% high-quality stocks, 65% bonds, 10% cash"
      });
      
    } else if (riskTolerance === "moderate") {
      strategies.push({
        name: hasRetirement 
          ? "Balanced Retirement Portfolio" 
          : (hasSpecificPurchase ? "Goal-Based Balanced Fund" : "Balanced Growth Strategy"),
        targetReturn: "7-9%",
        riskLevel: "Moderate",
        timeHorizon: hasRetirement ? "15+ years" : "5-7 years",
        allocation: "50% stocks, 40% bonds, 10% alternatives"
      });
      
      strategies.push({
        name: hasIncome 
          ? "Growth & Income Portfolio" 
          : (hasPreservation ? "Value-Focused Balanced Fund" : "Global Diversified Mix"),
        targetReturn: "8-10%",
        riskLevel: "Moderate",
        timeHorizon: "5+ years",
        allocation: hasIncome 
          ? "45% dividend stocks, 15% growth stocks, 35% bonds, 5% alternatives" 
          : "50% US stocks, 15% international stocks, 30% bonds, 5% REITs"
      });
      
    } else { // aggressive
      strategies.push({
        name: hasRetirement 
          ? "Long-Term Growth Portfolio" 
          : (hasSpecificPurchase ? "Accelerated Goal Strategy" : "Growth Focus Fund"),
        targetReturn: "10-13%",
        riskLevel: "High",
        timeHorizon: "8+ years",
        allocation: "75% stocks, 15% bonds, 10% alternatives"
      });
      
      // Add more specialized aggressive strategy
      if (hasIncome) {
        strategies.push({
          name: "High Growth with Income",
          targetReturn: "9-11%",
          riskLevel: "Moderately High",
          timeHorizon: "7+ years",
          allocation: "65% stocks, 20% high-yield bonds, 15% alternatives"
        });
      } else if (investmentTier === "large") {
        strategies.push({
          name: "Diversified Growth Portfolio",
          targetReturn: "11-14%",
          riskLevel: "High",
          timeHorizon: "10+ years",
          allocation: "70% stocks, 15% bonds, 15% alternative investments"
        });
      } else {
        strategies.push({
          name: "High Growth Stock Focus",
          targetReturn: "12-15%",
          riskLevel: "Very High",
          timeHorizon: "10+ years",
          allocation: "90% growth stocks, 10% alternatives"
        });
      }
    }
    
    // Add a third strategy based on investment amount and goals
    if (investmentTier === "large") {
      strategies.push({
        name: "Custom Diversified Portfolio",
        targetReturn: riskTolerance === "conservative" ? "6-8%" : (riskTolerance === "moderate" ? "8-11%" : "11-14%"),
        riskLevel: riskTolerance === "conservative" ? "Low to Moderate" : (riskTolerance === "moderate" ? "Moderate" : "High"),
        timeHorizon: "5+ years",
        allocation: riskTolerance === "conservative" 
          ? "30% blue-chip stocks, 50% bonds, 10% REITs, 10% alternatives" 
          : (riskTolerance === "moderate" 
            ? "50% quality stocks, 30% bonds, 10% REITs, 10% alternatives"
            : "70% growth stocks, 15% bonds, 15% alternatives")
      });
    } else if (hasSpecificPurchase || hasShortTerm) {
      strategies.push({
        name: hasSpecificPurchase ? "Goal-Based Time Strategy" : "Flexible Time Horizon Fund",
        targetReturn: riskTolerance === "conservative" ? "4-6%" : (riskTolerance === "moderate" ? "6-8%" : "8-10%"),
        riskLevel: riskTolerance === "conservative" ? "Low" : (riskTolerance === "moderate" ? "Low to Moderate" : "Moderate"),
        timeHorizon: hasShortTerm ? "1-3 years" : "3-5 years",
        allocation: riskTolerance === "conservative" 
          ? "20% stocks, 60% short-term bonds, 20% cash" 
          : (riskTolerance === "moderate" 
            ? "40% stocks, 50% bonds, 10% cash"
            : "60% quality stocks, 30% bonds, 10% cash")
      });
    }
    
    return strategies;
  };

  // Helper function to format allocation text nicely with bullet points
  const formatAllocationText = (allocation) => {
    if (!allocation) return "Not specified";
    
    if (typeof allocation === 'object') {
      // If it's an object, convert it to a formatted string
      return (
        <ul className="allocation-list">
          {Object.entries(allocation).map(([key, value], index) => (
            <li key={index}>{value} {key}</li>
          ))}
        </ul>
      );
    }
    
    // If it's a string, break it into bullet points based on percentages
    const segments = allocation.split(/,\s*(?=\d+%)/);
    
    if (segments.length <= 1) {
      return allocation; // No formatting needed for simple strings
    }
    
    return (
      <ul className="allocation-list">
        {segments.map((segment, index) => (
          <li key={index}>{segment.trim()}</li>
        ))}
      </ul>
    );
  };

  // Function to show the delete confirmation dialog
  const confirmDeleteStrategy = (index) => {
    setStrategyToDelete(index);
    setShowDeleteConfirmation(true);
  };

  // Function to handle cancellation of delete operation
  const handleCancelDelete = () => {
    setStrategyToDelete(null);
    setShowDeleteConfirmation(false);
  };

  // Function to handle confirmation of delete operation
  const handleConfirmDelete = async () => {
    if (strategyToDelete !== null) {
      try {
        setIsLoading(true);
        
        const strategy = savedStrategiesList[strategyToDelete];
        
        // Try API deletion first
        if (strategy._id) {
          const token = localStorage.getItem('token');
          
          try {
            const response = await axios.delete(`http://localhost:8000/strategies/${strategy._id}`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            
            if (response.data.success) {
              // API deletion successful
              fetchSavedStrategies(); // This should now work
              setStrategyToDelete(null);
              setShowDeleteConfirmation(false);
              return;
            }
          } catch (error) {
            console.log("API deletion failed, falling back to localStorage");
          }
        }
        
        // Fall back to localStorage
        const updatedStrategies = savedStrategiesList.filter(
          (_, index) => index !== strategyToDelete
        );
        
        // Update state and local storage
        setSavedStrategiesList(updatedStrategies);
        localStorage.setItem('savedStrategies', JSON.stringify(updatedStrategies));
        
        // Reset the delete confirmation state
        setStrategyToDelete(null);
        setShowDeleteConfirmation(false);
        
      } catch (error) {
        console.error("Error deleting strategy:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Load saved strategies on component mount
  useEffect(() => {
    fetchSavedStrategies();
  }, []);

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
        
        {/* Update your range inputs section */}
        <div className="investment-range-section">
          <h3>Investment Range</h3>
          <div className="range-inputs">
            <div className="input-group">
              <label>Min ($)</label>
              <input 
                type="number" 
                value={minInvestment}
                onChange={(e) => handleMinChange(e.target.value)}
                min="0"
                step="100"
              />
            </div>
            <div className="range-separator">-</div>
            <div className="input-group">
              <label>Max ($)</label>
              <input 
                type="number" 
                value={maxInvestment}
                onChange={(e) => handleMaxChange(e.target.value)}
                min={minInvestment}
                step="100"
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
          {/* Update recommended strategies card */}
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
                <div className="detail-row allocation-row">
                  <span>Recommended allocation</span>
                  <div className="allocation-content">
                    {formatAllocationText(strategy.allocation)}
                  </div>
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
              {/* Update saved strategies card */}
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
                      <div className="detail-row allocation-row">
                        <span>Recommended allocation</span>
                        <div className="allocation-content">
                          {formatAllocationText(strategy.allocation)}
                        </div>
                      </div>
                    </div>
                    <div className="strategy-card-actions">
                      <button 
                        className="delete-strategy-button"
                        onClick={() => confirmDeleteStrategy(index)}
                      >
                        Remove Strategy
                      </button>
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
                {message.sender === 'user' ? (
                  <span className="message-text">{message.text}</span>
                ) : (
                  <span 
                    className="message-text"
                    dangerouslySetInnerHTML={{ __html: message.text }}
                  />
                )}
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
            ref={chatInputRef}
            type="text"
            value={chatInput}
            onChange={(e) => {
              console.log("Input changing:", e.target.value);
              setChatInput(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Ask something about investing..."
            disabled={isLoading}
            onClick={() => chatInputRef.current && chatInputRef.current.focus()}
          />
          <button 
            onClick={sendMessage}
            disabled={isLoading || !chatInput.trim()}
          >
            Send
          </button>
        </div>
        
        <button 
          onClick={() => {
            setIsLoading(false);
            setChatInput("");
            setTimeout(() => chatInputRef.current && chatInputRef.current.focus(), 100);
          }}
          className="reset-chat-button"
        >
          Reset Chat
        </button>
      </div>
      
      {/* Delete confirmation dialog */}
      {showDeleteConfirmation && (
        <div className="confirmation-overlay">
          <div className="confirmation-dialog">
            <h4>Remove Strategy</h4>
            <p>Are you sure you want to remove this investment strategy?</p>
            <div className="confirmation-actions">
              <button 
                className="cancel-button"
                onClick={handleCancelDelete}
              >
                Cancel
              </button>
              <button 
                className="confirm-delete-button"
                onClick={handleConfirmDelete}
              >
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIInvestmentAdvisor;