import React, { useState } from "react";
import "./GoalsOverview.css"; // CSS styling
import { useNavigate } from "react-router-dom";
import GoalForm from "../../components/GoalForm";

const GoalsOverview = () => {
  const [isAddingGoal, setIsAddingGoal] = useState(false);

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

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const filteredGoals = goalsData.filter((goal) =>
    goal.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="goal-content">
      <div className="dashboard">
        <header className="goal-header">
          <h1 onClick={() => navigate("/app/GoalsOverview")}>
            Financial Planner |{" "}
            <span className="goal-header-specific">Goals Overview</span>
          </h1>
        </header>

        <div className="goals-container">
          {/* search bar and button */}
          <div className="goal-search-container">
            <input
              type="text"
              className="goal-search-bar"
              placeholder="Search your goals..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="filler-goal"></div>
            <button
              className="add-goal-button"
              onClick={() => setIsAddingGoal(true)}
            >
              <span className="button-icon">➕</span>{" "}
              {/* Replace with icon if using a library */}
              <span>Add Goal</span>
            </button>
          </div>

          {/* Cards layout */}
          <div className="goals-grid">
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

          {/* Popup form */}
          {isAddingGoal && (
            <GoalForm
              isAddingGoal={isAddingGoal}
              setIsAddingGoal={setIsAddingGoal}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default GoalsOverview;
