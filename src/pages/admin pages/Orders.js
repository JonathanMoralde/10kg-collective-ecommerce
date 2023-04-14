import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Orders = ({ adminUser }) => {
  const [orderList, setOrderList] = useState();

  // get all the orders from backend
  useEffect(() => {
    const url = "https:/localhost/10kg-collective/admin/orderlist.php";

    const response = axios.get(url);

    setOrderList(response.data);
  }, []);

  return (
    <>
      <div className="container-fluid container-fix my-5">
        <h3 className="section-title mb-3">All Orders</h3>
        <div className="container">
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
        </div>
        {/* orders */}
        <div className="container">
          {/* single order */}
          <div className="row mb-3">
            <div className="col-md-6 d-flex ">
              <div className="order-img-container w-25">
                <img src="/" className="w-100" alt="img" />
              </div>
              <div className="order-info-container w-50 d-flex justify-content-between">
                <div>
                  <h6>Name: </h6>
                  <h6>Item: </h6>
                  <h6>Variation: </h6>
                </div>
                <div>
                  <h6>Address: </h6>
                  <h6>Size: </h6>
                  <h6>Qty:</h6>
                </div>
              </div>
            </div>
            <div className="col-md-6"></div>
          </div>
          {/* single order */}
          <div className="row mb-3">
            <div className="col-md-6 d-flex ">
              <div className="order-img-container w-25">
                <img src="/" className="w-100" alt="img" />
              </div>
              <div className="order-info-container w-50 d-flex justify-content-between">
                <div>
                  <h6>Name: </h6>
                  <h6>Item: </h6>
                  <h6>Variation: </h6>
                </div>
                <div>
                  <h6>Address: </h6>
                  <h6>Size: </h6>
                  <h6>Qty:</h6>
                </div>
              </div>
            </div>
            <div className="col-md-6"></div>
          </div>
          {/* single order */}
          <div className="row mb-3">
            <div className="col-md-6 d-flex ">
              <div className="order-img-container w-25">
                <img src="/" className="w-100" alt="img" />
              </div>
              <div className="order-info-container w-50 d-flex justify-content-between">
                <div>
                  <h6>Name: </h6>
                  <h6>Item: </h6>
                  <h6>Variation: </h6>
                </div>
                <div>
                  <h6>Address: </h6>
                  <h6>Size: </h6>
                  <h6>Qty:</h6>
                </div>
              </div>
            </div>
            <div className="col-md-6"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
