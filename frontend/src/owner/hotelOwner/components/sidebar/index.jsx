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
  FaUser,
  FaCreditCard,
  FaHotel,
} from "react-icons/fa";
import "./Sidebar.css"; // Assuming you have a corresponding CSS file for styling
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { loginSelector } from "../../../../features/auth/loginSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../../../features/auth/loginSlice";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const { userInfo } = useSelector(loginSelector);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const toggleSidebar = () => setCollapsed(!collapsed);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const menuItem = [
    { name: "Profile", icon: <FaUser />, path: "/product" },
    { name: "Bookings", icon: <FaCreditCard />, path: "/product/bookings" },
    { name: "Hotels", icon: <FaHotel />, path: "/product/hotels" },
    // { name: "Hotels", icon: <FaCar />, path: "/product" },
    // { name: "Hotels", icon: <FaCar />, path: "/product" },
  ];

  const handleLogout = () => {
    console.log("Clicked");
    dispatch(logoutUser());
    navigate("/login");
    window.location.reload();
  };

  const userProfile = {
    name: "Admin Name",
    imageUrl: `${userInfo?.image}`, // Placeholder image, replace with actual profile image URL
  };

  // const handleLogout = () => {
  //   console.log("Clicked");
  //   dispatch(logoutUser());
  //   navigate("/login");
  //   window.location.reload();
  // };

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
          {!collapsed && <span onClick={handleLogout}>Logout</span>}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
