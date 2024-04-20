import React from "react";
import { useSelector } from "react-redux";
import { loginSelector } from "../features/auth/loginSlice";
import { Navigate, Outlet } from "react-router-dom";

function Authenticate({ isVehcileOwner = false }) {
  const { userInfo } = useSelector(loginSelector);

  if (!userInfo) {
    return <Navigate to={"login"} />;
  }
  if (isVehcileOwner && !userInfo.role === "carOwner") {
    return <Navigate to={"login?redirect=/vehicleOwner"} />;
  }
  return (
    <>
      <Outlet />
    </>
  );
}

export default Authenticate;
