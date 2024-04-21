import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSelector } from "../../features/auth/loginSlice";
import { resetUser } from "../../features/auth/resetUserSlice";

function ProfilePage() {
  const { userInfo } = useSelector(loginSelector);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  const handleChangeInfo = () => {
    console.log("Name:", name);
    console.log("Password:", password);
    console.log("Image:", image);
    dispatch(resetUser(name, password, image));
  };

  return (
    <div className="profile-container">
      <div id="profile-left-container">
        <div id="profile-picture">
          <img
            src={`https://travelix-backend-v2.vercel.app/${userInfo?.image}`}
            alt="User Image"
          />
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
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;
