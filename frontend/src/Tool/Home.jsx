import React, { useState } from "react";
import "./Home.css";
import Tax from "./Tax";
import Investment from "./Investment";
import NetWorth from "./NetWorth";
import Loan from "./Loan";

const Home = () => {
    const [selectedTool, setSelectedTool] = useState("tax");

    return (
        <div>
            <div className="button-container">
                <button
                    className={`button left ${selectedTool === "tax" ? "selected" : ""}`}
                    onClick={() => setSelectedTool("tax")}
                >
                    <p className="button-text">Tax</p>
                </button>

                <button
                    className={`button middle ${selectedTool === "investment" ? "selected" : ""}`}
                    onClick={() => setSelectedTool("investment")}
                >
                    <p className="button-text">Investment</p>
                </button>

                <button
                    className={`button middle ${selectedTool === "net worth" ? "selected" : ""}`}
                    onClick={() => setSelectedTool("net worth")}
                >
                    <p className="button-text">Net Worth</p>
                </button>

                <button
                    className={`button right ${selectedTool === "loan" ? "selected" : ""}`}
                    onClick={() => setSelectedTool("loan")}
                >
                    <p className="button-text">Loan</p>
                </button>
            </div>

            <div className="tool-wrapper">
                {selectedTool === "tax" && <Tax />}
                {selectedTool === "investment" && <Investment />}
                {selectedTool === "net worth" && <NetWorth />}
                {selectedTool === "loan" && <Loan />}
            </div>
        </div>
    );
};

export default Home;
