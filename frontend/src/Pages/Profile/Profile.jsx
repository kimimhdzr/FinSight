// Profile.jsx
import React, { useState } from "react";
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
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import "./Profile.css";

const Profile = () => {
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

  const expenses = [
    { category: "Rent", amount: 1000, date: "2025-05-01", icon: <FaHome /> },
    {
      category: "Groceries",
      amount: 250,
      date: "2025-05-05",
      icon: <FaBarcode />,
    },
    {
      category: "Transportation",
      amount: 120,
      date: "2025-05-06",
      icon: <FaTruck />,
    },
    {
      category: "Entertainment",
      amount: 90,
      date: "2025-05-10",
      icon: <FaGift />,
    },
    {
      category: "Utilities",
      amount: 160,
      date: "2025-05-03",
      icon: <FaReceipt />,
    },
  ];

  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0];
      return (
        <div className="custom-tooltip">
          <p className="label">{name}</p>
          <p className="value">RM {value.toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="profile-container">
      <div className="profile-background">
        <img
          src={user.backgroundPic || "/staticimages/default_background.jpg"}
          alt="Background"
        />
        <button className="edit-button" onClick={() => setIsEditing(true)}>
          <FaEdit /> Edit Profile
        </button>
      </div>

      <div className="profile-body">
        <div className="profile-header">
          <div className="profile-pic">
            {user.profilePic ? (
              <img
                src={user.profilePic}
                alt="Profile"
                className="profile-image"
              />
            ) : (
              <FaUserCircle className="default-profile-image" />
            )}
            <h2>{user.name}</h2>
            <p>
              {formatDateWithSuffix(user.dob)} ({calculateAge(user.dob)})
            </p>
          </div>

          <div className="profile-info">
            <div className="info-row">
              <FaTextHeight className="profile-icon" />
              <span>{user.bio}</span>
            </div>
            <div className="info-row">
              <FaEnvelope className="profile-icon" />
              <span>{user.email}</span>
            </div>
            <div className="info-row">
              <FaPhone className="profile-icon" />
              <span>{user.phone}</span>
            </div>
            <div className="info-row">
              <FaMapMarkerAlt className="profile-icon" />
              <span>{user.location}</span>
            </div>
          </div>
        </div>
        <div className="goals">
          <section className="dashboard-section">
            <h1>Goals</h1>
            <div className="goals-card-container">
              {goals.map((goal, idx) => {
                const progressPercent = Math.min(
                  (goal.amount / goal.goalAmount) * 100,
                  100
                );

                return (
                  <div key={idx} className="goal-card">
                    <h3>{goal.title}</h3>
                    <p>{goal.description}</p>
                    <p>
                      RM {goal.amount.toFixed(2)} / RM{" "}
                      {goal.goalAmount.toFixed(2)}
                    </p>
                    <div className="progress-bar-container">
                      <div
                        className="progress-bar"
                        style={{ width: `${progressPercent}%` }}
                      ></div>
                    </div>
                    <p className="goal-status">{goal.status}</p>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        <div className="expenses">
          <section className="dashboard-section">
            <h1>Expenses</h1>
            <div className="expenses-card-container">
              {expenses.map((expense, idx) => (
                <div key={idx} className="expense-card">
                  <div className="expense-icon-wrapper">
                    <span className="expense-icon">{expense.icon}</span>
                  </div>
                  <div className="expense-details">
                    <div className="expense-header">
                      <span className="expense-category">
                        {expense.category}
                      </span>
                      <span className="expense-amount">
                        RM {expense.amount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="summary">
          <section className="dashboard-section">
            <h1>Monthly Summary</h1>
            <div className="chart-section">
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

            <div className="transaction-list">
              <h5 className="transaction-date">20 Apr 2025</h5>
              {transactions.map((transaction, index) => (
                <div className="transaction-row" key={index}>
                  <div className="transaction-name">
                    <div
                      className="transaction-icon"
                      style={{
                        backgroundColor: categoryColors[transaction.category],
                      }}
                    >
                      {categoryIcons[transaction.category]}
                    </div>
                    <div className="transaction-name-div">
                      {transaction.name}
                      <span className="transaction-category">
                        {transaction.category}
                      </span>
                    </div>
                  </div>
                  <div className="tx-amount">
                    RM {transaction.amount.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {isEditing && (
        <div className="modal-backdrop">
          <div className="modal modal-layout">
            {/* Hamburger Button */}
            <button
              className="hamburger"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <FaBars />
            </button>

            {/* Sidenav Drawer */}
            <div className={`sidenav ${isMenuOpen ? "open" : ""}`}>
              <ul>
                <li
                  className={activeTab === "profile" ? "active" : ""}
                  onClick={() => {
                    setActiveTab("profile");
                    setIsMenuOpen(false);
                  }}
                >
                  <FaUserCircle /> Profile
                </li>
                <li
                  className={activeTab === "password" ? "active" : ""}
                  onClick={() => {
                    setActiveTab("password");
                    setIsMenuOpen(false);
                  }}
                >
                  <FaLock /> Password
                </li>
                <li
                  className={activeTab === "notifications" ? "active" : ""}
                  onClick={() => {
                    setActiveTab("notifications");
                    setIsMenuOpen(false);
                  }}
                >
                  <FaBell /> Notifications
                </li>
              </ul>
            </div>

            <div className="profile-form">
              {activeTab === "profile" && (
                <div className="form">
                  <h2>Edit Profile</h2>
                  <div className="form-avatar">
                    <label
                      htmlFor="profilePicInput"
                      className="profile-pic-wrapper"
                    >
                      {user.profilePic ? (
                        <img
                          src={user.profilePic}
                          alt="Profile"
                          className="profile-image"
                        />
                      ) : (
                        <FaUserCircle className="default-profile-image" />
                      )}
                      <div className="camera-icon">
                        <FaCamera />
                      </div>
                    </label>
                    <input
                      type="file"
                      id="profilePicInput"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setFormData({
                              ...formData,
                              profilePic: reader.result,
                            });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <div className="avatar-actions">
                      <button
                        onClick={() =>
                          document.getElementById("profilePicInput").click()
                        }
                      >
                        Upload New
                      </button>
                      <button
                      // onClick={() =>
                      //   setFormData({ ...formData, profilePic: null })
                      // }
                      >
                        Delete avatar
                      </button>
                    </div>

                    <div className="form-group">
                      <label
                        htmlFor="background-upload"
                        className="upload-background"
                      >
                        Upload Background
                      </label>
                      <input
                        type="file"
                        id="background-upload"
                        accept="image/*"
                        onChange={handleChange}
                        className="upload-background-input"
                      />
                    </div>

                    <input
                      type="text"
                      name="name"
                      placeholder="First name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      name="phone"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      name="location"
                      placeholder="Location"
                      value={formData.location}
                      onChange={handleChange}
                    />
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                    />
                    <textarea
                      name="bio"
                      placeholder="Bio"
                      value={formData.bio}
                      onChange={handleChange}
                    />
                  </div>

                  <button className="deactivate">Deactivate Account</button>
                  <button className="deactivate">Delete Account</button>
                </div>
              )}
              {/* end of active tab profile */}

              {activeTab === "password" && (
                <div className="form">
                  <h2>Change Password</h2>
                  <div className="form-field">
                    <input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      placeholder="Current Password"
                    />
                  </div>
                  <div className="form-field">
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      placeholder="New Password"
                    />
                  </div>

                  <div className="form-field">
                    <input
                      type="password"
                      id="confirmNewPassword"
                      name="confirmNewPassword"
                      placeholder="Confirm New Password"
                    />
                  </div>
                </div>
              )}
              {/* end of active tab pw */}

              {activeTab === "notifications" && (
                <div className="form">
                  <h2>Notification Settings</h2>
                  <div className="form-field">
                    <label className="notification-label">
                      Email Notifications
                      <input type="checkbox" />
                      <span className="toggle"></span>
                    </label>
                  </div>
                  <div className="form-field">
                    <label className="notification-label">
                      SMS Notifications
                      <input type="checkbox" />
                      <span className="toggle"></span>
                    </label>
                  </div>
                </div>
              )}

              {/* end of active tab notifications */}

              <div className="modal-actions">
                <button onClick={handleSave}>Save</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* isEditing end */}
    </div>
  );
};

export default Profile;
