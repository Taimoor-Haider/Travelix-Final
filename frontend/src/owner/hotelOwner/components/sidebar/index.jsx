import React, { useState } from "react";
import {
  FaHome,
  FaCar,
  FaCalendarAlt,
  FaUsers,
  FaComments,
  FaChartPie,
  FaCog,
  FaBars,
  FaSignOutAlt,
} from "react-icons/fa";
import "./Sidebar.css"; // Assuming you have a corresponding CSS file for styling
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { loginSelector } from "../../../../features/auth/loginSlice";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const { userInfo } = useSelector(loginSelector);
  const toggleSidebar = () => setCollapsed(!collapsed);

  const menuItem = [
    { name: "Dashboard", icon: <FaHome />, path: "/dashboard" },
    { name: "Bookings", icon: <FaCalendarAlt />, path: "/bookings" },
    { name: "Hotels", icon: <FaCar />, path: "/product" },
  ];
  const userProfile = {
    name: "Admin Name",
    imageUrl:
      "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg", // Placeholder image, replace with actual profile image URL
  };

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <FaBars onClick={toggleSidebar} />
      </div>
      <div className={`user-profile ${collapsed ? "collapsed" : ""}`}>
        <img
          src={userProfile.imageUrl}
          alt="Profile"
          className="profile-picture"
        />
        {!collapsed && (
          <div className="user-name ">
            <p className="text-white">{userInfo?.name}</p>
          </div>
        )}
      </div>
      <ul className="sidebar-menu">
        {menuItem.map((item, index) => (
          <li
            key={index}
            className={`menu-item ${collapsed ? "collapsed" : ""}`}
          >
            <Link to={item.path}>
              <div className="flex justify-start items-center gap-3">
                <span className="block">{item.icon}</span>
                {!collapsed && <p>{item.name}</p>}
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className={`sidebar-footer ${collapsed ? "collapsed" : ""}`}>
        <Link className={`${collapsed ? "footer-collapsed" : ""}`}>
          <FaSignOutAlt />
          {!collapsed && <span>Logout</span>}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
