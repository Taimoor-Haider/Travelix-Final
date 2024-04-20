import React, { useState } from "react";
import "./style.css";
import Sidebar from "../components/sidebar";

export default function Layout({ children }) {
  return (
    <div className="app-container" style={{ backgroundColor: "white" }}>
      <div className="header">
        <Sidebar />
      </div>
      <main>{children}</main>
      {/* <Footer /> */}
    </div>
  );
}
