import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import blackLogo from "../images/logo/10KG BLACK trimmed.png";
import AdminUserDropdown from "./AdminUserDropdown";

const AminNavbar = ({ adminUser, setAdminUser }) => {
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
                <NavLink
                  activeclassname="active"
                  className={`nav-link`}
                  end
                  to="/admin"
                >
                  Reports
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  activeclassname="active"
                  className="nav-link"
                  end
                  to="/admin/Products"
                >
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  activeclassname="active"
                  className="nav-link"
                  end
                  to="/admin/Orders"
                >
                  Orders
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  activeclassname="active"
                  className="nav-link"
                  end
                  to="/admin/Orders"
                >
                  Users
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="collapse navbar-collapse" id="navbarIcon">
            <ul className="navbar-nav flex-row">
              <li className="nav-item">
                <AdminUserDropdown setAdminUser={setAdminUser} />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default AminNavbar;
