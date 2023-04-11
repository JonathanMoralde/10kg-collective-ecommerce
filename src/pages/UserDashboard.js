import React from "react";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { FaCog } from "react-icons/fa";
import { Link } from "react-router-dom";

const UserDashboard = ({ user, setUser }) => {
  return (
    <>
      <Navbar user={user} setUser={setUser} />

      <section className="container-fluid container-fix user-dashboard-section my-5">
        <h3 className="section-title">My Profile</h3>

        {/* acount details */}
        <div className="user-details-section mt-5 bg-white container-fluid">
          <div className="row">
            {/* <div className="col-md-3">
              image here
            </div> */}
            <div className="col-md-6 shadow p-3 mx-auto">
              <div className="d-flex justify-content-between">
                <h5 className="fullname text-capitalize">
                  Name: {user.full_name}
                </h5>
                <Link
                  className="text-secondary"
                  onClick={() => alert("USER EDIT FORM")}
                >
                  <FaCog size="1.5rem" />
                </Link>
              </div>
              <h5 className="address text-capitalize">
                Address: {user.address}
              </h5>
              <h5 className="contact-number">
                Contact Number: {user.contact_no}
              </h5>
              <h5 className="email-address">
                Email Address: {user.email_address}
              </h5>
            </div>
          </div>
        </div>

        {/* order list of the user */}
        <div className="order-list-section mt-5">
          <h5 className="section-title">Orders</h5>
          <table className="table table-hover mt-3">
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Size</th>
                <th scope="col">Variation</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Weightless</th>
                <td>Small</td>
                <td>Black</td>
                <td>Pending</td>
              </tr>
              {/* <tr>
                <th scope="row">2</th>
                <td>Thornton</td>
                <td>@fat</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>@twitter</td>
                <td>@twitter</td>
                <td>@twitter</td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default UserDashboard;
