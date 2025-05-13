import React from "react";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaEdit,
  FaMapMarkerAlt,
  FaBirthdayCake,
} from "react-icons/fa";
import "./Profile.css"; // External CSS

const Profile = () => {
 const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1 (555) 123-4567",
    location: "Kuala Lumpur, Malaysia",
    dob: "1998-05-22",
    bio: "Passionate software engineer with a love for clean UI and scalable backend systems.",
    profilePic: null, // Replace with an image URL if available
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
            <button className="edit-button">
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
    </div>
  );
};

export default Profile;
