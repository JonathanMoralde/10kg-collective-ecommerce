import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

const AdminLayout = ({adminUser, setAdminUser}) => {
  return (
    <>
      <AdminNavbar adminUser={adminUser} setAdminUser={setAdminUser} />
      <Outlet />
    </>
  );
};

export default AdminLayout;
