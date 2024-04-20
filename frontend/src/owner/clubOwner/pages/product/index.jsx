import React from "react";
import { useSelector } from "react-redux";
import { loginSelector } from "../../../../features/auth/loginSlice";
import { Link, useParams } from "react-router-dom";
import { logoutUser } from "../../../../features/auth/loginSlice";
import { tourListSelector } from "../../../../features/tourOwner/tourListSlice";
import { useDispatch } from "react-redux";
import ProfilePage from "../ProfilePage";
import { useNavigate } from "react-router-dom";
import TourPage from "../TourPage";
import TourOwnerBookings from "../TourOwnerBookings";
function Index() {
  const { userInfo } = useSelector(loginSelector);
  const { ownerBookings } = useSelector(tourListSelector);
  let { subpage } = useParams();
  console.log(subpage);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (!subpage) {
    subpage = "profile";
  }

  const linkClasses = (type = null) => {
    let classes = "p-2 px-4 inline-flex gap-1 ";
    if (type === subpage) {
      classes += "bg-primary text-white rounded-full";
    } else {
      classes += "bg-gray-200 rounded-full";
    }
    return classes;
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());
    await navigate("/login");
    window.location.reload();
  };
  return (
    <div>
      <nav className="w-full flex items-center justify-center gap-4 mt-8 mb-8">
        <Link className={linkClasses("profile")} to={"/product"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
          My Profile
        </Link>
        <Link className={linkClasses("bookings")} to={"/product/bookings"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          My Bookings{" "}
        </Link>
        <Link className={linkClasses("tours")} to={"/product/tours"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
            />
          </svg>
          My Tours
        </Link>
      </nav>
      {subpage === "profile" && (
        <div className="text-center  mx-auto">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome, {userInfo.name}!
          </h1>
          <p className="text-gray-600 mb-4">
            This is your profile page. You can edit your profile here.
          </p>
          <ProfilePage />
          <button
            className="py-2 max-w-sm mx-auto bg-primary hover:bg-teal-500"
            style={{padding: "1rem 2rem",color: "white", borderRadius: "10px"}}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
      {subpage === "tours" && <TourPage />}
      {subpage === "bookings" && <TourOwnerBookings />}
    </div>
  );
}

export default Index;
