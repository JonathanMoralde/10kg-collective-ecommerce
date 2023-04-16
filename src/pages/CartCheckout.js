import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const CartCheckout = ({ user }) => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]); //array of objects
  let subtotal = 0;

  const fakeData = [
    {
      order_id: 1,
      name: "plain series",
      price: "250",
      size: "Medium",
      variant: "white",
      quantity: 2,
    },
    {
      order_id: 2,
      name: "Weightless",
      price: "399",
      size: "Small",
      variant: "white",
      quantity: 1,
    },
    {
      order_id: 3,
      name: "TTP",
      price: "450",
      size: "Large",
      variant: "Black",
      quantity: 3,
    },
    {
      order_id: 4,
      name: "TTP",
      price: "450",
      size: "Large",
      variant: "Black",
      quantity: 1,
    },
  ];

  // get all order of user
  useEffect(() => {
    const url = "https://localhost/10kg-collective/orderModule/user_order.php"; //php file that retrieves user's pending order

    axios
      .get(url)
      .then((response) => {
        alert(response.data);
        //order list will be set here
        // setOrders(response.data)
      })
      .catch(() => {
        alert("Maintenance Mode");
      });

    setOrders(fakeData); //hard code
  }, []);

  // get total
  orders.forEach((order) => {
    let ordertotal = parseInt(order.price) * parseInt(order.quantity);
    subtotal += ordertotal;
  });

  // handle checkout
  const handleCheckout = (user) => {
    const url =
      "https://localhost/10kg-collective/orderModule/multiple_checkout.php"; //this checkout should handle multiple pending orders (checkout.js only sends 1 order)
    // const ordersJSON = JSON.stringify(orders);

    let checkoutData = new FormData();
    checkoutData.append("user_id", user.user_id); //user_id
    checkoutData.append("orders", orders); //all pending orders

    axios
      .post(url, checkoutData) //POST, update order status to confirmed
      .then((response) => alert(response.data))
      .catch((error) => alert(error.data));
    navigate("/Shop");
  };

  console.log(subtotal);

  return (
    <>
      <div className="container-md container-fix checkout-page my-5 shadow">
        <h3 className="section-title mb-4">Checkout</h3>
        <div className="row mb-3">
          <div className="col-md-6">
            <h3 className="col-title">Your Order</h3>
          </div>
          <div className="col-md-6">
            <div className="d-flex justify-content-between">
              <h3 className="col-title">Size</h3>
              <h3 className="col-title">Variation</h3>
              <h3 className="col-title">Qty</h3>
              <h3 className="col-title">Price</h3>
            </div>
          </div>
        </div>
        <div className="container checkout-order-list">
          {orders.map((order) => {
            return (
              <div className="row mb-3">
                <div className="col-md-6 d-flex">
                  <div className="card me-5">
                    <img
                      src=""
                      className="card-img-top"
                      alt="product-img"
                      height="150px"
                    />
                  </div>
                  <div className="">
                    <h5 className="checkout-text">{order.name}</h5>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="d-flex justify-content-between h-100">
                    <h3 className="checkout-text">{order.size}</h3>
                    <h3 className="checkout-text">{order.variant}</h3>
                    <h3 className="checkout-text">{order.quantity}</h3>
                    <h3 className="checkout-text">{order.price}</h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <h5 className="checkout-text text-center my-3">
          Total Amount: ₱{subtotal}
        </h5>
        <div className="checkout-btn-container d-flex justify-content-center align-items-center">
          <Link to="/" className="btn btn-outline-secondary me-3">
            Cancel
          </Link>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => handleCheckout(user)}
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default CartCheckout;
