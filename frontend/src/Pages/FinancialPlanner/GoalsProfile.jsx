import React from "react";
import "./GoalsProfile.css"; // Link your CSS here

const GoalsOverviewProfile = () => {
  const goalProfileData = {
    id: 1,
    title: "Save for Vacation",
    pic: "", // Image URL
    note: "Family vacation to Bali in December.",
    dateStart: "2025-01-01",
    dateEnded: "2025-12-31",
    progress: [
      {
        id: 1,
        amount: 500,
        date: "2025-01-15",
        note: "Initial deposit",
      },
      {
        id: 2,
        amount: 300,
        date: "2025-02-10",
        note: "Monthly saving",
      },
      {
        id: 3,
        amount: 200,
        date: "2025-03-10",
        note: "Bonus deposit",
      },
    ],
  };

  return (
    <div className="goal-content">
      <div className="dashboard">
        {/* Header */}
        <header className="goal-header">
          <h1>
            Financial Planner |{" "}
            <span className="goal-header-specific">{goalProfileData.title}</span>
          </h1>
        </header>

        {/* 1. Goal Details Section */}
        <section className="goal-details-section">
          <div className="goal-details-pic">
            {goalProfileData.pic ? (
              <img src={goalProfileData.pic} alt="Goal" />
            ) : (
              <div className="goal-placeholder-pic">No Image</div>
            )}
          </div>
          <div className="goal-details-info">
            <div><strong>Note:</strong> {goalProfileData.note}</div>
            <div><strong>Start Date:</strong> {goalProfileData.dateStart}</div>
            <div><strong>End Date:</strong> {goalProfileData.dateEnded}</div>
            <div><strong>Duration:</strong> {calculateDuration(goalProfileData.dateStart, goalProfileData.dateEnded)}</div>
          </div>
        </section>

        {/* 2. Dashboard Section */}
        <section className="goal-dashboard-section">
          <h2>Goal Dashboard</h2>
          <div className="goal-dashboard-grid">
            <div className="dashboard-card">
              <h4>Total Saved</h4>
              <p>${totalSaved(goalProfileData.progress)}</p>
            </div>
            <div className="dashboard-card">
              <h4>Average Monthly Saving</h4>
              <p>${averageMonthlySaving(goalProfileData.progress)}</p>
            </div>
            <div className="dashboard-card">
              <h4>Last Contribution</h4>
              <p>{getLastPaymentDate(goalProfileData.progress)}</p>
            </div>
            <div className="dashboard-card">
              <h4>Remaining Time</h4>
              <p>{calculateRemainingDays(goalProfileData.dateEnded)} days</p>
            </div>
          </div>
        </section>

        {/* 3. Payment Progress Section */}
        <section className="goal-payments-section">
          <h2>Monthly Payments</h2>
          <ul className="goal-payments-list">
            {goalProfileData.progress.map((item) => (
              <li key={item.id} className="goal-payment-item">
                <div>
                  <strong>${item.amount}</strong> on {item.date}
                  <br />
                  <small>{item.note}</small>
                </div>
                <button className="edit-button">Edit</button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

// Helpers
const totalSaved = (progress) =>
  progress.reduce((sum, p) => sum + p.amount, 0);

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
  const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 +
                 (endDate.getMonth() - startDate.getMonth());
  return `${months} months`;
};

export default GoalsOverviewProfile;
