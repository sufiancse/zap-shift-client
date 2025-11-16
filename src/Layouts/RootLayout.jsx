import React from "react";
import { Outlet } from "react-router";
import NavBar from "../Pages/Shared/NavBar/NavBar";
import Footer from "../Pages/Shared/Footer/Footer";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen max-w-7xl mx-auto ">
      <NavBar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
