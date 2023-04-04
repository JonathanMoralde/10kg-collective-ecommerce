import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = ({ setAdminUser }) => {
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const navigate = useNavigate();

  //   BTN HANDLER
  const signInSubmit = (e) => {
    e.preventDefault();

    if (!adminEmail || !adminPassword) {
      setAdminUser({ email: adminEmail, password: adminPassword });
    }

    // POST
    const url = "http://localhost/10kg-collective/userModule/admin_login.php";

    // data
    let logData = new FormData();
    logData.append("admin_email", adminEmail);
    logData.append("admin_password", adminPassword);

    if (adminEmail && adminPassword) {
      axios
        .post(url, logData)
        .then((response) => {
          if (response.data === "uy gagi") {
            // Check for the expected response
            navigate("/admin");
          } else {
            navigate("/admin/login");
            alert("Wrong Password.");
          }
        })
        .catch((error) => {
          if (error.response && error.response.data === "maintenance mode") {
            // Check for the "maintenance mode" error message
            alert(
              "The website is currently under maintenance. Please try again later."
            );
          }
        });
    } else {
      alert("Please fill out the empty fields");
    }
  };

  return (
    <>
      <div className="container-fluid form-section-background">
        <div className="container-md form-section-container shadow w-50 py-5">
          <div className="row">
            <div className="col-md-12 d-flex flex-column align-items-center">
              {/* ETO YUNG FORM NG SIGN IN */}
              <form>
                {/* ACTION */}
                <h3 className="section-title mb-5">Welcome Back Boss Sheesh!</h3>

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
                <button
                  type="submit"
                  className="btn btn-secondary"
                  onClick={(e) => signInSubmit(e)}
                >
                  Sign In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
