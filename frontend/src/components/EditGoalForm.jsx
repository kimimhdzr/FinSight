import React, { useState, useEffect } from "react";
import axios from "axios";

function EditGoalForm({ isAddingGoal, setIsAddingGoal, goalId, existingGoal }) {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("expense");
  const [goalForm, setGoalForm] = useState({
    goalname: "",
    amount: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  // Inside your component
  useEffect(() => {
    if (existingGoal) {
      setGoalForm({
        goalname: existingGoal.goalName || "",
        amount: existingGoal.goalAmount || "",
        description: existingGoal.desc || "",
        startDate: existingGoal.startDate?.split("T")[0] || "",
        endDate: existingGoal.endDate?.split("T")[0] || "",
      });
    }
  }, [existingGoal]);

  const Icons = {
    Bars: () => <span>☰</span>,
    Home: () => <span>🏠</span>,
    Utensils: () => <span>🍽️</span>,
    Receipt: () => <span>📄</span>,
    Car: () => <span>🚗</span>,
    Shopping: () => <span>🛒</span>,
    Gamepad: () => <span>🎮</span>,
    Dollar: () => <span>💰</span>,
    File: () => <span>📁</span>,
    Plus: () => <span>➕</span>,
  };

const handleSaveGoal = async () => {
  const token = localStorage.getItem("token");

  const payload = {
    goalName: goalForm.goalname,
    goalAmount: parseFloat(goalForm.amount),
    desc: goalForm.description,
    startDate: goalForm.startDate,
    endDate: goalForm.endDate,
  };

  try {
    const res = await axios.put(
      `http://localhost:5000/api/financial-planner/goal/${goalId}`, // 👈 use goalId
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Goal updated:", res.data);
    alert("Goal updated successfully!");
    setIsAddingGoal(false);
  } catch (err) {
    console.error("Error updating goal:", err);
    alert("Failed to update goal.");
  }
};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGoalForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const goalCategories = ["Food", "Transport", "Utilities"]; // example
  const categoryIcons = {
    Food: "🍔",
    Transport: "🚗",
    Utilities: "💡",
  };

  if (!isAddingGoal) return null;

  return (
    <div style={modalBackdropStyle}>
      <div style={modalStyle}>
        {/* Hamburger Button */}
        <button
          style={hamburgerStyle}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <Icons.Bars />
        </button>

        {/* Sidenav Drawer */}
        <div
          style={{
            ...sidenavStyle,
            transform: isMenuOpen ? "translateX(0)" : "translateX(-100%)",
          }}
        >
          <ul style={sidenavListStyle}>
            <li
              style={{
                ...sidenavItemStyle,
                backgroundColor:
                  activeTab === "expense" ? "#007bff" : "transparent",
                color: activeTab === "expense" ? "white" : "#333",
              }}
              onClick={() => {
                setActiveTab("expense");
                setGoalForm((prev) => ({
                  ...prev,
                  type: "expense",
                  category: "Food",
                }));
                setIsMenuOpen(false);
              }}
            >
              <Icons.Receipt /> Edit Goal
            </li>
          </ul>
        </div>

        <div style={formContainerStyle}>
          <div style={formStyle}>
            <h2 style={{ marginBottom: "24px", color: "#333" }}>
              Edit Goal
            </h2>

            {/* Category Selection */}
            {/* <div style={formGroupStyle}>
              <label style={labelStyle}>Category</label>
              <div style={categoryGridStyle}>
                {expenseCategories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setPaymentForm(prev => ({ ...prev, category }))}
                    style={{
                      ...categoryButtonStyle,
                      backgroundColor: paymentForm.category === category ? '#007bff' : '#f8f9fa',
                      color: paymentForm.category === category ? 'white' : '#333',
                      border: paymentForm.category === category ? '2px solid #007bff' : '2px solid #dee2e6'
                    }}
                  >
                    <div style={{ marginBottom: '8px', fontSize: '20px' }}>
                      {categoryIcons[category]}
                    </div>
                    {category}
                  </button>
                ))}
              </div>
            </div> */}

            {/* Goal Name */}
            <div style={formGroupStyle}>
              <label style={labelStyle}>Name</label>
              <input
                type="text"
                name="goalname"
                placeholder="Enter Goal Name"
                value={goalForm.goalname}
                onChange={handleInputChange}
                style={inputStyle}
              />
            </div>

            {/* Amount */}
            <div style={formGroupStyle}>
              <label style={labelStyle}>Amount (RM)</label>
              <input
                type="number"
                name="amount"
                placeholder="0.00"
                value={goalForm.amount}
                onChange={handleInputChange}
                style={inputStyle}
                step="0.01"
                min="0"
              />
            </div>

            {/* Description */}
            <div style={formGroupStyle}>
              <label style={labelStyle}>Description</label>
              <input
                type="text"
                name="description"
                placeholder="Enter description"
                value={goalForm.description}
                onChange={handleInputChange}
                style={inputStyle}
              />
            </div>

            {/* Date */}
            <div style={dateRowStyle}>
              <div style={dateFieldStyle}>
                <label style={labelStyle}>Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={goalForm.startDate}
                  onChange={handleInputChange}
                  style={inputStyle}
                />
              </div>
              <div style={dateFieldStyle}>
                <label style={labelStyle}>End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={goalForm.endDate}
                  onChange={handleInputChange}
                  style={inputStyle}
                />
              </div>
            </div>
          </div>

          <div style={modalActionsStyle}>
            <button
              onClick={handleSaveGoal}
              style={{
                ...saveButtonStyle,
                opacity: !goalForm.amount || !goalForm.description ? 0.5 : 1,
                cursor:
                  !goalForm.amount || !goalForm.description
                    ? "not-allowed"
                    : "pointer",
              }}
              disabled={!goalForm.amount || !goalForm.description}
            >
              Save Goal
            </button>
            <button
              onClick={() => setIsAddingGoal(false)}
              style={cancelButtonStyle}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const modalBackdropStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle = {
  position: "relative",
  backgroundColor: "white",
  borderRadius: "12px",
  width: "90%",
  maxWidth: "800px",
  maxHeight: "90vh",
  overflow: "hidden",
  display: "flex",
  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
};

const hamburgerStyle = {
  position: "absolute",
  top: "20px",
  left: "20px",
  background: "none",
  border: "none",
  fontSize: "20px",
  cursor: "pointer",
  zIndex: 1001,
  color: "#333",
  padding: "10px",
};

const sidenavStyle = {
  position: "absolute",
  left: 0,
  top: 0,
  width: "250px",
  height: "100%",
  backgroundColor: "#f8f9fa",
  transition: "transform 0.3s ease",
  zIndex: 1000,
  borderRight: "1px solid #dee2e6",
};

const sidenavListStyle = {
  listStyle: "none",
  padding: "60px 0 0 0",
  margin: 0,
};

const sidenavItemStyle = {
  padding: "15px 20px",
  cursor: "pointer",
  transition: "all 0.3s ease",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  borderBottom: "1px solid #dee2e6",
};

const formContainerStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  marginLeft: "0",
  height: "100%",
};

const formStyle = {
  flex: 1,
  padding: "60px 40px 20px 40px",
  overflowY: "auto",
};

const formGroupStyle = {
  marginBottom: "20px",
};

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  fontWeight: "600",
  color: "#333",
  fontSize: "14px",
};

const dateRowStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "16px",
  marginBottom: "20px",
};

const dateFieldStyle = {
  flex: "1 1 200px", // allows shrinking on small screens
  minWidth: "150px",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  border: "2px solid #dee2e6",
  borderRadius: "8px",
  fontSize: "14px",
  transition: "border-color 0.3s ease",
  outline: "none",
  boxSizing: "border-box",
};

const categoryGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
  gap: "12px",
  marginTop: "8px",
};

const categoryButtonStyle = {
  padding: "16px 12px",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "all 0.3s ease",
  fontSize: "12px",
  fontWeight: "500",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "80px",
};

const modalActionsStyle = {
  padding: "20px 40px",
  borderTop: "1px solid #dee2e6",
  display: "flex",
  gap: "12px",
  justifyContent: "flex-end",
  backgroundColor: "#f8f9fa",
};

const saveButtonStyle = {
  padding: "12px 24px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
  transition: "background-color 0.3s ease",
};

const cancelButtonStyle = {
  padding: "12px 24px",
  backgroundColor: "transparent",
  color: "#6c757d",
  border: "2px solid #6c757d",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
  transition: "all 0.3s ease",
};

export default EditGoalForm;
