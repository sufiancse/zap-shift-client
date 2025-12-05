import React from "react";
import { Outlet } from "react-router";
import NavBar from "../Pages/Shared/NavBar/NavBar";
import Footer from "../Pages/Shared/Footer/Footer";

const RootLayout = () => {
  return (
    <section className="bg-[#fdebea]">
      <div className="flex flex-col min-h-screen max-w-7xl mx-auto ">
        <div className=" sticky -top-3 z-50">
          <NavBar />
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer />
      </div>
    </section>
  );
};

export default RootLayout;
