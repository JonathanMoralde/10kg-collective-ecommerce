import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

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
      const confirmedList = order.filter((o) => o.order_status == "C");
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

  console.log(orderDisplay);
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
                              <h5 className="fw-normal">size: {o.item_size}</h5>
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
                    <div className="col-md-12 pt-3 d-flex">
                      <div>
                        <h5>{o.full_name}</h5>
                        <h5>{o.address}</h5>
                      </div>
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
        )}
      </div>
    </>
  );
};

export default Orders;
