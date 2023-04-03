import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserDashboard = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const url = "http://localhost/10kg-collective/userModule/updateSession.php";

    const logData = new FormData();
    logData.append("logout", 1);

    axios.post(url, logData).then((response) => {
      if (response.data == 1) {
        alert("Signing Out");
        setUser(null);
        navigate("/");
      } else {
        alert(response.data);
      }
    });
  };
  return (
    <>
      <Navbar />

      <section className="container-fluid container-fix user-dashboard-section my-5">
        <h3 className="section-title">Dashboard</h3>

        {/* acount details */}
        <div className="user-details-section mt-5 bg-white shadow">
          <h5 className="fullname">{user.full_name}</h5>
          <h5 className="address">{user.address}</h5>
          <h5 className="contact-number">{user.contact_no}</h5>
          <h5 className="email-address">{user.email_address}</h5>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => handleLogout()}
          >
            Logout
          </button>
        </div>

        {/* order list of the user */}
        <div className="order-list-section">
          <table className="table mt-5">
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col"></th>
                <th scope="col">Size</th>
                <th scope="col">Variation</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td colspan="2">Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default UserDashboard;
