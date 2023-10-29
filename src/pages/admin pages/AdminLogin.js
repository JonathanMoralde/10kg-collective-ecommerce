import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo/10KG BLACK trimmed.png";
import { toast } from "react-toastify";

const AdminLogin = ({ setAdminUser }) => {
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const navigate = useNavigate();

  //   BTN HANDLER
  const signInSubmit = (e) => {
    e.preventDefault();

    // POST
    const url =
      "https://10kgcollective.000webhostapp.com/userModule/login_user.php";

    // create POST data
    let adminData = new FormData();
    adminData.append("admin_email", adminEmail);
    adminData.append("admin_password", adminPassword);
    adminData.append("user_type", "A");

    // if email & pass form has value
    if (adminEmail && adminPassword) {
      axios
        .post(url, adminData)
        .then((response) => {
          // alert(response.data.response_status)
          if (response.data.response_status === 1) {
            // Check for the expected response

            toast.success("Welcome Admin!");
            setAdminUser(response.data);
            // get the session data and store in variable
            // navigate to admin panel
            navigate("/admin");
          } else {
            // wrong password or email
            toast.warn("Wrong Password or Email");
          }
        })
        .catch((error) => {
          //error handling
          if (error.response && error.response.data === "maintenance mode") {
            // Check for the "maintenance mode" error message
            toast.error(
              "The website is currently under maintenance. Please try again later."
            );
          }
        });
    } else {
      //if email & pass form has no value
      toast.warn("Please fill out empty fields", {
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
  };

  return (
    <>
      <div className="container-fluid form-section-background admin-login-page">
        <div className="container-md form-section-container shadow w-50 py-5 bg-white">
          <div className="row">
            <div className="col-md-12 d-flex flex-column align-items-center">
              {/* ETO YUNG FORM NG SIGN IN */}
              <form>
                {/* ACTION */}
                <div className="logo-container mb-5">
                  <img src={logo} className="w-100 h-100" alt="" />
                </div>

                {/* Sign in EMAIL */}
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingAEmail"
                    placeholder="name@example.com"
                    required
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    name="admin_email"
                  />
                  <label htmlFor="floatingAEmail">Email address</label>
                </div>

                {/* Sign in PASSWORD */}
                <div className="form-floating mb-4">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingLPassword"
                    placeholder="APassword"
                    required
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    name="admin_password"
                  />
                  <label htmlFor="floatingAPassword">Password</label>
                </div>

                {/* Sign in BTN */}
                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-secondary text-uppercase"
                    onClick={(e) => signInSubmit(e)}
                  >
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
