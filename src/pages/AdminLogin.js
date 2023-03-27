import React from "react";
import { useState } from "react";
import axios from "axios";

const AdminLogin = () => {
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  //   BTN HANDLER
  const signInSubmit = (e) => {
    e.target.preventDefault();

    // POST
    const url = "http://localhost/10kg-collective/userModule/admin_login.php";

    // data
    let logData = new FormData();
    logData.append("admin_email", adminEmail);
    logData.append("admin_password", adminPassword);

    if (adminEmail && adminPassword) {
      axios
        .post(url, logData)
        .then((response) => alert(response.data))
        .catch((error) => alert(error));
    } else {
      alert("Please fill out the empty fields");
    }
  };

  return (
    <>
      <div className="container-fluid form-section-background">
        <div className="container-md form-section-container">
          <div className="row">
            <div className="col-md-6">
              {/* ETO YUNG FORM NG SIGN IN */}
              <form action="/">
                {/* ACTION */}
                <h3 className="section-title mb-5">Sign In</h3>

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
                  className="btn btn-primary"
                  onClick={(e) => signInSubmit(e)}
                  name="submit"
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
