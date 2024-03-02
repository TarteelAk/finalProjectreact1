//ملف للأجزاء الثابتة
import React from "react";
import Navbar from "../component/Navbar.jsx";
import { Outlet } from "react-router-dom";


function Root() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default Root;
