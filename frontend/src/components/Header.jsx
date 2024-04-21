import React from "react";
import { Avatar, Dropdown, Navbar, Button } from "flowbite-react";
import { NavLink } from "react-router-dom";
import { getLogoURL } from "../utils/image-utils";
import { useSelector, useDispatch } from "react-redux";
import {
  loginSelector,
  logoutUser,
  setUserInfoForAdmin,
} from "../features/auth/loginSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Header = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(loginSelector);

  const navigate = useNavigate();
  const logout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };
  const handleAdminPanel = async () => {
    try {
      const { data } = await axios.put(
        `https://travelix-backend-v2.vercel.app/api/auth/updateRoleForUser`,
        {
          ownerId: userInfo._id,
        }
      );
      dispatch(setUserInfoForAdmin(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Navbar fluid rounded>
      <Navbar.Brand as={NavLink} to="/">
        <img
          src={getLogoURL("travelix.jpeg")}
          className="mr-3 h-6 sm:h-9"
          alt="Travelix Logo"
        />
        <span className="logo-text-home self-center whitespace-nowrap text-xl font-semibold dark:text-black">
          Travelix
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        {userInfo ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User settings"
                img={userInfo?.image ? userInfo?.image : ""}
                rounded
                className="object-cover w-full h-full"
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{userInfo?.name}</span>
              <span className="block truncate text-sm font-medium">
                {userInfo?.email}
              </span>
            </Dropdown.Header>
            {!userInfo?.isTourOwner && (
              <Dropdown.Item onClick={() => navigate("/profile")}>
                Profile
              </Dropdown.Item>
            )}
            <Dropdown.Item onClick={() => navigate(`/bookings`)}>
              Bookings
            </Dropdown.Item>
            {userInfo?.isTourOwner && (
              <Dropdown.Item onClick={handleAdminPanel}>
                Admin Panel
              </Dropdown.Item>
            )}
            <Dropdown.Divider />
            {!userInfo?.isTourOwner && (
              <Dropdown.Item onClick={logout}>Sign out</Dropdown.Item>
            )}
          </Dropdown>
        ) : (
          <div className="flex md:order-2">
            <Button as={NavLink} to={"/login"}>
              <span className="mr-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-4 h-4"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              Login
            </Button>
            <Navbar.Toggle />
          </div>
        )}
      </div>

      <Navbar.Collapse>
        <Navbar.Link as={NavLink} to={"/"}>
          Home
        </Navbar.Link>
        <Navbar.Link as={NavLink} to={"/tour"}>
          Tours
        </Navbar.Link>
        <Navbar.Link as={NavLink} to={"/hotel"}>
          Hotel
        </Navbar.Link>
        <Navbar.Link as={NavLink} to={"/vehicle"}>
          Car Rental
        </Navbar.Link>

      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
