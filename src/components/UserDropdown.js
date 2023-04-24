import React from "react";
import { NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const UserDropdown = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const url = "http://localhost/10kg-collective/userModule/updateSession.php";

    const logData = new FormData();
    logData.append("logout", 1);

    axios.post(url, logData).then((response) => {
      if (response.data === 1) {
        toast.success("Signed out successfully", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setUser(null);
        navigate("/");
      } else {
        toast.error("Sign out Failed", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    });
  };

  return (
    <>
      <div className="dropdown-center align-items-center">
        <button
          className="btn dropdown-toggle user-icon"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <FaUser size="1.5rem" />
        </button>
        <ul className="dropdown-menu">
          <li>
            <NavLink className="dropdown-item" to="/UserDashboard">
              My Profile
            </NavLink>
          </li>
          <li>
            <button className="dropdown-item" onClick={() => handleLogout()}>
              Sign Out
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default UserDropdown;
