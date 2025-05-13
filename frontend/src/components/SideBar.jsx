import React, { useState, useEffect } from "react";
import "./SideBar.css";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import MoreIcon from "../resources/icons/logo512.png";
import FinSightLogo from "../resources/icons/iconslogofinsight.png";
import {
  FaHome,
  FaChartLine,
  FaUser,
  FaCog,
  FaEllipsisV,
  FaListAlt,
} from "react-icons/fa";
// import { useProfile } from "../../DataSets/ProfileContext";

const Sidebar = () => {
  const Navigate = useNavigate();
  const [isHovered1, setIsHovered1] = useState(false);
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggle = () => setIsOpen(!isOpen);

  const handleItemClick = () => {
    Navigate("/login");
  };

  const menuItem = [
    {
      path: "/app/home",
      name: "Home",
      icon: <FaHome />,
    },
    {
      path: "/app/Insights",
      name: "Insights",
      icon: <FaChartLine />,
    },
    {
      path: "/app/Track",
      name: "Track",
      icon: <FaListAlt />,
    },
    {
      path: "/app/tool",
      name: "Tools",
      icon: <FaCog />,
    },
    {
      path: "/app/Profile",
      name: "Profile",
      icon: <FaUser />,
    },
  ];

  return (
    <sidebar className="sidebar-container">
      <div
        style={{
          position: "sticky",
          top: "0",
          right: "0",
          left: "0",
          bottom: "0",
        }}
      >
        <section className="sidebar">
          <div
            className="bars"
            style={{
              justifyContent: windowWidth >= 1620 ? "flex-start" : "center", // Horizontally center if less than 1620px, else left align
              paddingRight: windowWidth >= 1620 ? "0px" : "15px",
            }}
          >
            <img
              style={{ height: "60px", width: "60px", border: "none" }}
              className="sidebar-icon"
              src={FinSightLogo}
              alt="More"
              onClick={() => Navigate("/landing")}
            />
          </div>

          {menuItem.map((item, index) => (
            <NavLink to={item.path} key={index} className="link">
              <div
                style={{
                  backgroundColor: item.name === "" ? "rgb(29, 155, 240)" : "",
                }}
                className="link-child"
              >
                <div
                  style={{
                    padding: item.name === "" ? "13px" : "10px",
                  }}
                  className="icon"
                >
                  {item.icon}
                </div>
                <div
                  className="link_text"
                  style={{
                    display: windowWidth >= 1620 ? "block" : "none",
                    width: windowWidth >= 1620 ? "280px" : "auto",
                  }}
                >
                  {item.name}
                </div>
              </div>
            </NavLink>
          ))}
          <div
            className="bars-bottom"
            style={{
              justifyContent: windowWidth >= 1620 ? "flex-start" : "center", // Horizontally center if less than 1620px, else left align
              paddingRight: windowWidth >= 1620 ? "0px" : "15px",
            }}
          >
            <div
              onMouseEnter={() => setIsHovered1(true)}
              onMouseLeave={() => setIsHovered1(false)}
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <div
                className={`tooltip ${isHovered1 ? "show-tooltip" : ""}`}
                onClick={() => handleItemClick()}
              >
                <p>Log out</p>
                {/* <p>@{profileData ? profileData.username : ""}</p> */}
              </div>
              <div
                onClick={toggle}
                style={{
                  height: "50px",
                  width: "50px",
                  borderRadius: "50%",
                  backgroundColor: "#0C75D6", // light grey
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontWeight: "bold",
                  color: "#ffffff",
                  fontSize: "25px",
                }}
              >
                K
              </div>
              <div
                style={{
                  flex: "3",
                  display: windowWidth >= 1620 ? "flex" : "none",
                  width: windowWidth >= 1620 ? "280px" : "auto",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  paddingLeft: "5px",
                  boxSizing:
                    "border-box" /* Ensure padding is included in the width and height */,
                }}
              >
                <div>
                  <p
                    style={{
                      marginLeft: "10px",
                      fontWeight: "500",
                      color: "rgb(0, 0, 0)",
                    }}
                  >
                    Hakimi Mahadzir
                  </p>

                  <p
                    style={{
                      color: "rgb(0, 0, 0)",
                      marginLeft: "10px",
                    }}
                  >
                    kimimahadzir@gmail.com
                  </p>
                </div>
              </div>
              <div
                style={{
                  height: windowWidth >= 1620 ? "20px" : "auto",
                  display: windowWidth >= 1620 ? "flex" : "none",
                  width: windowWidth >= 1620 ? "40px" : "auto",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FaEllipsisV
                  style={{
                    height: windowWidth >= 1620 ? "20px" : "auto",
                    width: windowWidth >= 1620 ? "20px" : "auto",
                    display: windowWidth >= 1620 ? "flex" : "none",
                    cursor: "pointer",
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </sidebar>
  );
};
export default Sidebar;
