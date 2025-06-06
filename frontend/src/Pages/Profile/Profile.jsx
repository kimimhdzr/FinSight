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
  FaTruck,
  FaGift,
  FaReceipt,
  FaMugHot,
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
      amount: 1200.0,
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
      amount: 55.0,
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

  const totalByCategory = transactions.reduce((acc, transaction) => {
    const { category, amount } = transaction;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += amount;
    return acc;
  }, {});

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

  return (
    <div className="profile-container">
      <div className="profile-background">
        <img
          src={user.backgroundPic || "/staticimages/default_background.jpg"}
          alt="Background"
        />
        <button
          className="profile-edit-button"
          onClick={() => setIsEditing(true)}
        >
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
              <FaUserCircle className="profile-default-profile-image" />
            )}
            <h2>{user.name}</h2>
            <p>
              {formatDateWithSuffix(user.dob)} ({calculateAge(user.dob)})
            </p>
          </div>

          <div className="profile-info">
            <div className="profile-info-row">
              <FaTextHeight className="profile-icon" />
              <span>{user.bio}</span>
            </div>
            <div className="profile-info-row">
              <FaEnvelope className="profile-icon" />
              <a href={`mailto:${user.email}`}>{user.email}</a>
            </div>
            <div className="profile-info-row">
              <FaPhone className="profile-icon" />
              <span>{user.phone}</span>
            </div>
            <div className="profile-info-row">
              <FaMapMarkerAlt className="profile-icon" />
              <span>{user.location}</span>
            </div>
          </div>
        </div>
        <div className="profile-goals">
          <section className="profile-dashboard-section">
            <h1>Goals</h1>
            <div className="profile-goals-card-container">
              {goals.map((goal, idx) => {
                const progressPercent = Math.min(
                  (goal.amount / goal.goalAmount) * 100,
                  100
                );

                return (
                  <div key={idx} className="profile-goal-card">
                    <h3>{goal.title}</h3>
                    <p>{goal.description}</p>
                    <p>
                      RM {goal.amount.toFixed(2)} / RM{" "}
                      {goal.goalAmount.toFixed(2)}
                    </p>
                    <div className="profile-progress-bar-container">
                      <div
                        className="profile-progress-bar"
                        style={{ width: `${progressPercent}%` }}
                      ></div>
                    </div>
                    <p
                      className="profile-goal-status"
                      style={{
                        color: goal.status === "Completed" ? "green" : "red",
                      }}
                    >
                      {goal.status}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        <div className="profile-expenses">
          <section className="profile-dashboard-section">
            <h1>Expenses</h1>
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
            <div className="profile-expenses-card-container">
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
                  <div className="profile-expense-details">
                    <div className="profile-expense-header">
                      <span className="profile-expense-category">
                        {expense.category}
                      </span>
                      <span className="profile-expense-amount">
                        RM {totalByCategory[expense.category]?.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

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

      {isEditing && (
        <div className="profile-modal-backdrop">
          <div className="profile-modal modal-layout">
            {/* Hamburger Button */}
            <button
              className="profile-hamburger"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <FaBars />
            </button>

            {/* Sidenav Drawer */}
            <div className={`profile-sidenav ${isMenuOpen ? "open" : ""}`}>
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
                <div className="profile-form">
                  <h2>Edit Profile</h2>
                  <div className="profile-form-avatar">
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
                        <FaUserCircle className="profile-default-profile-image" />
                      )}
                      <div className="profile-camera-icon">
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
                    <div className="profile-avatar-actions">
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

                    <div className="profile-form-group">
                      <label
                        htmlFor="background-upload"
                        className="profile-upload-background"
                      >
                        Upload Background
                      </label>
                      <input
                        type="file"
                        id="background-upload"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setFormData({
                                ...formData,
                                backgroundPic: reader.result,
                              });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="profile-upload-background-input"
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

                  <button className="profile-deactivate">
                    Deactivate Account
                  </button>
                  <button className="profile-deactivate">Delete Account</button>
                </div>
              )}
              {/* end of active tab profile */}

              {activeTab === "password" && (
                <div className="profile-form">
                  <h2>Change Password</h2>
                  <div className="profile-form-field">
                    <input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      placeholder="Current Password"
                    />
                  </div>
                  <div className="profile-form-field">
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      placeholder="New Password"
                    />
                  </div>

                  <div className="profile-form-field">
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
                <div className="profile-form">
                  <h2>Notification Settings</h2>
                  <div className="profile-form-field">
                    <label className="profile-notification-label">
                      Email Notifications
                      <input type="checkbox" />
                      <span className="profile-toggle"></span>
                    </label>
                  </div>
                  <div className="profile-form-field">
                    <label className="profile-notification-label">
                      SMS Notifications
                      <input type="checkbox" />
                      <span className="profile-toggle"></span>
                    </label>
                  </div>
                </div>
              )}

              {/* end of active tab notifications */}

              <div className="profile-modal-actions">
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
