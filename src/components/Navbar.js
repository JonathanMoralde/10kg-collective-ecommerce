import React from "react";
import { NavLink, Link } from "react-router-dom";
import blackLogo from "../images/logo/10KG BLACK trimmed.png";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import UserDropdown from "./UserDropdown";
import Cart from "./Cart";
import { useState } from "react";

const Navbar = ({ user, setUser }) => {
  const [active, setActive] = useState(false);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
        <div className="container-fluid container-fix">
          <Link className="navbar-brand" to="/">
            <img src={blackLogo} height="30" alt="" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav fs-5 fw-medium">
              <li className="nav-item">
                <NavLink activeclassname="active" className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  activeclassname="active"
                  className="nav-link"
                  to="/Shop"
                >
                  Shop
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  activeclassname="active"
                  className="nav-link"
                  to="/About"
                >
                  About Us
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="collapse navbar-collapse" id="navbarIcon">
            <ul className="navbar-nav flex-row align-items-center">
              <li className="nav-item">
                {/* <NavLink to="/User" className="nav-link">
                  <FaUser size="1.5rem" />
                </NavLink> */}
                {/* If the user is logged in, the user icon will have different functionality */}
                {user ? (
                  <UserDropdown user={user} setUser={setUser} />
                ) : (
                  <NavLink to="/User" className="nav-link">
                    <FaUser size="1.5rem" className="user-icon" />
                  </NavLink>
                )}
              </li>
              <li className="nav-item ms-1 ">
                <button
                  className="btn hover-fix padding-right-fix"
                  onClick={() => setActive(!active)}
                  type="button"
                >
                  <FaShoppingCart size="1.5rem" className="shopping-cart" />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Cart user={user} active={active} setActive={setActive} />
    </>
  );
};

export default Navbar;
