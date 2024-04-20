import React from "react";
import Header from "../components/Header";
import FooterComponent from "../components/FooterComponent";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <FooterComponent />
    </>
  );
}

export default Layout;
