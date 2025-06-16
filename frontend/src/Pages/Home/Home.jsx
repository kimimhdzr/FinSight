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
  FaTruck,
  FaReceipt,
  FaMugHot,
} from "react-icons/fa";

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

const expensesData = [
  {
    category: "Housing",
    amount: "RM 4,925.25",
    change: "15%",
    direction: "up",
  },
  {
    category: "Wi-Fi",
    amount: "RM 489.25",
    change: "1%",
    direction: "down",
  },
  {
    category: "Transport",
    amount: "RM 325.00",
    change: "5%",
    direction: "up",
  },
  {
    category: "Food",
    amount: "RM 850.75",
    change: "8%",
    direction: "down",
  },
  {
    category: "Entertainment",
    amount: "RM 1,200.00",
    change: "10%",
    direction: "up",
  },
  {
    category: "Shopping",
    amount: "RM 1,000.00",
    change: "12%",
    direction: "up",
  },
  {
    category: "Health",
    amount: "RM 500.00",
    change: "3%",
    direction: "down",
  },
];



const Home = () => {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1 (555) 123-4567",
    location: "Kuala Lumpur, Malaysia",
    dob: "1998-05-22",
    bio: "Passionate software engineer with a love for clean UI and scalable backend systems.",
    profilePic: null,
    backgroundPic: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);
  const [activeTab, setActiveTab] = useState("profile");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("May");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUser(formData);
    setIsEditing(false);
  };

  const formatDateWithSuffix = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };

  const transactions = [
    {
      name: "TESCO EXPRESS AMPANG",
      amount: 42.5,
      category: "Groceries",
      date: "2025-05-01",
    },
    {
      name: "GRABFOOD - NASI KUKUS WARISAN",
      amount: 15.9,
      category: "Food & Beverages",
      date: "2025-05-01",
    },
    {
      name: "MR DIY BANDAR BARU",
      amount: 18.75,
      category: "Shopping",
      date: "2025-05-01",
    },
    {
      name: "BANK BRI - ATM CARD",
      amount: 50.0,
      category: "Utilities",
      date: "2025-05-01",
    },

    {
      name: "PETRONAS - FUEL",
      amount: 65.0,
      category: "Transportation",
      date: "2025-05-04",
    },

    {
      name: "OLDTOWN COFFEE",
      amount: 12.5,
      category: "Food & Beverages",
      date: "2025-05-06",
    },
    {
      name: "MYDIN MALL",
      amount: 28.0,
      category: "Groceries",
      date: "2025-05-06",
    },

    {
      name: "ZALORA ONLINE SHOPPING",
      amount: 150.0,
      category: "Shopping",
      date: "2025-05-07",
    },

    {
      name: "RAPID TNG TOP UP",
      amount: 10.0,
      category: "Transportation",
      date: "2025-05-09",
    },
    {
      name: "MAXIS - MOBILE BILL",
      amount: 100.0,
      category: "Utilities",
      date: "2025-05-09",
    },

    {
      name: "HOME RENT - MAY 2025",
      amount: 1800.0,
      category: "Rent",
      date: "2025-05-10",
    },

    {
      name: "STARBUCKS - COFFEE",
      amount: 20.0,
      category: "Food & Beverages",
      date: "2025-05-11",
    },

    {
      name: "LAZADA ONLINE ORDER",
      amount: 85.0,
      category: "Shopping",
      date: "2025-05-13",
    },

    {
      name: "7-ELEVEN SNACKS",
      amount: 7.5,
      category: "Food & Beverages",
      date: "2025-05-14",
    },
    {
      name: "TELEKOM BILL",
      amount: 130.0,
      category: "Utilities",
      date: "2025-05-14",
    },

    {
      name: "FUEL - SHELL",
      amount: 70.0,
      category: "Transportation",
      date: "2025-05-17",
    },

    {
      name: "AEON BIG GROCERIES",
      amount: 95.0,
      category: "Groceries",
      date: "2025-05-18",
    },
    {
      name: "KFC DINNER",
      amount: 30.0,
      category: "Food & Beverages",
      date: "2025-05-18",
    },

    {
      name: "NETFLIX SUBSCRIPTION",
      amount: 62.9,
      category: "Utilities",
      date: "2025-05-20",
    },

    {
      name: "GUARDIAN PHARMACY",
      amount: 22.0,
      category: "Shopping",
      date: "2025-05-21",
    },

    {
      name: "GRAB RIDE",
      amount: 18.0,
      category: "Transportation",
      date: "2025-05-22",
    },
    { name: "TESCO", amount: 110.0, category: "Groceries", date: "2025-05-22" },

    {
      name: "PIZZA HUT",
      amount: 45.0,
      category: "Food & Beverages",
      date: "2025-05-24",
    },

    {
      name: "MR DIY CABLES",
      amount: 26.0,
      category: "Shopping",
      date: "2025-05-26",
    },

    {
      name: "GAS BILL",
      amount: 90.0,
      category: "Utilities",
      date: "2025-05-27",
    },

    {
      name: "SHELL TANK",
      amount: 60.0,
      category: "Transportation",
      date: "2025-05-28",
    },

    {
      name: "JAYA GROCER",
      amount: 75.0,
      category: "Groceries",
      date: "2025-05-29",
    },
    {
      name: "STARBUCKS COFFEE",
      amount: 19.5,
      category: "Food & Beverages",
      date: "2025-05-29",
    },

    {
      name: "AIRBNB - HOLIDAY",
      amount: 400.0,
      category: "Rent",
      date: "2025-05-30",
    },

    {
      name: "MAXIS PREPAID TOPUP",
      amount: 30.0,
      category: "Utilities",
      date: "2025-05-31",
    },
    {
      name: "BURGER KING",
      amount: 22.0,
      category: "Food & Beverages",
      date: "2025-05-31",
    },
    {
      name: "ZALORA - CLOTHING",
      amount: 120.0,
      category: "Shopping",
      date: "2025-06-01",
    },
  ];

  const getMonthlyTotals = (transactions) => {
    return transactions.reduce((acc, transaction) => {
      const date = new Date(transaction.date);
      const monthName = date.toLocaleString("default", { month: "long" });

      if (!acc[monthName]) {
        acc[monthName] = 0;
      }

      acc[monthName] += transaction.amount;

      return acc;
    }, {});
  };

  const filteredTransactions = transactions.filter((tx) => {
    const txMonth = new Date(tx.date).toLocaleString("default", {
      month: "long",
    });
    return txMonth === selectedMonth;
  });

  const categoryColors = {
    Groceries: "#00bfa5",
    "Food & Beverages": "#f44336",
    Shopping: "#ffc107",
    Transportation: "#455a64",
    Utilities: "#3f51b5",
    Rent: "#4caf50",
  };

  const categoryIcons = {
    Groceries: <FaBarcode />,
    "Food & Beverages": <FaMugHot />,
    Shopping: <FaReact />,
    Transportation: <FaTruck />,
    Utilities: <FaReceipt />,
    Rent: <FaHome />,
  };

  const pieData = filteredTransactions.reduce((acc, curr) => {
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

  const goals = [
    {
      title: "Save for Vacation",
      description: "Trip to Europe",
      status: "In Progress",
      amount: 1000,
      goalAmount: 5000,
    },
    {
      title: "Emergency Fund",
      description: "Safety net",
      status: "In Progress",
      amount: 5687.56,
      goalAmount: 10000,
    },
    {
      title: "New Laptop",
      description: "Upgrade laptop",
      status: "Completed",
      amount: 5000,
      goalAmount: 5000,
    },
  ];

  const getMonthName = (dateStr) =>
    new Date(dateStr).toLocaleString("default", { month: "long" });

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

  const expenses = [
    { category: "Rent", icon: <FaHome /> },
    {
      category: "Groceries",
    },
    {
      category: "Transportation",
    },
    {
      category: "Food & Beverages",
    },
    {
      category: "Utilities",
    },
    {
      category: "Shopping",
    },
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

  // Group transactions by date
  const groupedByDate = filteredTransactions.reduce((acc, transaction) => {
    const { date } = transaction;
    if (!acc[date]) acc[date] = [];
    acc[date].push(transaction);
    return acc;
  }, {});
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
              {expensesData.map((expense, index) => (
                <div key={index} className="expense-item">
                  <div className="category">
                    {expense.category}
                    <div className="amount">{expense.amount}</div>
                  </div>
                  <span className={`change ${expense.direction}`}>
                    {expense.change} {expense.direction === "up" ? "🔺" : "🔻"}
                  </span>
                </div>
              ))}
            </div>
          </div>
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
                      onClick={() => setSelectedMonth(month)}
                    >
                      {month}
                    </button>
                  )
                )}
              </div>
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

              <div className="profile-expenses-sum-category">
                {expenses.map((expense, idx) => (
                  <div key={idx} className="profile-expense-card">
                    <div className="profile-expense-icon-wrapper">
                      <div
                        className="profile-transaction-icon"
                        style={{
                          backgroundColor: categoryColors[expense.category],
                        }}
                      >
                        {categoryIcons[expense.category]}
                      </div>
                    </div>
                    <div className="home-expense-details">
                      <div className="profile-expense-header">
                        <span className="profile-expense-category">
                          {expense.category}
                        </span>
                        <span className="profile-expense-amount">
                          RM{" "}
                          {(totalByCategory[expense.category] || 0).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="profile-transaction-list">
                {Object.entries(groupedByDate).map(
                  ([date, transactionsOnDate]) => (
                    <div key={date} className="profile-transaction-date-group">
                      <h5 className="profile-transaction-date">
                        {formatDateWithSuffix(date)}
                      </h5>
                      {transactionsOnDate.map((transaction, index) => (
                        <div className="profile-transaction-row" key={index}>
                          <div className="profile-transaction-name">
                            <div
                              className="profile-transaction-icon"
                              style={{
                                backgroundColor:
                                  categoryColors[transaction.category],
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
                  )
                )}
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
