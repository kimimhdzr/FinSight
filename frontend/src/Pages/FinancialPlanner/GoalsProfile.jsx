import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./GoalsProfile.css"; // Link your CSS here
import SavingsLineChart from "./SavingsLineChart";
import SavedVsRemainingPieChart from "./SavedVsRemainingPieChart";
import PaymentGoalForm from "../../components/PaymentGoalForm";
import MonthlyBarChart from "./MonthlyBarChart";
import axios from "axios";

const GoalsOverviewProfile = () => {
  const navigate = useNavigate();
  const [isAddingPayment, setIsAddingPayment] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [payments, setPayments] = useState([]);
const [existingPayment, setExistingPayment] = useState(null);

const location = useLocation();
const goal = location.state?.goal; // The full goal object
const goalId = goal?._id;


useEffect(() => {
  if (goalId) {
    // Fetch goal details using goalId
    console.log("Received goal ID:", goalId);
  }
}, [goalId]);


  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const shortMonths = months.map((m) => m.slice(0, 3));

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);
  const [selectedMonth, setSelectedMonth] = useState(
    months[new Date().getMonth()]
  );
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);

  useEffect(() => {
    fetchPayments();
    const interval = setInterval(fetchPayments, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchPayments = async () => {
    try {
      const token = localStorage.getItem("token"); // token stored on login
      const res = await axios.get(
        `http://localhost:5000/api/financial-planner/record/payment/6859bcfc2086a5fc4c2ab563`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setPayments(res.data);
    } catch (err) {
      console.error("Error fetching payments:", err);
    }
  };

  const goalProfileData = {
    id: 1,
    title: "Save for Vacation",
    pic: "", // Image URL
    note: "Family vacation to Bali in December.",
    amount: 4000,
    dateStart: "2025-01-01",
    dateEnded: "2025-12-31",
    progress: [
      { id: 1, amount: 500, date: "2025-01-15", note: "Initial deposit" },
      { id: 2, amount: 300, date: "2025-02-10", note: "Monthly saving" },
      { id: 3, amount: 200, date: "2025-03-10", note: "Bonus deposit" },
      { id: 4, amount: 300, date: "2025-04-05", note: "Monthly saving" },
      { id: 5, amount: 250, date: "2025-05-07", note: "Gift bonus" },
      { id: 6, amount: 300, date: "2025-06-10", note: "Monthly saving" },
      { id: 7, amount: 300, date: "2025-07-12", note: "Monthly saving" },
      { id: 8, amount: 200, date: "2025-08-09", note: "Top-up" },
      { id: 9, amount: 300, date: "2025-09-15", note: "Monthly saving" },
    ],
  };

  const filterByMonthYear = (records) => {
    return records.filter((p) => {
      const d = new Date(p.date);
      return (
        d.getFullYear() === selectedYear &&
        months[d.getMonth()] === selectedMonth
      );
    });
  };

  const groupByDate = (records) => {
    const grouped = {};
    records.forEach((item) => {
      const date = new Date(item.date).toDateString();
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(item);
    });
    return Object.entries(grouped).map(([date, items]) => ({ date, items }));
  };

  const visiblePayments = filterByMonthYear(payments);
  const uniqueExpenseCategories = [
    ...new Set(
      payments
        .filter(
          (p) =>
            p.type === "expense" &&
            new Date(p.date).getFullYear() === selectedYear
        )
        .map((p) => p.category)
    ),
  ];

  const groupedTransactions = groupByDate(visiblePayments).sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const [paymentForm, setPaymentForm] = useState({
    type: "expense",
    category: "Food",
    amount: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handlePaymentFormChange = (e) => {
    const { name, value } = e.target;
    setPaymentForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="goal-content">
      <div className="dashboard">
        {/* Header */}
        <header className="goal-header">
          <h1 onClick={() => navigate("/app/GoalsOverview")}>
            Financial Planner |{" "}
            <span className="goal-header-specific">
              {goal.goalName}
            </span>
          </h1>
        </header>

        {/* 1. Goal Details Section */}
        <section className="goal-details-section">
          <div className="goal-details-pic">
            {goal.goalPicUrl ? (
              <img src={goal.goalPicUrl} alt="Goal" />
            ) : (
              <div className="goal-placeholder-pic">No Image</div>
            )}
          </div>
          <div className="goal-details-info">
            <div>
              <strong>Note:</strong> {goal.desc}
            </div>
            <div>
              <strong>Start Date:</strong> {goal.startDate}
            </div>
            <div>
              <strong>End Date:</strong> {goal.endDate}
            </div>
            <div>
              <strong>Duration:</strong>{" "}
              {calculateDuration(
                goal.startDate,
                goal.endDate
              )}
            </div>
          </div>
        </section>

        {/* 2. Dashboard Section */}
        {/* <section className="goal-dashboard-section">
          <h2>Goal Dashboard</h2>

          <div className="goal-dashboard-grid">
            <div className="dashboard-card full-width">
              <h4>Saved vs Remaining</h4>
              <SavedVsRemainingPieChart
                progress={goalProfileData.progress}
                goalAmount={goalProfileData.amount}
              />
            </div>

            <div className="dashboard-card">
              <h4>Savings Over Time</h4>
              <SavingsLineChart progress={goalProfileData.progress} />
            </div>

            <div className="dashboard-card">
              <h4>Monthly Contributions</h4>
              <MonthlyBarChart progress={goalProfileData.progress} />
            </div>
          </div>
        </section> */}

        {/* 3. Payment Progress Section */}
        <div style={transactionCardStyle}>
          <div style={transactionHeaderStyle}>
            <h2 style={{ margin: "0", fontSize: "1.5rem" }}>Monthly Payment</h2>
            <button
              style={addPaymentButtonStyle}
              onClick={() => setIsAddingPayment(true)}
            >
              Add Payment
            </button>
          </div>
          <div style={transactionListStyle}>
            {groupedTransactions.map((day, i) => (
              <div key={i}>
                <div style={dateHeaderStyle}>{day.date}</div>
                {day.items.map((item, j) => (
                  <div key={j} style={transactionItemStyle}>
                    <div>
                      <div style={{ fontWeight: 600 }}>{item.desc}</div>
                      <div
                        style={{
                          marginTop: "5px",
                          display: "flex",
                          gap: "10px",
                        }}
                      >
                        <button
                          style={{
                            fontSize: "12px",
                            color: "#007bff",
                            cursor: "pointer",
                            background: "none",
                            border: "none",
                          }}
                          onClick={() => {
                            setIsAddingPayment(true);
                            setIsEditing(true);
                            setEditingId(item._id);
                            setExistingPayment(item); // 👈 pass full payment data
                          }}
                        >
                          Edit
                        </button>
                        <button
                          style={{
                            fontSize: "12px",
                            color: "red",
                            cursor: "pointer",
                            background: "none",
                            border: "none",
                          }}
                          onClick={async () => {
                            if (
                              window.confirm(
                                "Are you sure you want to delete this payment?"
                              )
                            ) {
                              try {
                                const token = localStorage.getItem("token");
                                await axios.delete(
                                  `http://localhost:5000/api/payments/${item._id}`,
                                  {
                                    headers: {
                                      Authorization: `Bearer ${token}`,
                                      "Content-Type": "application/json",
                                    },
                                  }
                                );
                                await fetchPayments();
                                alert("Payment deleted successfully.");
                              } catch (err) {
                                alert("Error deleting payment.");
                              }
                            }
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <span style={amountBadgeStyle}>
                      RM {item.amount.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Popup form */}
        {isAddingPayment && (
          <PaymentGoalForm
            isAddingPayment={isAddingPayment}
            setIsAddingPayment={setIsAddingPayment}
            isEditing={isEditing}
            editingId={editingId}
            existingPayment={existingPayment}
          />
        )}
      </div>
    </div>
  );
};

// Helpers
const totalSaved = (progress) => progress.reduce((sum, p) => sum + p.amount, 0);

const averageMonthlySaving = (progress) => {
  const months = new Set(progress.map((p) => p.date.slice(0, 7)));
  return Math.round(totalSaved(progress) / months.size);
};

const getLastPaymentDate = (progress) => {
  if (progress.length === 0) return "N/A";
  return progress[progress.length - 1].date;
};

const calculateRemainingDays = (endDateStr) => {
  const end = new Date(endDateStr);
  const now = new Date();
  const diff = Math.max(0, end - now);
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

const calculateDuration = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const months =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());
  return `${months} months`;
};

const transactionItemStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px 20px",
  borderBottom: "1px solid #f0f0f0",
};
const amountBadgeStyle = {
  backgroundColor: "#f8f9fa",
  color: "#333",
  padding: "4px 12px",
  borderRadius: "12px",
  fontSize: "14px",
  fontWeight: "600",
};

const transactionCardStyle = {
  backgroundColor: "white",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  overflow: "hidden",
};

const transactionHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px",
  borderBottom: "1px solid #dee2e6",
};

const addPaymentButtonStyle = {
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "600",
  transition: "background-color 0.3s ease",
};

const transactionListStyle = {
  padding: "0",
};

const dateHeaderStyle = {
  backgroundColor: "#f8f9fa",
  padding: "12px 20px",
  fontWeight: "600",
  fontSize: "14px",
  color: "#666",
};

export default GoalsOverviewProfile;
