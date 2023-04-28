import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";

const Orders = ({ adminUser }) => {
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;

  // get all the orders from backend
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await axios.get(
        "https://localhost/10kg-collective/admin/orderlist.php"
      );

      if (componentMounted) {
        setOrder(response.data);
        setLoading(false);
      }
      return (componentMounted = false);
    };

    fetchData();
  }, []);

  // extracted data from orderList
  const [pendingOrders, setPendingOrders] = useState([]);
  const [confirmedOrders, setConfirmedOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);

  const [orderDisplay, setOrderDisplay] = useState([]);

  useEffect(() => {
    if ((!loading, order.length > 0)) {
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

      setOrderDisplay(orderList);
    }
  }, [order]);

  // console.log(orderDisplay);
  const [clickedOrderDisplay, setClickedOrderDisplay] = useState("All Orders");

  return (
    <>
      <div className="container-fluid container-fix my-5">
        <div className="d-flex justify-content-between">
          <h3 className="section-title mb-3">All Orders</h3>
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
        {/* <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h5>Order</h5>
            </div>
            <div className="col-md-6 d-flex justify-content-between">
              <h5>Date Ordered</h5>
              <h5>Order Status</h5>
              <h5>Payment Status</h5>
            </div>
          </div>
        </div> */}
        {/* orders */}
        {loading ? (
          <div>Loading...</div>
        ) : (
          // <div className="container">
          //   {/* single order */}
          //   <div className="row mb-3">
          //     <div className="col-md-6 d-flex ">
          //       <div className="order-img-container w-25">
          //         <img src="/" className="w-100" alt="img" />
          //       </div>
          //       <div className="order-info-container w-50 d-flex justify-content-between">
          //         <div>
          //           <h6>Name: </h6>
          //           <h6>Item: </h6>
          //           <h6>Variation: </h6>
          //         </div>
          //         <div>
          //           <h6>Address: </h6>
          //           <h6>Size: </h6>
          //           <h6>Qty:</h6>
          //         </div>
          //       </div>
          //     </div>
          //     <div className="col-md-6"></div>
          //   </div>
          //   {/* single order */}
          //   <div className="row mb-3">
          //     <div className="col-md-6 d-flex ">
          //       <div className="order-img-container w-25">
          //         <img src="/" className="w-100" alt="img" />
          //       </div>
          //       <div className="order-info-container w-50 d-flex justify-content-between">
          //         <div>
          //           <h6>Name: </h6>
          //           <h6>Item: </h6>
          //           <h6>Variation: </h6>
          //         </div>
          //         <div>
          //           <h6>Address: </h6>
          //           <h6>Size: </h6>
          //           <h6>Qty:</h6>
          //         </div>
          //       </div>
          //     </div>
          //     <div className="col-md-6"></div>
          //   </div>
          //   {/* single order */}
          //   <div className="row mb-3">
          //     <div className="col-md-6 d-flex ">
          //       <div className="order-img-container w-25">
          //         <img src="/" className="w-100" alt="img" />
          //       </div>
          //       <div className="order-info-container w-50 d-flex justify-content-between">
          //         <div>
          //           <h6>Name: </h6>
          //           <h6>Item: </h6>
          //           <h6>Variation: </h6>
          //         </div>
          //         <div>
          //           <h6>Address: </h6>
          //           <h6>Size: </h6>
          //           <h6>Qty:</h6>
          //         </div>
          //       </div>
          //     </div>
          //     <div className="col-md-6"></div>
          //   </div>
          // </div>

          <div className={`order-list-section`}>
            <div className="container-fluid">
              {orderDisplay.map((o) => {
                return (
                  <div
                    className={`row my-3 p-3 single-order admin-single-order ${
                      o.payment_status === "Paid" ||
                      o.order_status === "Canceled"
                        ? "no-blur"
                        : ""
                    }`}
                    key={o.order_id}
                  >
                    <div className="col-md-2 so-img">
                      {/* image */}
                      <div className="order-track-img-wrapper w-100">
                        <img src="#" alt="img" className="img-fluid" />
                      </div>
                    </div>

                    <div className="col-md-10 so-info  pe-3">
                      {/* info */}
                      <div className="container-fluid">
                        <div className="row">
                          {/* upper half */}
                          <div className="col-md-12 d-flex">
                            <div className="w-100 order-track-info-wrapper d-flex align-items-center justify-content-between">
                              <div className="w-50 text-capitalize">
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
                            <div className="w-50">
                              <h5 className="text-capitalize">
                                Name: {o.full_name}
                              </h5>
                              <h5 className="text-capitalize">
                                Address: {o.address}
                              </h5>
                            </div>
                            <div className="w-50 d-flex justify-content-end text-end align-items-center">
                              {/* all orders w/ pending status */}
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
                                {parseInt(o.item_price) * parseInt(o.order_qty)}
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {o.payment_status === "Paid" ? (
                      <div className="admin-single-order-overlay d-flex align-items-center justify-content-center"></div>
                    ) : (
                      <div className="admin-single-order-overlay d-flex align-items-center justify-content-center">
                        {o.order_status === "P" && (
                          <button className="btn btn-secondary me-3">
                            Confirm Order
                          </button>
                        )}
                        {o.order_status === "C" &&
                          o.payment_status === "Unpaid" && (
                            <button className="btn btn-secondary">
                              Order Paid
                            </button>
                          )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Orders;
