import React from "react";
import Navbar from "../components/Navbar";
import { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import AppContext from "../AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserDashboard = ({ user, setUser }) => {
  const id = user.user_id;
  const [order, setOrder] = useState([]);

  const navigate = useNavigate();
  let componentMounted = true;
  const [loading, setLoading] = useState(false);
  const { isNewOrder, setIsNewOrder } = useContext(AppContext);
  const modalRef = useRef(null);

  useEffect(() => {
    const fetchUserOrder = async () => {
      setLoading(true);
      const response = await axios.get(
        `https://localhost/10kg-collective/displayModule/user_order.php?user_id=${id}`
      );

      if (componentMounted) {
        setOrder(response.data);
        setLoading(false);
      }

      return () => {
        componentMounted = false;
      };
    };

    fetchUserOrder();
  }, [isNewOrder]);

  // reset isNewOrder to false
  useEffect(() => {
    if (isNewOrder) {
      setIsNewOrder(false);
    }
  }, [isNewOrder]);

  // extracted data from orders
  const [pendingOrders, setPendingOrders] = useState([]);
  const [confirmedOrders, setConfirmedOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);

  // console.log(pendingOrders);
  // console.log(confirmedOrders);
  // console.log(allOrders);
  // console.log(completedOrders);

  console.log(order);

  useEffect(() => {
    if (Array.isArray(order) && order.length > 0) {
      // pending orders
      const pendingList = order.filter((o) => o.order_status == "P"); //using === seems
      setPendingOrders(pendingList);

      // confirmed orders
      const confirmedList = order.filter(
        (o) => o.order_status == "C" && o.payment_status === "Unpaid"
      );
      setConfirmedOrders(confirmedList);

      // All orders except cart
      const orderList = order.filter((o) => o.order_status !== "Cart");
      setAllOrders(orderList);

      // completed orders (paid)
      const paidList = order.filter((o) => o.payment_status == "Paid");
      setCompletedOrders(paidList);
    }
  }, [order]);

  // DISPLAY
  const [active, setActive] = useState("profile");
  const [orderDisplay, setOrderDisplay] = useState(allOrders);
  const [clickedOrderDisplay, setClickedOrderDisplay] = useState("All Orders");

  // console.log(order);
  // console.log(orderDisplay);

  const handleCancel = (order_id) => {
    const canceledOrder = order_id;
    const url =
      "https://localhost/10kg-collective/orderModule/cancel_order.php";

    // console.log(canceledOrder);
    let cancelData = new FormData();
    cancelData.append("order_id", canceledOrder);

    axios.post(url, cancelData).then((response) => {
      if (response.data === 1) {
        // console.log(response.data);
        toast.success("Order cancelled");
        // alert("To fix, canceled re-render");
        setIsNewOrder(true);
      }
    });
  };

  const handleClose = () => {
    const modal = modalRef.current;
  };

  const [currentPass, setCurrentPass] = useState();
  const [newPass, setNewPass] = useState();
  const [confirmPass, setConfirmPass] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentPass && newPass && confirmPass) {
      if (newPass === confirmPass) {
        let passData = new FormData();
        passData.append("user_id", id);
        passData.append("current_pass", currentPass);
        passData.append("new_pass", newPass);

        axios
          .post(
            "https://localhost/10kg-collective/userModule/update_password.php",
            passData
          )
          .then((response) => {
            if (response.data === 1) {
              toast.success("Password Changed Successfully!");
              console.log(response.data);
              setActive("profile");
            } else if (response.data === 2) {
              toast.warn("Failed to change password");
            } else {
              toast.warn("Wrong Password");
            }
          });
      } else {
        toast.warning("New Password did not match Confirm Password");
      }
    }
  };

  return (
    <>
      <Navbar user={user} setUser={setUser} />

      <section className="container-fluid container-fix user-dashboard-section my-5">
        <div className="row ">
          <div className="col-md-3">
            <div className="user-title-wrapper py-3">
              <h3 className="text-capitalize user-title">{user.full_name}</h3>
              {/* <h5
                className="dashboard-sublinks"
                onClick={() => {
                  setActive("profile");
                }}
              >
                Edit Profile
              </h5> */}
              {/* link to filter 1 - profile */}
            </div>
            <div>
              {/* Filter 1 */}
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
                      My Account
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    class="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div
                      class="accordion-body dashboard-sublinks"
                      onClick={() => setActive("profile")}
                    >
                      Profile
                    </div>
                    <div
                      class="accordion-body dashboard-sublinks my-3"
                      onClick={() => setActive("Change Password")}
                    >
                      Change Password
                    </div>
                  </div>
                </div>
              </div>

              {/* Filter 2 */}
              <button
                className=" dashboard-btn"
                onClick={() => {
                  setActive("orders");
                  setOrderDisplay(allOrders);
                  setClickedOrderDisplay("All Orders");
                }}
              >
                My Purchase
              </button>
            </div>
          </div>

          {/* DISPLAY */}
          <div className="col-md-9">
            {/* My Account - Profile */}
            <div
              className={`my-profile ${
                active === "profile" ? "" : "display-none"
              }`}
            >
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12 shadow-sm py-3 px-5">
                    <h3 className="section-title my-3">My Profile</h3>
                    <div className="d-flex my-3 px-5">
                      <div className="text-end me-3">
                        <h5 className="fw-normal mb-4">Full Name</h5>
                        <h5 className="fw-normal mb-4">Address</h5>
                        <h5 className="fw-normal mb-4">Email Address</h5>
                        <h5 className="fw-normal mb-4">Contact Number</h5>
                      </div>
                      <div>
                        <h5 className="fullname text-capitalize mb-4">
                          {user.full_name}
                        </h5>
                        <h5 className="address text-capitalize mb-4">
                          {user.address}
                        </h5>
                        <h5 className="contact-number mb-4">
                          {user.contact_no}
                        </h5>
                        <h5 className="email-address mb-4">
                          {user.email_address}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* My Purchase */}
            <div
              className={`order-list-section ${
                active === "orders" ? "" : "display-none"
              }`}
            >
              <div className="d-flex justify-content-between">
                <h5 className="section-title">My Purchase</h5>
                <div className="btn-group dropdown-fix">
                  <button
                    className="btn hover-fix dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {clickedOrderDisplay}
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <button
                        className={`dropdown-item`}
                        onClick={() => {
                          setOrderDisplay(allOrders);
                          setClickedOrderDisplay("All Orders");
                        }}
                      >
                        All Orders
                      </button>
                    </li>
                    <li>
                      <button
                        className={`dropdown-item`}
                        onClick={() => {
                          setOrderDisplay(pendingOrders);
                          setClickedOrderDisplay("Pending Orders");
                        }}
                      >
                        Pending Orders
                      </button>
                    </li>
                    <li>
                      <button
                        className={`dropdown-item`}
                        onClick={() => {
                          setOrderDisplay(confirmedOrders);
                          setClickedOrderDisplay("Confirmed Orders");
                        }}
                      >
                        Confirmed Orders
                      </button>
                    </li>
                    <li>
                      <button
                        className={`dropdown-item`}
                        onClick={() => {
                          setOrderDisplay(completedOrders);
                          setClickedOrderDisplay("Completed Orders");
                        }}
                      >
                        Completed Orders
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="container">
                {orderDisplay.map((o, index) => {
                  // check if order is within 24 hrs
                  const isOlderThan24Hrs = (order) => {
                    const orderDate = new Date(order.date_ordered);
                    const now = new Date();
                    const timeDiff = now.getTime() - orderDate.getTime();
                    const hourDiff = timeDiff / (1000 * 60 * 60);
                    return hourDiff > 24;
                  };
                  return (
                    <div
                      className="row my-3 p-3 shadow-sm single-order"
                      key={o.order_id}
                    >
                      <div className="col-md-2 ">
                        {/* image */}
                        <div className="order-track-img-wrapper w-100">
                          <img
                            src={o.image_src}
                            alt={o.image_name}
                            className="img-fluid"
                          />
                        </div>
                      </div>

                      <div className="col-md-10  pe-3">
                        {/* info */}
                        <div className="container-fluid">
                          <div className="row">
                            {/* upper half */}
                            <div className="col-md-12 d-flex">
                              <div className="w-100 order-track-info-wrapper d-flex align-items-center justify-content-between">
                                <div className="w-75 text-capitalize">
                                  <h5>Product: {o.item_name}</h5>
                                  <div className="d-flex justify-content-between ">
                                    <div>
                                      <h5 className="fw-normal">
                                        variation: {o.item_variant}
                                      </h5>
                                      <h5 className="fw-normal">
                                        size: {o.item_size}
                                      </h5>
                                    </div>
                                    <div>
                                      <h5 className="fw-normal">
                                        quantity: {o.order_qty}
                                      </h5>
                                      <h5 className="fw-normal">
                                        date ordered: {o.date_ordered}
                                      </h5>
                                    </div>
                                  </div>
                                </div>
                                <div className="w-25 text-end">
                                  <h5>₱{o.item_price}</h5>
                                </div>
                              </div>
                            </div>

                            {/* bottom half */}
                            <div className="col-md-12 pt-3 d-flex ">
                              {o.delivery_status != "NS" ||
                              o.order_status === "Canceled" ? (
                                ""
                              ) : (
                                <div className="w-50">
                                  <button
                                    className="btn btn-secondary me-3"
                                    // onClick={() => handleCancel(index)}
                                    data-bs-toggle="modal"
                                    data-bs-target={`#staticBackdrop-${index}`}
                                  >
                                    Cancel Order
                                  </button>

                                  {/* modal */}
                                  <div
                                    class="modal fade"
                                    id={`staticBackdrop-${index}`}
                                    data-bs-backdrop="static"
                                    data-bs-keyboard="false"
                                    tabindex="-1"
                                    aria-labelledby="staticBackdropLabel"
                                    aria-hidden="true"
                                    ref={modalRef}
                                  >
                                    <div class="modal-dialog modal-dialog-centered">
                                      <div class="modal-content">
                                        <div class="modal-header ">
                                          <h1
                                            class="modal-title fs-5"
                                            id="staticBackdropLabel"
                                          >
                                            Do you want to cancel this order?
                                          </h1>
                                          <button
                                            type="button"
                                            class="btn-close me-1"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                          ></button>
                                        </div>
                                        <div class="modal-body d-flex justify-content-center">
                                          <button
                                            type="button"
                                            class="btn btn-secondary me-3"
                                            data-bs-dismiss="modal"
                                          >
                                            No
                                          </button>
                                          <button
                                            type="button"
                                            class="btn btn-secondary"
                                            onClick={() => {
                                              handleCancel(o.order_id);
                                              // handleClose();
                                            }}
                                            data-bs-dismiss="modal"
                                          >
                                            Yes
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                              <div
                                className={`${
                                  o.delivery_status != "NS" ||
                                  o.order_status === "Canceled"
                                    ? "w-100"
                                    : "w-50"
                                } d-flex justify-content-end text-end align-items-center`}
                              >
                                {/* all orders */}
                                {clickedOrderDisplay === "All Orders" &&
                                  o.order_status == "P" && (
                                    <h5 className="ms-4 fst-italic text-info-emphasis">
                                      Pending
                                    </h5>
                                  )}
                                {clickedOrderDisplay === "All Orders" &&
                                  o.order_status == "Canceled" && (
                                    <h5 className="ms-4 fst-italic text-info-emphasis">
                                      Canceled
                                    </h5>
                                  )}
                                {clickedOrderDisplay === "All Orders" &&
                                  o.delivery_status === "NS" &&
                                  o.order_status === "C" && (
                                    <h5 className="ms-4 fst-italic text-info-emphasis">
                                      To be shipped
                                    </h5>
                                  )}
                                {clickedOrderDisplay === "All Orders" &&
                                  o.delivery_status === "S" &&
                                  o.order_status === "C" && (
                                    <h5 className="ms-4 fst-italic text-info-emphasis">
                                      Shipped
                                    </h5>
                                  )}
                                {clickedOrderDisplay === "All Orders" &&
                                  o.delivery_status === "D" &&
                                  o.order_status === "C" && (
                                    <h5 className="ms-4 fst-italic text-info-emphasis">
                                      Delivered
                                    </h5>
                                  )}
                                {clickedOrderDisplay === "All Orders" &&
                                  o.delivery_status === "R" &&
                                  o.order_status === "C" && (
                                    <h5 className="ms-4 fst-italic text-info-emphasis">
                                      Rejected
                                    </h5>
                                  )}
                                {/* pending orders status */}
                                {clickedOrderDisplay === "Pending Orders" &&
                                  o.order_status == "P" && (
                                    <h5 className="ms-4 fst-italic text-info-emphasis">
                                      Pending
                                    </h5>
                                  )}
                                {/* delivered status - not yet shipped */}
                                {clickedOrderDisplay === "Confirmed Orders" &&
                                  o.delivery_status === "NS" && (
                                    <h5 className="ms-4 fst-italic text-info-emphasis">
                                      To be shipped
                                    </h5>
                                  )}
                                {/* delivered status - shipped */}
                                {clickedOrderDisplay === "Confirmed Orders" &&
                                  o.delivery_status === "S" && (
                                    <h5 className="ms-4 fst-italic text-info-emphasis">
                                      Shipped
                                    </h5>
                                  )}
                                {/* delivered status - shipped */}
                                {clickedOrderDisplay === "Confirmed Orders" &&
                                  o.delivery_status === "D" && (
                                    <h5 className="ms-4 fst-italic text-info-emphasis">
                                      Delivered
                                    </h5>
                                  )}
                                {/* delivered status - shipped */}
                                {clickedOrderDisplay === "Confirmed Orders" &&
                                  o.delivery_status === "R" && (
                                    <h5 className="ms-4 fst-italic text-info-emphasis">
                                      Rejected by Customer
                                    </h5>
                                  )}
                                {/* delivered status - shipped */}
                                {clickedOrderDisplay === "Completed Orders" &&
                                  o.delivery_status === "D" && (
                                    <h5 className="ms-4 fst-italic text-info-emphasis">
                                      Delivered
                                    </h5>
                                  )}

                                {o.order_status !== "Canceled" &&
                                  (o.payment_status === "Unpaid" ? (
                                    <h5 className="ms-4 fst-italic text-danger-emphasis">
                                      Unpaid
                                    </h5>
                                  ) : (
                                    <h5 className="ms-4 fst-italic text-success-emphasis">
                                      Paid
                                    </h5>
                                  ))}
                                <h5 className="ms-4">
                                  <span className="fw-normal">
                                    Order Total: ₱
                                  </span>
                                  {parseInt(o.item_price) *
                                    parseInt(o.order_qty)}
                                </h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Change Pass */}
            <div
              className={`update-pw-form ${
                active === "Change Password" ? "" : "display-none"
              }`}
            >
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12 shadow p-5">
                    <h3 className="section-title mb-3 text-center">
                      Change Password
                    </h3>
                    <form
                      className="w-50 mx-auto"
                      onSubmit={(e) => handleSubmit(e)}
                    >
                      <div class="form-floating mb-3">
                        <input
                          type="password"
                          class="form-control"
                          id="floatingCurrentPassword"
                          placeholder="Password"
                          value={currentPass}
                          onChange={(e) => setCurrentPass(e.target.value)}
                        />
                        <label for="floatingCurrentPassword">Password</label>
                      </div>
                      <div class="form-floating mb-3">
                        <input
                          type="password"
                          class="form-control"
                          id="floatingNewPassword"
                          placeholder="Password"
                          value={newPass}
                          onChange={(e) => setNewPass(e.target.value)}
                        />
                        <label for="floatingNewPassword">New Password</label>
                      </div>
                      <div class="form-floating mb-3">
                        <input
                          type="password"
                          class="form-control"
                          id="floatingConfirmPassword"
                          placeholder="Password"
                          value={confirmPass}
                          onChange={(e) => setConfirmPass(e.target.value)}
                        />
                        <label for="floatingConfirmPassword">
                          Confirm Password
                        </label>
                      </div>
                      <div className="d-flex justify-content-center align-items-center">
                        <button type="submit" className="btn btn-secondary">
                          SUBMIT
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserDashboard;
