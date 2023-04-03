import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const FooterPageLayout = ({user, setUser}) => {
  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <Outlet />
    </>
  );
};


export default FooterPageLayout