import React, { useState, useEffect } from "react";
import "./GoalsOverview.css"; // CSS styling
import { useNavigate } from "react-router-dom";
import GoalForm from "../../components/GoalForm";
import axios from "axios";

const GoalsOverview = () => {
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [goalsData, setGoalsData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const filteredGoals = goalsData.filter((goal) =>
    goal.goalName.toLowerCase().includes(search.toLowerCase())
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
