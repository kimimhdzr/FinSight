import React, { useState } from "react";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaEdit,
  FaMapMarkerAlt,
  FaBirthdayCake,
} from "react-icons/fa";
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
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUser(formData);
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-top">
          {user.profilePic ? (
            <img
              src={user.profilePic}
              alt="Profile"
              className="profile-image"
            />
          ) : (
            <FaUserCircle className="profile-icon" />
          )}
          <div className="profile-header">
            <h2>{user.name}</h2>
            <p className="profile-bio">{user.bio}</p>
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              <FaEdit /> Edit Profile
            </button>
          </div>
        </div>

        <div className="profile-details">
          <div className="profile-row">
            <FaEnvelope className="icon" />
            <span>{user.email}</span>
          </div>
          <div className="profile-row">
            <FaPhone className="icon" />
            <span>{user.phone}</span>
          </div>
          <div className="profile-row">
            <FaMapMarkerAlt className="icon" />
            <span>{user.location}</span>
          </div>
          <div className="profile-row">
            <FaBirthdayCake className="icon" />
            <span>{new Date(user.dob).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Edit Profile</h3>
            <input
              type="text"
              name="name"
              placeholder="Name"
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
            <div className="modal-actions">
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
