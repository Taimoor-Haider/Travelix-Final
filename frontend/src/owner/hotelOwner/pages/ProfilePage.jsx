import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSelector } from "../../../features/auth/loginSlice";
import { resetUser } from "../../../features/auth/resetUserSlice";
import axios from "axios";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
function ProfilePage() {
  const { userInfo } = useSelector(loginSelector);
  const [name, setName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [image, setImage] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [resetPasswordVisible, setResetPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleChangeInfo = () => {
    // Validation: Check if name is empty or contains only spaces
    if (!name.trim()) {
      alert("Name cannot be empty");
      return;
    }

    // Show a confirmation dialog
    const confirmed = window.confirm(
      "Are you sure you want to update the info?"
    );

    // Check if the user confirmed
    if (confirmed) {
      console.log("Name:", name);
      console.log("Image:", image);
      dispatch(resetUser(name, oldPassword, image));
    } else {
      // If user clicks "Cancel" or "No", do nothing
      return;
    }
  };

  const toggleResetPassword = () => {
    setResetPasswordVisible(!resetPasswordVisible);
  };

  const handleRestPassword = async (oldPassword, newPassword) => {
    console.log("Clicked");
    console.log(oldPassword);
    console.log(newPassword);
    try {
      setLoading(true);
      const { data } = await axios.put(
        "https://travelix-backend-v2.vercel.app/api/auth/change-password",
        {
          userId: userInfo._id,
          oldPassword,
          newPassword,
        }
      );
      console.log(data);
      setResponse(data);
      setLoading(false);
    } catch (error) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data
          : error.message;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="profile-container">
      <div id="profile-left-container">
        <div id="profile-picture">
          <img src={`${userInfo?.image}`} alt="User Image" />
        </div>
        <h1>{userInfo?.name}</h1>
        <p>{userInfo?.email}</p>
        <p>{userInfo?.phone}</p>
      </div>

      <div id="profile-right-container">
        <h1>Profile Information</h1>
        <form id="profile-information-form">
          <label>Name</label>
          <input
            id="name"
            type="text"
            placeholder="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Profile Picture</label>
          <input
            id="profile"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <div className="profile-btn-container">
            <button
              type="button"
              className="profile-btn-save"
              onClick={handleChangeInfo}
            >
              Update Profile
            </button>
          </div>

          <button
            type="button"
            className="btn mt-2  btn-info"
            onClick={toggleResetPassword}
          >
            {resetPasswordVisible ? "Hide Password Reset" : "Reset Password"}
          </button>
          {resetPasswordVisible && (
            <>
              <div className="my-4">
                <input
                  id="oldPassword"
                  type="password"
                  placeholder="Old Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                  className="rounded-md p-2"
                />

                <input
                  id="newPassword"
                  type="password"
                  placeholder="New Password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="rounded-md p-2 mt-2"
                />
              </div>
              <button
                type="button"
                className="btn btn-neutral"
                onClick={() => handleRestPassword(oldPassword, newPassword)}
              >
                Change Password
              </button>
              {loading && <Loader />}
              {response && <Message color="info">{response}</Message>}
              {error && <Message>{error}</Message>}
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;
