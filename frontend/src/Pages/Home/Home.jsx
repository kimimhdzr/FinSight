import React, { useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import "./Home.css"; // CSS styling
import { useNavigate } from "react-router-dom";

// Pie chart data
const pieData = [
  { name: "Other Expenses", value: 567.5, color: "#00bfa5" },
  { name: "Food & Beverages", value: 489.81, color: "#f44336" },
  { name: "Shopping", value: 160.1, color: "#ffc107" },
  { name: "Home & Property", value: 162.9, color: "#795548" },
  { name: "Transportation", value: 132.0, color: "#455a64" },
];

// Recent transactions list
const transactions = [
  { name: "SALE 7-ELEVEN MALAYSIA SDN AP", amount: 28.3 },
  { name: "MUHAMMAD NASYIRIN B*", amount: 28.3 },
  { name: "ECO-MART SURIA PANTAI", amount: 31.0 },
  { name: "DEBIT C-NEXUS KUALA LUMPUR", amount: 3.0 },
];

const goalsData = [
  {
    id: 1,
    title: "Save for Vacation",
    amountSaved: 1000,
    goalAmount: 3000,
    monthlyAmount: 400,
    monthlyGoal: 200,
  },
  {
    id: 2,
    title: "Emergency Fund",
    amountSaved: 500,
    goalAmount: 10000,
    monthlyAmount: 400,
    monthlyGoal: 300,
  },
  {
    id: 3,
    title: "Buy a Car",
    amountSaved: 8000,
    goalAmount: 15000,
    monthlyAmount: 400,
    monthlyGoal: 400,
  },
  {
    id: 4,
    title: "Home Renovation",
    amountSaved: 4000,
    goalAmount: 5000,
    monthlyAmount: 400,
    monthlyGoal: 600,
  },
  // Add more goals here
];

const Home = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const filteredGoals = goalsData.filter((goal) =>
    goal.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-content">
      {/* Main Dashboard Content */}
      <div className="dashboard">
        {/* Header */}
        <header className="home-header">
          <h1>
            Dashboard |{" "}
            <span className="goal-header-specific">
              Hello Hakimi, Welcome Back
            </span>
          </h1>
        </header>

        {/* Cards layout */}
        <span className="home-header-specific">Ongoing Goals</span>
        <div
          className="goals-grid"
          style={{
          marginTop: "10px",
          marginBottom: "20px"
          }}
        >
          {filteredGoals.map((goal) => {
            const progressPercent = Math.round(
              (goal.amountSaved / goal.goalAmount) * 100
            );
            const monthlyPercent = Math.round(
              (goal.monthlyAmount / goal.monthlyGoal) * 100
            );
            const isAbove = goal.monthlyAmount >= goal.monthlyGoal;

            // Determine class based on progress percentage
            let progressClass = "progress-grey";
            if (progressPercent >= 75) progressClass = "progress-green";
            else if (progressPercent >= 50) progressClass = "progress-yellow";
            else if (progressPercent >= 25) progressClass = "progress-orange";

            return (
              <div
                key={goal.id}
                className="goal-card"
                onClick={() => navigate("/app/Goals-Profile")}
              >
                {/* Title */}
                <div className="goal-title">{goal.title}</div>

                {/* Center Percentage with dynamic color */}
                <div className={`goal-progress-percent ${progressClass}`}>
                  {progressPercent}%
                </div>

                {/* Progress Bar */}
                <div className="goal-progress-bar">
                  <div
                    className="goal-progress-fill"
                    style={{
                      width: `${(goal.amountSaved / goal.goalAmount) * 100}%`,
                    }}
                  ></div>
                </div>

                {/* Footer Row */}
                <div className="goal-footer">
                  <div
                    className={`footer-item ${
                      isAbove ? "green-text" : "red-text"
                    }`}
                  >
                    {monthlyPercent}%
                  </div>
                  <div
                    className={`footer-item ${
                      isAbove ? "green-text" : "red-text"
                    }`}
                  >
                    {isAbove ? "Above goals" : "Below goals"}
                  </div>
                  <div className="footer-item">
                    {Math.max(0, 30 - new Date().getDate())} days left
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <span className="home-header-specific">Your Expenses</span>
        {/* Statistics cards */}
        <div className="stats"
         style={{
          marginTop: "10px",
          marginBottom: "20px"
          }}
        >
          {/* Income Card */}
          <div className="card income">
            <p>Monthly Income</p>
            <h3>RM 15,000.75</h3>
          </div>

          {/* Expenditure Card */}
          <div className="card expenditure">
            <p>Outgoing Expenditure</p>
            <h3>RM 5,000.00</h3>
          </div>

          {/* Expenses Breakdown */}
          <div className="card expenses">
            <p>Expenses Breakdown</p>
            <div className="expense-list">
              <div className="expense-item">
                <div className="category">
                  Housing
                  <div className="amount">RM 4,925.25</div>
                </div>
                <span className="change up">15% 🔺</span>
              </div>
              <div className="expense-item">
                <div className="category">
                  Wi-Fi
                  <div className="amount">RM 489.25</div>
                </div>
                <span className="change down">15% 🔻</span>
              </div>
            </div>
          </div>
          {/* Monthly Summary with Chart and Transactions */}
          <div className="card summary">
            <h3>Monthly Summary</h3>
            <div className="placeholder">
              <div className="home-chart-transaction">
                <div className="home-chart-section">
                  {/* Donut Chart */}
                  <div className="home-donut-chart">
                    <PieChart width={200} height={200}>
                      <Pie
                        data={pieData}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={0}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                    <div className="home-center-text">29%</div>
                  </div>

                  {/* Transactions List */}
                  <div className="home-transaction-list">
                    <h5 className="home-transaction-date">20 Apr 2025</h5>
                    {transactions.map((transaction, index) => (
                      <table className="home-transaction-table" key={index}>
                        <tbody>
                          <tr>
                            <td className="home-transaction-name">
                              {transaction.name}
                            </td>
                            <td className="home-tx-amount">
                              RM {transaction.amount.toFixed(2)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Recommendation section */}
        <div className="card ai-recommendation">
          <h3>AI Recommendation</h3>
          <div className="placeholder"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
