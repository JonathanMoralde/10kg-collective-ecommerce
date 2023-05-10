import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Users = ({ adminUser }) => {
  const [data, setData] = useState([]);
  const [orders, setOrders] = useState([]);

  let componentMounted = true;
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState("View Users");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        axios
          .get("https://localhost/10kg-collective/admin/userlist.php")
          .then((response) => {
            if (componentMounted) {
              setData(response.data);
              setLoading(false);
            }
          });
      } catch (error) {
        console.log(error.data);
      }

      return () => {
        componentMounted = false;
      };
    };

    fetchData();
  }, []);

  const handleView = (user_id) => {
    let selected = new FormData();
    selected.append("user_id", user_id);

    axios
      .post("https://localhost/10kg-collective/admin/user_orders.php", selected)
      .then((response) => {
        setOrders(response.data);
        console.log(response.data);
      });
  };

  // CREATE ACCOUTN
  // admin
  const [aFullName, setAFullName] = useState("");
  const [aAddress, setAAddress] = useState("");
  const [aCNumber, setACNumber] = useState();
  const [aEmail, setAEmail] = useState("");
  const [aPassword, setAPassword] = useState();
  // Courier
  const [cFullName, setCFullName] = useState("");
  const [cAddress, setCAddress] = useState("");
  const [cCNumber, setCCNumber] = useState();
  const [cEmail, setCEmail] = useState("");
  const [cPassword, setCPassword] = useState();

  const signUpSubmit = (e) => {
    e.preventDefault();
    const url = "https://localhost/10kg-collective/userModule/reg_user.php";
    if (e.target.name === "admin_submit") {
      if ((aFullName, aAddress, aCNumber, aEmail, aPassword)) {
        let adminData = new FormData();
        adminData.append("reg_type", "admin");
        adminData.append("full_name", aFullName);
        adminData.append("address", aAddress);
        adminData.append("contact_no", aCNumber);
        adminData.append("email_address", aEmail);
        adminData.append("password", aPassword);

        axios.get(url, adminData).then((response) => {
          console.log(response.data);
        });
      } else {
        toast.warning("Please fill up all the fields");
      }
    } else {
      if ((cFullName, cAddress, cCNumber, cEmail, cPassword)) {
        let courierData = new FormData();
        courierData.append("reg_type", "courier");
        courierData.append("full_name", cFullName);
        courierData.append("address", cAddress);
        courierData.append("contact_no", cCNumber);
        courierData.append("email_address", cEmail);
        courierData.append("password", cPassword);

        axios.get(url, courierData).then((response) => {
          console.log(response.data);
        });
      } else {
        toast.warning("Please fill up all the fields");
      }
    }
  };
  return (
    <>
      <section className="container-fluid container-fix my-5 reports-page">
        <div className="row">
          <div className="col-md-3">
            <div className="user-title-wrapper py-3">
              <h3 className="text-capitalize user-title">Admin</h3>
              <h5 className="">{adminUser.admin_email}</h5>
            </div>
            <div className="py-3">
              {/* filter 1 */}
              <div className="accordion " id="accordionExample">
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button
                      class="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      Manage Users
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    class="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div
                      class="accordion-body dashboard-sublinks"
                      onClick={() => setActive("View Users")}
                    >
                      View Users
                    </div>
                    <div
                      class="accordion-body dashboard-sublinks my-3"
                      onClick={() => setActive("New Admin Account")}
                    >
                      New Admin Account
                    </div>
                    <div
                      class="accordion-body dashboard-sublinks my-3"
                      onClick={() => setActive("New Courier Account")}
                    >
                      New Courier Account
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div>
              <h3 className="section-title">{active}</h3>
            </div>

            {active === "View Users" && (
              <div>
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Full Name</th>
                      <th scope="col">Address</th>
                      <th scope="col">Email Address</th>
                      <th scope="col">Contact Number</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading && <p>loading...</p>}
                    {data.map((u) => {
                      return (
                        <tr key={u.user_id} className="fs-5 ">
                          <td scope="row" className="text-capitalize w-25">
                            {u.full_name}
                          </td>
                          <td className="text-capitalize w-25">{u.address}</td>
                          <td>{u.email_address}</td>
                          <td>{u.contact_no}</td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-secondary"
                              data-bs-toggle="modal"
                              data-bs-target={`#exampleModal${u.user_id}`}
                              onClick={() => handleView(u.user_id)}
                            >
                              View Purchase
                            </button>
                            {/* <!-- Modal --> */}
                            <div
                              class="modal fade"
                              id={`exampleModal${u.user_id}`}
                              tabindex="-1"
                              aria-labelledby={`exampleModalLabel${u.user_id}`}
                              aria-hidden="true"
                            >
                              <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                  <div class="modal-header px-4">
                                    <h1
                                      class="modal-title fs-5"
                                      id={`exampleModalLabel${u.user_id}`}
                                    >
                                      Purchases by{" "}
                                      <span className="text-capitalize">
                                        {u.full_name}
                                      </span>
                                    </h1>
                                    <button
                                      type="button"
                                      class="btn-close"
                                      data-bs-dismiss="modal"
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div class="modal-body">
                                    <div className="container-fluid">
                                      <div className="row">
                                        <div className="col-md-6">
                                          <h5>Product Name</h5>
                                        </div>
                                        <div className="col-md-6">
                                          <h5>Quantity</h5>
                                        </div>
                                      </div>

                                      {orders.map((o, index) => {
                                        return (
                                          <div
                                            className="row border-top py-2"
                                            key={index}
                                          >
                                            <div className="col-md-6">
                                              <p className="text-capitalize mb-0 fs-5">
                                                {o.item_name}
                                              </p>
                                            </div>
                                            <div className="col-md-6">
                                              <p className=" mb-0 fs-5">
                                                {o.total_order_qty}
                                              </p>
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {active === "New Admin Account" && (
              <div className="mt-5">
                <div className="shadow p-5">
                  <form
                    className={`d-flex flex-column align-items-center justify-content-center h-100 user-form `}
                  >
                    {/* Sign up FNAME */}
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id={`floatingFNameAdmin`}
                        placeholder="Full Name"
                        required
                        value={aFullName}
                        onChange={(e) => {
                          setAFullName(e.target.value);
                        }}
                        name="fname"
                      />
                      <label htmlFor={`floatingFNameAdmin`}>Full Name</label>
                    </div>
                    {/* Sign up ADDRESS */}
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingAddressAdmin"
                        placeholder="Enter your Address"
                        required
                        value={aAddress}
                        onChange={(e) => setAAddress(e.target.value)}
                        name="address"
                      />
                      <label htmlFor="floatingAddressAdmin">Address</label>
                    </div>
                    {/* Sign up CNumber */}
                    <div className="form-floating mb-3">
                      <input
                        type="number"
                        className="form-control"
                        id="floatingCNumberAdmin"
                        placeholder="name@example.com"
                        required
                        value={aCNumber}
                        onChange={(e) => setACNumber(e.target.value)}
                        name="cnumber"
                      />
                      <label htmlFor="floatingCNumberAdmin">
                        Contact Number
                      </label>
                    </div>
                    {/* SIgn up EAddress */}
                    <div className="form-floating mb-3">
                      <input
                        type="email"
                        className="form-control"
                        id="floatingEAddressAdmin"
                        placeholder="name@example.com"
                        required
                        value={aEmail}
                        onChange={(e) => setAEmail(e.target.value)}
                        name="email"
                      />
                      <label htmlFor="floatingEAddressAdmin">
                        Email address
                      </label>
                    </div>
                    {/* Sign up Password */}
                    <div className="form-floating mb-4">
                      <input
                        type="password"
                        className="form-control"
                        id="floatingPasswordAdmin"
                        placeholder="Password"
                        required
                        value={aPassword}
                        onChange={(e) => setAPassword(e.target.value)}
                        name="password"
                      />
                      <label htmlFor="floatingPasswordAdmin">Password</label>
                    </div>
                    {/* Sign up BTN */}
                    <button
                      type="submit"
                      className="btn btn-secondary"
                      onClick={(e) => signUpSubmit(e)}
                      name="admin_submit"
                    >
                      CREATE ACCOUNT
                    </button>
                  </form>
                </div>
              </div>
            )}
            {active === "New Courier Account" && (
              <div className="mt-5">
                <div className="shadow p-5">
                  <form
                    className={`d-flex flex-column align-items-center justify-content-center h-100 user-form `}
                  >
                    {/* Sign up FNAME */}
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id={`floatingFNameCourier`}
                        placeholder="Full Name"
                        required
                        value={cFullName}
                        onChange={(e) => {
                          setCFullName(e.target.value);
                        }}
                        name="fname"
                      />
                      <label htmlFor={`floatingFNameCourier`}>Full Name</label>
                    </div>
                    {/* Sign up ADDRESS */}
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingAddressCourier"
                        placeholder="Enter your Address"
                        required
                        value={cAddress}
                        onChange={(e) => setCAddress(e.target.value)}
                        name="address"
                      />
                      <label htmlFor="floatingAddressCourier">Address</label>
                    </div>
                    {/* Sign up CNumber */}
                    <div className="form-floating mb-3">
                      <input
                        type="number"
                        className="form-control"
                        id="floatingCNumberCourier"
                        placeholder="name@example.com"
                        required
                        value={cCNumber}
                        onChange={(e) => setCCNumber(e.target.value)}
                        name="cnumber"
                      />
                      <label htmlFor="floatingCNumberCourier">
                        Contact Number
                      </label>
                    </div>
                    {/* SIgn up EAddress */}
                    <div className="form-floating mb-3">
                      <input
                        type="email"
                        className="form-control"
                        id="floatingEAddressCourier"
                        placeholder="name@example.com"
                        required
                        value={cEmail}
                        onChange={(e) => setCEmail(e.target.value)}
                        name="email"
                      />
                      <label htmlFor="floatingEAddressCourier">
                        Email address
                      </label>
                    </div>
                    {/* Sign up Password */}
                    <div className="form-floating mb-4">
                      <input
                        type="password"
                        className="form-control"
                        id="floatingPasswordCourier"
                        placeholder="Password"
                        required
                        value={cPassword}
                        onChange={(e) => setCPassword(e.target.value)}
                        name="password"
                      />
                      <label htmlFor="floatingPasswordCourier">Password</label>
                    </div>
                    {/* Sign up BTN */}
                    <button
                      type="submit"
                      className="btn btn-secondary"
                      onClick={(e) => signUpSubmit(e)}
                      name="courier_submit"
                    >
                      CREATE ACCOUNT
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Users;
