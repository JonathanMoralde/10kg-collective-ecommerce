import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({user, setUser}) => {
  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
