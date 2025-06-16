import React, { useState, useEffect } from "react";
import axios from "axios";
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
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app, storage } from "../../firebase";
import LoadingSpinner from "../../components/LoadingSpinner";
import NoDataFound from "../../components/NoDataFound";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toLocaleString("default", { month: "long" })
  );
  const [transactions, setTransactions] = useState([]);
  const [goals, setGoals] = useState([]);
  const [loadingMonth, setLoadingMonth] = useState(false);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [uploadingProfileImage, setUploadingProfileImage] = useState(false);

  const [backgroundImagePreview, setBackgroundImagePreview] = useState(null);
  const [backgroundImageUrl, setBackgroundImageUrl] = useState(null);
  const [uploadingBackgroundImage, setUploadingBackgroundImage] = useState(false);


  const userId = 1; // Replace dynamically with logged-in user ID

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/users/${userId}`);
      console.log(
        `Fetched User Profile from API for user ${userId}:`,
        res.data
      ); // Debugging: Log response
      let data = res.data[0];
      setUser(data);
      setFormData(data); // Initialize form with user data
    } catch (err) {
      console.error("Error fetching user profile:", err);
    }
  };

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/transactions`, {
        params: { userId },
      });
      console.log(
        `Fetched Transactions from API for user ${userId}:`,
        res.data
      ); // Debugging: Log response
      setTransactions(res.data); // Ensure state updates correctly
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setTransactions([]); // Prevent frontend crash
    }
  };

  const fetchGoals = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/goals`, {
        params: { userId },
      });

      console.log(`Fetched Goals from API for user ${userId}: `, res.data);
      setGoals(res.data);
    } catch (err) {
      console.error("Error fetching goals: ", err);
      setGoals([]);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    fetchTransactions();
    fetchGoals();
  }, [userId]); // Ensure it fetches when `userId` changes

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      // 🗂️ Prepare updated data
      const updatedData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        dob: formData.dob,
        bio: formData.bio,
        profilePic: profileImageUrl || user.profilePic || "",
        backgroundPic: backgroundImageUrl || user.backgroundPic || "",
        emailNotification: formData.emailNotification,
        smsNotification: formData.smsNotification,
      };

      // ✅ If user is changing password, add `password`
      if (formData.newPassword) {
        // (Optional: check new === confirm in frontend)
        if (formData.newPassword !== formData.confirmNewPassword) {
          alert("New password and confirmation do not match.");
          return;
        }
        updatedData.password = formData.newPassword
      }

      // ✅ Send PUT to backend on correct port
      const response = await axios.put(
        `http://localhost:5000/api/users/${userId}`,
        updatedData
      );

      alert("Profile updated successfully!");
      setIsEditing(false);

    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Something went wrong while saving. Please try again.");
    }
  };


  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    setLoadingMonth(true);
    fetchTransactions(month);
    setLoadingMonth(false);
  };

  const handleProfileImageChange = async (e) => {
    const image = e.target.files[0];
    if (image) {
      setProfileImagePreview(URL.createObjectURL(image)); // Show local preview
      try {
        setUploadingProfileImage(true);
        const storage = getStorage(app);
        const storageRef = ref(storage, `images/${userId}/profile_${image.name}`);
        await uploadBytes(storageRef, image);
        const url = await getDownloadURL(storageRef);
        setProfileImageUrl(url);
      } catch (error) {
        console.error("Error uploading profile picture:", error);
      } finally {
        setUploadingProfileImage(false);
      }
    }
  };

  const handleBackgroundImageChange = async (e) => {
    const image = e.target.files[0];
    if (image) {
      setBackgroundImagePreview(URL.createObjectURL(image)); // Local preview
      try {
        setUploadingBackgroundImage(true);
        const storage = getStorage(app);
        const storageRef = ref(storage, `images/${userId}/background_${image.name}`);
        await uploadBytes(storageRef, image);
        const url = await getDownloadURL(storageRef);
        setBackgroundImageUrl(url);
      } catch (error) {
        console.error("Error uploading background picture:", error);
      } finally {
        setUploadingBackgroundImage(false);
      }
    }
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

  const filteredTransactions = transactions.filter((tx) => {
    const txMonth = new Date(tx.date).toLocaleString("default", {
      month: "long",
    });
    return txMonth === selectedMonth;
  });

  const thatMonthTransactions = transactions.filter(
    (t) => t.month === selectedMonth
  );

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

  const formatCurrency = (amount) => {
    return amount.toLocaleString("en-MY", {
      style: "currency",
      currency: "MYR",
    });
  };

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
          <p className="profile-value">{formatCurrency(value)}</p>
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
          src={
            user?.backgroundPic || <LoadingSkeleton /> || "../../staticimages/default_background.jpg"
          }
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
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                alt="Profile"
                className="profile-image"
              />
            ) : (
              <FaUserCircle className="profile-default-profile-image" />
            )}
            <h2>
              {user?.name || <LoadingSkeleton width="140px" height="30px" />}
            </h2>
            <span>
              {user?.dob ? (
                `${formatDateWithSuffix(user?.dob)} (${calculateAge(user?.dob)})`
              ) : (
                <LoadingSkeleton width="120px" height="20px" />
              )}
            </span>
          </div>

          <div className="profile-info">
            <div className="profile-info-row">
              <FaTextHeight className="profile-icon" />
              {user?.bio || (
                <LoadingSkeleton
                  width="250px"
                  height="20px"
                  style={{ display: "flex", alignItems: "center" }}
                />
              )}
            </div>
            <div className="profile-info-row">
              <FaEnvelope className="profile-icon" />
              <a href={`mailto:${user?.email}`}>
                {user?.email || (
                  <LoadingSkeleton
                    width="250px"
                    height="20px"
                    style={{ display: "flex", alignItems: "center" }}
                  />
                )}
              </a>
            </div>
            <div className="profile-info-row">
              <FaPhone className="profile-icon" />
              {user?.phone || (
                <LoadingSkeleton
                  width="250px"
                  height="20px"
                  style={{ display: "flex", alignItems: "center" }}
                />
              )}
            </div>
            <div className="profile-info-row">
              <FaMapMarkerAlt className="profile-icon" />
              {user?.location || (
                <LoadingSkeleton
                  width="250px"
                  height="20px"
                  style={{ display: "flex", alignItems: "center" }}
                />
              )}
            </div>
          </div>
        </div>
        <div className="profile-goals">
          <section className="profile-dashboard-section">
            <h1>Goals</h1>
            {goals.length === 0 ? (
              <NoDataFound />
            ) : (
              <div className="profile-goals-card-container">
                {goals.map((goal, idx) => {
                  const progressPercent = Math.min(
                    (goal?.amount / goal?.goalAmount) * 100,
                    100
                  );

                  return (
                    <div key={idx} className="profile-goal-card">
                      <h3>
                        {goal?.title || (
                          <LoadingSkeleton width="140px" height="30px" />
                        )}
                      </h3>

                      {goal?.description || (
                        <LoadingSkeleton
                          width="250px"
                          height="20px"
                          style={{ display: "flex", alignItems: "center" }}
                        />
                      )}

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        {goal?.amount ? (
                          formatCurrency(goal.amount)
                        ) : (
                          <LoadingSkeleton width="100px" height="20px" />
                        )}{" "}
                        /{" "}
                        {goal?.goalAmount ? (
                          formatCurrency(goal.goalAmount)
                        ) : (
                          <LoadingSkeleton width="100px" height="20px" />
                        )}
                      </div>

                      <div className="profile-progress-bar-container">
                        {goal?.amount && goal?.goalAmount ? (
                          <div
                            className="profile-progress-bar"
                            style={{ width: `${progressPercent}%` }}
                          ></div>
                        ) : (
                          <LoadingSkeleton
                            width="100%"
                            height="10px"
                            style={{ backgroundColor: "#007bff", opacity: 0.2 }}
                          />
                        )}
                      </div>

                      <div
                        className="profile-goal-status"
                        style={{
                          color: goal?.status === "Completed" ? "green" : "red",
                        }}
                      >
                        {goal?.status || (
                          <LoadingSkeleton width="80px" height="20px" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
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
                    className={`profile-month-tab ${selectedMonth === month ? "active" : ""
                      }`}
                    onClick={() => handleMonthChange(month)}
                  >
                    {month}
                  </button>
                )
              )}
            </div>

            {groupedByDate && Object.keys(groupedByDate).length === 0 ? (
              <NoDataFound />
            ) : loadingMonth ? (
              <LoadingSpinner />
            ) : (
              <div className="profile-summary-content">
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
                        {formatCurrency(
                          pieData.reduce((sum, item) => sum + item.value, 0)
                        )}
                      </tspan>
                    </text>

                    <Tooltip content={<CustomPieTooltip />} />
                  </PieChart>
                </div>

                <div className="profile-expenses-sum-category">
                  {expenses.map((transaction, idx) => (
                    <div key={idx} className="profile-expense-card">
                      <div className="profile-expense-icon-wrapper">
                        <div
                          className="profile-transaction-icon"
                          style={{
                            backgroundColor:
                              categoryColors[transaction?.category],
                          }}
                        >
                          {categoryIcons[transaction?.category]}
                        </div>
                      </div>
                      <div className="profile-expense-header">
                        <span className="profile-expense-category">
                          {transaction?.category}
                        </span>
                        <span className="profile-expense-amount">
                          {formatCurrency(
                            totalByCategory[transaction?.category] || 0
                          )}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="profile-transaction-list">
                  {groupedByDate && Object.keys(groupedByDate).length > 0 ? (
                    Object.entries(groupedByDate).map(
                      ([date, transactionsOnDate]) => (
                        <div
                          key={date}
                          className="profile-transaction-date-group"
                        >
                          <h5 className="profile-transaction-date">
                            {formatDateWithSuffix(date)}
                          </h5>
                          {transactionsOnDate?.length > 0 ? (
                            transactionsOnDate.map((transaction, index) => (
                              <div
                                className="profile-transaction-row"
                                key={index}
                              >
                                <div className="profile-transaction-name">
                                  <div
                                    className="profile-transaction-icon"
                                    style={{
                                      backgroundColor:
                                        categoryColors[transaction?.category],
                                    }}
                                  >
                                    {categoryIcons[transaction?.category]}
                                  </div>
                                  <div className="profile-transaction-name-div">
                                    {transaction?.name}
                                    <span className="profile-transaction-category">
                                      {transaction?.category}
                                    </span>
                                  </div>
                                </div>
                                <div className="profile-tx-amount">
                                  {formatCurrency(transaction?.amount)}
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="profile-no-transaction">
                              No transactions found for this date.
                            </p>
                          )}
                        </div>
                      )
                    )
                  ) : (
                    <p className="profile-no-transaction">
                      No transactions found.
                    </p>
                  )}
                </div>
              </div>
            )}
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
                      {profileImagePreview ||
                        profileImageUrl ||
                        user?.profilePic ? (
                        <img
                          src={
                            profileImagePreview ||
                            profileImageUrl ||
                            user?.profilePic
                          }
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
                      onChange={handleProfileImageChange}
                    />
                    <div className="profile-avatar-actions">
                      <button
                        onClick={() =>
                          document.getElementById("profilePicInput").click()
                        }
                        disabled={uploadingProfileImage}
                      >
                        {uploadingProfileImage ? (
                          <LoadingSpinner size={5} gap={6} color="#333" />
                        ) : (
                          "Change avatar"
                        )}
                      </button>
                      <button>Delete avatar</button>
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
                        onChange={handleBackgroundImageChange}
                        className="profile-upload-background-input"
                      />

                      {/* ✅ Show preview and buffer */}
                      <div className="background-preview-container">
                        {backgroundImagePreview || backgroundImageUrl ? (
                          <div className="background-preview-wrapper">
                            <img
                              src={backgroundImagePreview || backgroundImageUrl}
                              alt="Background Preview"
                              className="background-preview-image"
                            />
                            {uploadingBackgroundImage && (
                              <div className="background-preview-spinner">
                                <LoadingSpinner />
                              </div>
                            )}
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </div>

                    <input
                      type="text"
                      name="name"
                      placeholder="First name"
                      value={formData?.name}
                      onChange={handleChange}
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData?.email}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      name="phone"
                      placeholder="Phone"
                      value={formData?.phone}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      name="location"
                      placeholder="Location"
                      value={formData?.location}
                      onChange={handleChange}
                    />
                    <input
                      type="date"
                      name="dob"
                      value={formData?.dob}
                      onChange={handleChange}
                    />
                    <textarea
                      name="bio"
                      placeholder="Bio"
                      value={formData?.bio}
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
                      value={""}
                      onChange={(e) =>
                        setFormData({ ...formData, currentPassword: e.target.value })
                      }
                    />
                  </div>

                  <div className="profile-form-field">
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      placeholder="New Password"
                      value={""}
                      onChange={(e) =>
                        setFormData({ ...formData, newPassword: e.target.value })
                      }
                    />
                  </div>

                  <div className="profile-form-field">
                    <input
                      type="password"
                      id="confirmNewPassword"
                      name="confirmNewPassword"
                      placeholder="Confirm New Password"
                      value={""}
                      onChange={(e) =>
                        setFormData({ ...formData, confirmNewPassword: e.target.value })
                      }
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
                      <input
                        type="checkbox"
                        checked={formData.emailNotification}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            emailNotification: e.target.checked,
                          })
                        }
                      />
                      <span className="profile-toggle"></span>
                    </label>
                  </div>
                  <div className="profile-form-field">
                    <label className="profile-notification-label">
                      SMS Notifications
                      <input type="checkbox" checked={formData.smsNotification}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            smsNotification: e.target.checked,
                          })
                        } />
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
