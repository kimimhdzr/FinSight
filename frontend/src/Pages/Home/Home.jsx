import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import "./Home.css"; // CSS styling
import { useNavigate } from "react-router-dom";
import NoDataFound from "../../components/NoDataFound";
import LoadingSpinner from "../../components/LoadingSpinner";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import axios from "axios";
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
  FaTruck,
  FaReceipt,
  FaMugHot,
} from "react-icons/fa";

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

// const goalsData = [
//   {
//     id: 1,
//     title: "Save for Vacation",
//     amountSaved: 1000,
//     goalAmount: 3000,
//     monthlyAmount: 400,
//     monthlyGoal: 200,
//   },
//   {
//     id: 2,
//     title: "Emergency Fund",
//     amountSaved: 500,
//     goalAmount: 10000,
//     monthlyAmount: 400,
//     monthlyGoal: 300,
//   },
//   {
//     id: 3,
//     title: "Buy a Car",
//     amountSaved: 8000,
//     goalAmount: 15000,
//     monthlyAmount: 400,
//     monthlyGoal: 400,
//   },
//   {
//     id: 4,
//     title: "Home Renovation",
//     amountSaved: 4000,
//     goalAmount: 5000,
//     monthlyAmount: 400,
//     monthlyGoal: 600,
//   },
//   // Add more goals here
// ];

const Home = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  // const filteredGoals = goalsData.filter((goal) =>
  //   goal.title.toLowerCase().includes(search.toLowerCase())
  // );

  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toLocaleString("default", { month: "long" })
  );

  const [goalsData, setGoalsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [loadingMonth, setLoadingMonth] = useState(false);

  const userId = 1;

  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token"); // token stored on login
      const res = await axios.get(`http://localhost:5000/api/payments`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(
        `Fetched Transactions from API for user ${userId}:`,
        res.data
      ); // Debugging: Log response
      setTransactions(res.data); // Ensure state updates correctly
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setTransactions([]); // Prevent frontend crash
    }
  };

  useEffect(() => {
    fetchTransactions();
    // fetchGoals();
  }, [userId]); // Ensure it fetches when `userId` changes

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const token = localStorage.getItem("token"); // assuming JWT is stored in localStorage

        const res = await axios.get(
          "http://localhost:5000/api/financial-planner/goal",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setGoalsData(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch goals:", error);
        setLoading(false);
      }
    };

    fetchGoals();
  }, []);

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    setLoadingMonth(true);
    fetchTransactions(month);
    setLoadingMonth(false);
  };

  const filteredTransactions = transactions.filter((tx) => {
    const txMonth = new Date(tx.date).toLocaleString("default", {
      month: "long",
    });
    return txMonth === selectedMonth;
  });

  // Group transactions by date
  const groupedByDate = filteredTransactions.reduce((acc, transaction) => {
    const { date } = transaction;
    if (!acc[date]) acc[date] = [];
    acc[date].push(transaction);
    return acc;
  }, {});

  const getMonthName = (dateStr) =>
    new Date(dateStr).toLocaleString("default", { month: "long" });

  const formatCurrency = (amount) => {
    return amount.toLocaleString("en-MY", {
      style: "currency",
      currency: "MYR",
    });
  };

  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0];
      return (
        <div className="profile-custom-tooltip">
          <p className="profile-label">{name}</p>
          <p className="profile-value">{formatCurrency(value)}</p>
        </div>
      );
    }
    return null;
  };

  const expenses = [
    { category: "House", icon: <FaHome /> },
    {
      category: "Groceries",
    },
    {
      category: "Transportation",
    },
    {
      category: "Food",
    },
    {
      category: "Bills",
    },
    {
      category: "Shopping",
    },
  ];

  const categoryColors = {
    Groceries: "#00bfa5",
    Food: "#f44336",
    Shopping: "#ffc107",
    Transportation: "#455a64",
    Bills: "#3f51b5",
    House: "#4caf50",
  };

  const categoryIcons = {
    Groceries: <FaBarcode />,
    Food: <FaMugHot />,
    Shopping: <FaReact />,
    Transportation: <FaTruck />,
    Bills: <FaReceipt />,
    House: <FaHome />,
  };

  const getTotalByCategory = (transactions, selectedMonth) => {
    const totals = {};

    transactions.forEach(({ category, amount, date }) => {
      const month = getMonthName(date);
      if (month === selectedMonth) {
        if (!totals[category]) {
          totals[category] = 0;
        }
        totals[category] += amount;
      }
    });

    return totals;
  };

  const totalByCategory = getTotalByCategory(transactions, selectedMonth);

  const formatDateWithSuffix = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

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
        {/* Cards layout */}
        <div className="goals-grid">
          {goalsData.map((goal) => {
            const progressPercent = Math.round(
              (goal.savedAmount / goal.goalAmount) * 100
            );
            // const monthlyPercent = Math.round(
            //   (goal.monthlyAmount / goal.monthlyGoal) * 100
            // );
            // const isAbove = goal.monthlyAmount >= goal.monthlyGoal;

            const start = new Date(goal.startDate);
            const end = new Date(goal.endDate);

            // Calculate the number of months between the dates
            const monthsDiff =
              (end.getFullYear() - start.getFullYear()) * 12 +
              (end.getMonth() - start.getMonth()) +
              1;

            const monthlyGoal =
              monthsDiff > 0 ? Math.round(goal.goalAmount / monthsDiff) : 0;

            const monthlyAmount = goal.monthlyAmount || 0; // fallback
            const monthlyPercent = Math.round(
              (monthlyAmount / monthlyGoal) * 100
            );
            const isAbove = monthlyAmount >= monthlyGoal;

            // Determine class based on progress percentage
            let progressClass = "progress-grey";
            if (progressPercent >= 75) progressClass = "progress-green";
            else if (progressPercent >= 50) progressClass = "progress-yellow";
            else if (progressPercent >= 25) progressClass = "progress-orange";

            return (
              <div
                key={goal._id}
                className="goal-card"
                onClick={() =>
                  navigate("/app/Goals-Profile", {
                    state: { goal },
                  })
                }
              >
                {/* Title */}
                <div className="goal-title">{goal.goalName}</div>

                {/* Center Percentage with dynamic color */}
                <div className={`goal-progress-percent ${progressClass}`}>
                  {progressPercent}%
                </div>

                {/* Progress Bar */}
                <div className="goal-progress-bar">
                  <div
                    className="goal-progress-fill"
                    style={{
                      width: `${(goal.savedAmount / goal.goalAmount) * 100}%`,
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
          {/* <div className="card expenses">
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
          </div> */}
          {/* Monthly Summary with Chart and Transactions */}

          <div className="profile-summary">
            <section className="profile-dashboard-section">
              <h1>Monthly Summary</h1>

              <div className="profile-month-tabs">
                {["January", "February", "March", "April", "May", "June"].map(
                  (month, idx) => (
                    <button
                      key={idx}
                      className={`profile-month-tab ${
                        selectedMonth === month ? "active" : ""
                      }`}
                      onClick={() => handleMonthChange(month)}
                    >
                      {month}
                    </button>
                  )
                )}
              </div>

              {groupedByDate && Object.keys(groupedByDate).length === 0 ? (
                <NoDataFound />
              ) : loadingMonth ? (
                <LoadingSpinner />
              ) : (
                <div className="profile-summary-content">
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
                          {formatCurrency(
                            pieData.reduce((sum, item) => sum + item.value, 0)
                          )}
                        </tspan>
                      </text>

                      <Tooltip content={<CustomPieTooltip />} />
                    </PieChart>
                  </div>

                  <div className="profile-expenses-sum-category">
                    {expenses.map((transaction, idx) => (
                      <div key={idx} className="profile-expense-card">
                        <div className="profile-expense-icon-wrapper">
                          <div
                            className="profile-transaction-icon"
                            style={{
                              backgroundColor:
                                categoryColors[transaction?.category],
                            }}
                          >
                            {categoryIcons[transaction?.category]}
                          </div>
                        </div>
                        <div className="profile-expense-header">
                          <span className="profile-expense-category">
                            {transaction?.category}
                          </span>
                          <span className="profile-expense-amount">
                            {formatCurrency(
                              totalByCategory[transaction?.category] || 0
                            )}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="profile-transaction-list">
                    {groupedByDate && Object.keys(groupedByDate).length > 0 ? (
                      Object.entries(groupedByDate).map(
                        ([date, transactionsOnDate]) => (
                          <div
                            key={date}
                            className="profile-transaction-date-group"
                          >
                            <h5 className="profile-transaction-date">
                              {formatDateWithSuffix(date)}
                            </h5>
                            {transactionsOnDate?.length > 0 ? (
                              transactionsOnDate.map((transaction, index) => (
                                <div
                                  className="profile-transaction-row"
                                  key={index}
                                >
                                  <div className="profile-transaction-name">
                                    <div
                                      className="profile-transaction-icon"
                                      style={{
                                        backgroundColor:
                                          categoryColors[transaction?.category],
                                      }}
                                    >
                                      {categoryIcons[transaction?.category]}
                                    </div>
                                    <div className="profile-transaction-name-div">
                                      {transaction?.name}
                                      <span className="profile-transaction-category">
                                        {transaction?.category}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="profile-tx-amount">
                                    {formatCurrency(transaction?.amount)}
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p className="profile-no-transaction">
                                No transactions found for this date.
                              </p>
                            )}
                          </div>
                        )
                      )
                    ) : (
                      <p className="profile-no-transaction">
                        No transactions found.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
