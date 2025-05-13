import React, { useState } from "react";
import "./Insights.css";
import AIAdvisor from "./AI_module/AIInvestmentAdvisor";
import Market from "./Market/Market";

const Insights = () => {
    const [selectedTool, setSelectedTool] = useState("Market");

    return (
        <div>
            <div className="button-container-insights">
                <button
                    className={`button left ${selectedTool === "Market" ? "selected" : ""}`}
                    onClick={() => setSelectedTool("Market")}
                >
                    <p className="button-text">Market</p>
                </button>

                <button
                    className={`button right ${selectedTool === "AIAdvisor" ? "selected" : ""}`}
                    onClick={() => setSelectedTool("AIAdvisor")}
                >
                    <p className="button-text">AI Advisor</p>
                </button>
            </div>

            <div className="tool-wrapper">
                {selectedTool === "AIAdvisor" && <AIAdvisor />}
                {selectedTool === "Market" && <Market />}
            </div>
        </div>
    );
};

export default Insights;
