import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import AppContext from "../AppContext";
import { toast } from "react-toastify";

const CartCheckout = ({ user }) => {
  const id = user.user_id;
  const { isNewOrder, setIsNewOrder, cartCheckout } = useContext(AppContext);

  const navigate = useNavigate();

  let subtotal = 0;

  cartCheckout.forEach((order) => {
    let ordertotal = parseInt(order.item_price) * parseInt(order.order_qty);
    subtotal += ordertotal;
  });

  // handle checkout
  const handleCheckout = () => {
    const url =
      "https://localhost/10kg-collective/orderModule/multiple_checkout.php"; //this checkout should handle multiple pending orders (checkout.js only sends 1 order)

    let checkoutData = new FormData();
    checkoutData.append("user_id", id); //user_id
    checkoutData.append("orders", JSON.stringify(cartCheckout)); //selected cart orders JSON format

    axios
      .post(url, checkoutData) //POST, update order status to pending
      .then((response) => {
        if (response.data == 1) {
          toast.success("Order placed successfully", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setIsNewOrder(true);
          navigate("/Shop");
        } else {
          toast.error(response.data, {
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
        toast.error(error.data, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
    // navigate("/Shop");
  };

  // console.log(subtotal);

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
          {cartCheckout.map((order) => {
            return (
              <div className="row mb-3" key={order.order_id}>
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
                    <h5 className="checkout-text">{order.item_name}</h5>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="d-flex justify-content-between h-100">
                    <h3 className="checkout-text">{order.item_size}</h3>
                    <h3 className="checkout-text">{order.item_variant}</h3>
                    <h3 className="checkout-text">{order.order_qty}</h3>
                    <h3 className="checkout-text">{order.item_price}</h3>
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
            onClick={() => handleCheckout()}
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default CartCheckout;
