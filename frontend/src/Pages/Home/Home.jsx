import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import "./Home.css"; // CSS styling
import { useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaEdit,
  FaMapMarkerAlt,
  FaCamera,
  FaBars,
  FaLock,
  FaBell,
  FaTextHeight,
  FaReact,
  FaHome,
  FaBarcode,
  FaMobile,
  FaTruck,
  FaGift,
  FaReceipt,
  FaAssistiveListeningSystems,
  FaBomb,
} from "react-icons/fa";

// Recent transactions list
const transactions = [
  { name: "TESCO EXPRESS AMPANG", amount: 42.5, category: "Groceries" },
  {
    name: "GRABFOOD - NASI KUKUS WARISAN",
    amount: 15.9,
    category: "Food & Beverages",
  },
  { name: "MR DIY BANDAR BARU", amount: 18.75, category: "Shopping" },
  { name: "PETRONAS - FUEL", amount: 65.0, category: "Transportation" },
  { name: "OLDTOWN COFFEE", amount: 12.5, category: "Food & Beverages" },
  { name: "MYDIN MALL", amount: 28.0, category: "Groceries" },
];

const CustomPieTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0];
    return (
      <div className="profile-custom-tooltip">
        <p className="profile-label">{name}</p>
        <p className="profile-value">RM {value.toFixed(2)}</p>
      </div>
    );
  }
  return null;
};

const categoryColors = {
  Groceries: "#00bfa5",
  "Food & Beverages": "#f44336",
  Shopping: "#ffc107",
  Transportation: "#455a64",
};

const categoryIcons = {
  Groceries: <FaBarcode />,
  "Food & Beverages": <FaGift />,
  Shopping: <FaReact />,
  Transportation: <FaTruck />,
  Utilities: <FaReceipt />,
  Rent: <FaHome />,
};

// Pie chart data
const pieData = transactions.reduce((acc, curr) => {
  const existing = acc.find((item) => item.name === curr.category);
  if (existing) {
    existing.value += curr.amount;
  } else {
    acc.push({
      name: curr.category,
      value: curr.amount,
      color: categoryColors[curr.category] || "#8884d8",
    });
  }
  return acc;
}, []);

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
            marginBottom: "20px",
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
        <div
          className="stats"
          style={{
            marginTop: "10px",
            marginBottom: "20px",
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

          {/* Pie Chart Card */}
          <div className=" card profile-summary">
            <section className="profile-dashboard-section">
              <h1>Monthly Summary</h1>
              <div className="profile-chart-section">
                <PieChart width={200} height={200}>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>

                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan x="50%" dy="-0.4em" fontSize="14" fill="#888">
                      Total Spending
                    </tspan>
                    <tspan
                      x="50%"
                      dy="1.2em"
                      fontSize="16"
                      fontWeight="600"
                      fill="#333"
                    >
                      RM{" "}
                      {pieData
                        .reduce((sum, item) => sum + item.value, 0)
                        .toFixed(2)}
                    </tspan>
                  </text>

                  <Tooltip content={<CustomPieTooltip />} />
                </PieChart>
              </div>

              <div className="profile-transaction-list">
                <h5 className="profile-transaction-date">20 Apr 2025</h5>
                {transactions.map((transaction, index) => (
                  <div className="profile-transaction-row" key={index}>
                    <div className="profile-transaction-name">
                      <div
                        className="profile-transaction-icon"
                        style={{
                          backgroundColor: categoryColors[transaction.category],
                        }}
                      >
                        {categoryIcons[transaction.category]}
                      </div>
                      <div className="profile-transaction-name-div">
                        {transaction.name}
                        <span className="profile-transaction-category">
                          {transaction.category}
                        </span>
                      </div>
                    </div>
                    <div className="profile-tx-amount">
                      RM {transaction.amount.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </section>
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
