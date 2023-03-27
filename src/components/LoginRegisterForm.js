import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginRegisterForm = ({ setUser }) => {
  // HANDLE SING UP
  const [fName, setFName] = useState("");
  const [address, setAddress] = useState("");
  const [cNumber, setCNumber] = useState("");
  const [reg_Email, setReg_Email] = useState("");
  const [reg_Password, setReg_Password] = useState("");
  const navigate = useNavigate();

  const signUpSubmit = (e) => {
    e.preventDefault();

    if (fName && address && cNumber && reg_Email && reg_Password) {
      // POST
      const url = "http://localhost/10kg-collective/userModule/reg_user.php";

      // data
      let regData = new FormData();
      regData.append("completeName", fName);
      regData.append("contactNo", cNumber);
      regData.append("completeAddress", address);
      regData.append("emailAddress", reg_Email);
      regData.append("password", reg_Password);

      axios
        .post(url, regData)
        .then((response) => alert(response.data))
        .catch((error) => alert(error));

      navigate("/");
    } else {
      alert("Please fill out the empty fields");
    }
  };

  // Sign In
  const [log_Email, setLog_Email] = useState("");
  const [log_Password, setLog_Password] = useState("");

  const signInSubmit = (e) => {
    e.preventDefault();

    // POST
    const url = "http://localhost/10kg-collective/userModule/login_user.php";

    // data
    let logData = new FormData();
    logData.append("log_email", log_Email);
    logData.append("log_password", log_Password);

    if (log_Email && log_Password) {
      axios
        .post(url, logData)
        .then((response) => alert(response.data))
        .catch((error) => alert(error));

      navigate("/");
    } else {
      alert("Please fill out the empty fields");
    }
  };

  return (
    <>
      <div className="container-fluid form-section-background">
        <div className="container-md form-section-container">
          <div className="row">
            <div className="col-md-6 sign-up-container">
              {/* SIGN UP FORM */}
              <form>
                <h3 className="section-title mb-5">Sign Up</h3>
                {/* Sign up FNAME */}
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingFName"
                    placeholder="Full Name"
                    required
                    value={fName}
                    onChange={(e) => setFName(e.target.value)}
                    name="fname"
                  />
                  <label htmlFor="floatingFName">Full Name</label>
                </div>
                {/* Sign up ADDRESS */}
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingAddress"
                    placeholder="Enter your Address"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    name="address"
                  />
                  <label htmlFor="floatingAddress">Address</label>
                </div>
                {/* Sign up CNumber */}
                <div className="form-floating mb-3">
                  <input
                    type="number"
                    className="form-control"
                    id="floatingCNumber"
                    placeholder="name@example.com"
                    required
                    value={cNumber}
                    onChange={(e) => setCNumber(e.target.value)}
                    name="cnumber"
                  />
                  <label htmlFor="floatingCNumber">Contact Number</label>
                </div>
                {/* SIgn up EAddress */}
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingEAddress"
                    placeholder="name@example.com"
                    required
                    value={reg_Email}
                    onChange={(e) => setReg_Email(e.target.value)}
                    name="email"
                  />
                  <label htmlFor="floatingEAddress">Email address</label>
                </div>
                {/* Sign up Password */}
                <div className="form-floating mb-4">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    required
                    value={reg_Password}
                    onChange={(e) => setReg_Password(e.target.value)}
                    name="password"
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                {/* Sign up BTN */}
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={(e) => signUpSubmit(e)}
                  name="submit"
                >
                  Sign Up
                </button>
              </form>
            </div>

            <div className="col-md-6 sign-in-container">
              {/* ETO YUNG FORM NG SIGN IN */}
              <form action="/">
                {/* ACTION */}
                <h3 className="section-title mb-5">Sign In</h3>

                {/* Sign in EMAIL */}
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingEmail"
                    placeholder="name@example.com"
                    required
                    value={log_Email}
                    onChange={(e) => setLog_Email(e.target.value)}
                    name="log_email"
                  />
                  <label htmlFor="floatingEmail">Email address</label>
                </div>

                {/* Sign in PASSWORD */}
                <div className="form-floating mb-4">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingLPassword"
                    placeholder="Password"
                    required
                    value={log_Password}
                    onChange={(e) => setLog_Password(e.target.value)}
                    name="log_password"
                  />
                  <label htmlFor="floatingLPassword">Password</label>
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

export default LoginRegisterForm;
