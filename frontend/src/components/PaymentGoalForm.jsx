import React, { useState, useEffect } from "react";
import axios from "axios";

function PaymentGoalForm({
  isAddingPayment,
  setIsAddingPayment,
  isEditing,
  editingId,
  existingPayment,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("expense");
  const [goalForm, setGoalForm] = useState({
    amount: "",
    desc: "",
    Date: "",
  });

  useEffect(() => {
    if (isEditing && existingPayment) {
      setGoalForm({
        amount: existingPayment.amount,
        desc: existingPayment.desc,
        date: existingPayment.date?.split("T")[0] || "", // Format ISO date
      });
    }
  }, [isEditing, existingPayment]);

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

  const handleSavePayment = async () => {
    const token = localStorage.getItem("token");

    const payload = {
      goal_ID: goalForm.goalname,
      amount: parseFloat(goalForm.amount),
      desc: goalForm.desc,
      date: goalForm.date,
    };

    try {
      const url = isEditing
        ? `http://localhost:5000/api/payments/${editingId}`
        : "http://localhost:5000/api/payments";

      const method = isEditing ? axios.put : axios.post;

      const res = await method(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      alert(isEditing ? "Payment updated!" : "Payment created!");
      setIsAddingPayment(false);
    } catch (err) {
      console.error("Error saving payment:", err);
      alert("Failed to save payment.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGoalForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!isAddingPayment) return null;

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
              <Icons.Receipt /> Add Payment
            </li>
          </ul>
        </div>

        <div style={formContainerStyle}>
          <div style={formStyle}>
            <h2 style={{ marginBottom: "24px", color: "#333" }}>Payment</h2>

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
                name="desc"
                placeholder="Enter description"
                value={goalForm.desc}
                onChange={handleInputChange}
                style={inputStyle}
              />
            </div>

            {/* Date */}
            <div style={dateRowStyle}>
              <div style={dateFieldStyle}>
                <label style={labelStyle}>Date</label>
                <input
                  type="date"
                  name="date"
                  value={goalForm.date}
                  onChange={handleInputChange}
                  style={inputStyle}
                />
              </div>
            </div>
          </div>

          <div style={modalActionsStyle}>
            <button
              onClick={handleSavePayment}
              style={{
                ...saveButtonStyle,
                opacity: !goalForm.amount || !goalForm.desc ? 0.5 : 1,
                cursor:
                  !goalForm.amount || !goalForm.desc
                    ? "not-allowed"
                    : "pointer",
              }}
              disabled={!goalForm.amount || !goalForm.desc}
            >
              Save Goal
            </button>
            <button
              onClick={() => setIsAddingPayment(false)}
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

export default PaymentGoalForm;
