import React, { useState } from "react";
import "./Tool.css";
import "../FinancialPlanner/GoalsProfile.css";
import Investment from "./Investment";
import NetWorth from "./NetWorth";
import Loan from "./Loan";


const Home = () => {
    const [selectedTool, setSelectedTool] = useState("investment");

    return (
        <div className="tool-content">
            <header className="goal-header">
                <h1>
                    Financial Tools |{" "}
                    <span className="goal-header-specific">
                        Let's Help You to Calculate
                    </span>
                </h1>
            </header>
            <div className="tool-button-container">
                <button
                    className={`tool-button left ${selectedTool === "investment" ? "selected" : ""}`}
                    onClick={() => setSelectedTool("investment")}
                >
                    <p className="tool-button-text">Investment</p>
                </button>

                <button
                    className={`tool-button middle ${selectedTool === "net worth" ? "selected" : ""}`}
                    onClick={() => setSelectedTool("net worth")}
                >
                    <p className="tool-button-text">Net Worth</p>
                </button>

                <button
                    className={`tool-button right ${selectedTool === "loan" ? "selected" : ""}`}
                    onClick={() => setSelectedTool("loan")}
                >
                    <p className="tool-button-text">Loan</p>
                </button>
            </div>

            <div className="tool-wrapper">
                {selectedTool === "investment" && <Investment />}
                {selectedTool === "net worth" && <NetWorth />}
                {selectedTool === "loan" && <Loan />}
            </div>
        </div>
    );
};

export default Home;
