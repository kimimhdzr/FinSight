import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import "./Home.css"; // CSS styling

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

const Home = () => {
  return (
    <div className="content">
      {/* Main Dashboard Content */}
      <div className="dashboard">
        {/* Header */}
        <header className="dashboard-header">
          <h1>Dashboard</h1>
          <span>Hello Hakimi, Welcome Back</span>
        </header>

        {/* Statistics cards */}
        <div className="stats">
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
              <div className="chart-transaction">
                <div className="chart-section">
                  {/* Donut Chart */}
                  <div className="donut-chart">
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
                    <div className="center-text">29%</div>
                  </div>

                  {/* Transactions List */}
                  <div className="transaction-list">
                    <h5 className="transaction-date">20 Apr 2025</h5>
                    {transactions.map((transaction, index) => (
                      <table className="transaction-table" key={index}>
                        <tbody>
                          <tr>
                            <td className="transaction-name">
                              {transaction.name}
                            </td>
                            <td className="tx-amount">
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
