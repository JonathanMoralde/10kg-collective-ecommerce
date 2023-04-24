import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const LoginRegisterForm = ({ setUser }) => {
  // TOGGLE SLIDER
  const [isToggle, setIsToggle] = useState(false);

  // END OF TOGGLE SLIDER

  // const { id } = useParams();
  const { search } = useLocation();
  const redirectUrl = new URLSearchParams(search).get("redirect");

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
      regData.append("full_name", fName);
      regData.append("contact_no", cNumber);
      regData.append("address", address);
      regData.append("email_address", reg_Email);
      regData.append("password", reg_Password);

      axios
        .post(url, regData)
        .then((response) => {
          // if (redirectUrl) {
          //   navigate(redirectUrl);
          // } else {
          //   navigate("/");
          // }

          // alert(response);
          if (response.data.response_status) {
            // alert(`Welcome ${response.data.full_name}`);
            toast.success(`Welcome ${response.data.full_name}`, {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setUser(response.data);
            if (redirectUrl) {
              navigate(redirectUrl);
            } else {
              navigate("/");
            }
          } else {
            toast.error("error", {
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

          // if (response.) {
          //   // alert(response.data);
          //   navigate("/");
          // } else {
          //   alert("Eror");
          // }
        })
        .catch((error) => {
          throw new Error(error);
        });
    } else {
      // alert("Please fill out the empty fields");
      toast.success("Please fill out the empty fields!", {
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

  // HANDLE SIGN IN
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
        .then((response) => {
          if (response.data.response_status) {
            // alert(`Welcome ${response.data.full_name}`);
            toast.success(`Welcome ${response.data.full_name}`, {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setUser(response.data);
            if (redirectUrl) {
              navigate(redirectUrl);
            } else {
              navigate("/");
            }
          } else if (response.data == 3) {
            toast.warn("Incorrect Password", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else {
            toast.warn("Incorrect Email or Password", {
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
        })
        .catch((error) => {
          if (error.response && error.response.data === "maintenance mode") {
            // Check for the "maintenance mode" error message
            throw new Error(error.response.data);
          }
        });
    } else {
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
      <div className="container-fluid form-section-background">
        <div className="container-md form-section-container bg-white shadow">
          <div className="row">
            <div className="col-md-6 sign-in-container">
              <div
                className={`sliding-container ${isToggle ? "form-toggle" : ""}`}
              >
                {/* SIGN UP TOGGLE */}
                <h3
                  className={`section-title mb-5 ${
                    isToggle ? "display-none" : ""
                  }`}
                >
                  Hello, Friend!
                </h3>
                <p
                  className={`toggle-text mb-4 ${
                    isToggle ? "display-none" : ""
                  }`}
                >
                  Don't have an account yet? Enter your personal details and
                  shop with us
                </p>
                <button
                  type="button"
                  onClick={() => setIsToggle(!isToggle)}
                  className={`btn btn-outline-light ${
                    isToggle ? "display-none" : ""
                  }`}
                >
                  SIGN UP
                </button>

                {/* SIGN IN TOGGLE */}
                <h3
                  className={`section-title mb-5 display-none ${
                    isToggle ? "toggle-display" : ""
                  }`}
                >
                  Welcome back!
                </h3>
                <p
                  className={`toggle-text mb-4 display-none ${
                    isToggle ? "toggle-display" : ""
                  }`}
                >
                  Already have an account? Sign in and start shopping our new
                  releases.
                </p>
                <button
                  type="button"
                  onClick={() => setIsToggle(!isToggle)}
                  className={`btn btn-outline-light display-none ${
                    isToggle ? "toggle-display" : ""
                  }`}
                >
                  SIGN IN
                </button>
              </div>
            </div>
            {/* sign up form */}
            <div
              className={`col-md-6 sign-up-container bg-white ${
                isToggle ? "slide-left" : ""
              }`}
            >
              {/* SLIDING TOGGLE */}

              {/* SIGN UP FORM */}
              <form
                className={`d-flex flex-column align-items-center justify-content-center h-100 user-form  ${
                  isToggle ? "" : "user-form-signup"
                }`}
              >
                <h3 className="section-title mb-3">Sign Up</h3>
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
                  className="btn btn-secondary"
                  onClick={(e) => signUpSubmit(e)}
                  name="submit"
                >
                  SIGN UP
                </button>
              </form>

              {/* SIGN IN FORM */}
              <form
                className={`d-flex flex-column align-items-center justify-content-center h-100 user-form ${
                  isToggle ? "sign-in-display" : ""
                }`}
              >
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
                  className="btn btn-secondary"
                  onClick={(e) => signInSubmit(e)}
                  name="submit"
                >
                  SIGN IN
                </button>
              </form>
            </div>

            {/* sign in form */}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginRegisterForm;
