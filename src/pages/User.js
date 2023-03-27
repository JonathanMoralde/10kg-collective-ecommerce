import React from "react";
import Navbar from "../components/Navbar";
import LoginRegisterForm from "../components/LoginRegisterForm";

const User = (setUser) => {
  return (
    <>
      <Navbar />
      <LoginRegisterForm setUser={setUser} />
    </>
  );
};

export default User;
