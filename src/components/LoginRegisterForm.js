import React from "react";

const LoginRegisterForm = () => {
  return (
    <>
      <div className="container-fluid form-section-background">
        <div className="container-md form-section-container">
          <div className="row">
            <div className="col-md-6 sign-up-container">
              {/* ETO YUNG FORM NG SIGN UP */}
              <form action="/">
                {" "}
                {/* ACTION */}
                <h3 className="section-title mb-5">Sign Up</h3>
                <div className="row mb-3">
                  <div className="col form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Jonathan"
                    />
                    <label for="floatingInput">First Name</label>
                  </div>
                  <div className="col form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Moralde"
                    />
                    <label for="floatingInput">Last Name</label>
                  </div>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="Zone 3, Anayan, Pili, Camarines Sur"
                  />
                  <label for="floatingInput">Address</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="number"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                  />
                  <label for="floatingInput">Contact Number</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                  />
                  <label for="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-4">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                  />
                  <label for="floatingPassword">Password</label>
                </div>
                <button type="submit" class="btn btn-primary">
                  Sign Up
                </button>
              </form>
            </div>

            <div className="col-md-6 sign-in-container">
              {/* ETO YUNG FORM NG SIGN IN */}
              <form action="/">
                {/* ACTION */}
                <h3 className="section-title mb-5">Sign In</h3>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                  />
                  <label for="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-4">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                  />
                  <label for="floatingPassword">Password</label>
                </div>

                <button type="submit" class="btn btn-primary">
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
