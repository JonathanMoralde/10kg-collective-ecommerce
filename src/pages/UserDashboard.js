import React from "react";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { FaCog } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const UserDashboard = ({ user, setUser }) => {
  const id = user.user_id;
  const [order, setOrder] = useState([]);

  let componentMounted = true;
  const [loading, setLoading] = useState(false);

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
  }, []);

  // extracted data from orders
  const [pendingOrders, setPendingOrders] = useState([]);
  const [confirmedOrders, setConfirmedOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);

  // console.log(pendingOrders);
  // console.log(confirmedOrders);
  // console.log(allOrders);
  // console.log(completedOrders);

  useEffect(() => {
    if (order.length > 0) {
      // pending orders
      const pendingList = order.filter((o) => o.order_status == "P"); //using === seems
      setPendingOrders(pendingList);

      // confirmed orders
      const confirmedList = order.filter((o) => o.order_status == "C");
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
                    <div class="accordion-body dashboard-sublinks my-3">
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
                {orderDisplay.map((o) => {
                  return (
                    <div
                      className="row my-3 p-3 shadow-sm single-order"
                      key={o.order_id}
                    >
                      <div className="col-md-12 d-flex">
                        <div className="order-track-img-wrapper w-25">
                          <img src="#" alt="img" className="img-fluid" />
                        </div>
                        <div className="w-75 order-track-info-wrapper d-flex align-items-center">
                          <div className="w-75 text-capitalize">
                            <h5>{o.item_name}</h5>
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
                      <div className="col-md-12 pt-3">
                        <div className="d-flex justify-content-end align-items-center">
                          {clickedOrderDisplay === "All Orders" &&
                            o.order_status == "P" && (
                              <h5 className="ms-4 fst-italic text-info-emphasis">
                                Pending
                              </h5>
                            )}
                          {o.payment_status === "Unpaid" ? (
                            <h5 className="ms-4 fst-italic text-danger-emphasis">
                              Unpaid
                            </h5>
                          ) : (
                            <h5 className="ms-4 fst-italic">Paid</h5>
                          )}
                          <h5 className="ms-4">
                            <span className="fw-normal">Order Total: ₱</span>
                            {parseInt(o.item_price) * parseInt(o.order_qty)}
                          </h5>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserDashboard;
