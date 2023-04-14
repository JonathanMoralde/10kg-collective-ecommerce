import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Cart = ({ user, active, setActive }) => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]); //orders
  let subtotal = 0; //price subtotal

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
  ];

  // get orders from php
  useEffect(() => {
    setOrders(fakeData);
  }, []);

  // get price subtotal
  orders.forEach((order) => (subtotal += parseInt(order.price)));

  // quantity input field
  const handleQuantityChange = (index, event) => {
    const newOrders = [...orders];
    newOrders[index].quantity = parseInt(event.target.value);
    setOrders(newOrders);
  };

  const handleMinus = (index) => {
    const newOrders = [...orders];
    if (newOrders[index].quantity > 1) {
      newOrders[index].quantity -= 1;
      setOrders(newOrders);
    }
  };
  const handlePlus = (index) => {
    const newOrders = [...orders];
    newOrders[index].quantity += 1;
    setOrders(newOrders);
  };

  // single order delete
  const handleDel = (index) => {
    const newOrders = orders.filter((order) => order != orders[index]);
    setOrders(newOrders);
  };

  // checkout btn
  const handleCheckout = () => {
    // const cartJSON = JSON.stringify(orders);

    const cartData = new FormData();
    cartData.append("user_id", user.user_id); //$_POST['user_id']
    cartData.append("cart", orders); //$_POST['cart'] ==== contains array of objects or array of associative arrays???

    const url = "https://localhost/10kg-collective/orderModule/cart_update.php";
    // update user order first in db
    axios
      .post(url, cartData)
      .then((response) => {
        alert(response.data);
        navigate("/Checkout");
      })
      .catch((error) => alert(error.data));
    // then proceed to cart checkout page that displays updated order list
    // console.log(user.user_id, orders);
  };

  return (
    <>
      <div
        className={`container-md cart-container bg-white shadow ${
          active ? "cart-active" : ""
        }`}
      >
        <div className="cart-title-container d-flex justify-content-between align-items-center mb-3">
          <h5 className="section-title">Cart</h5>
          <button
            type="button"
            className="btn-close float-end"
            aria-label="Close"
            onClick={() => setActive(!active)}
          ></button>
        </div>

        <div className="container">
          {/* Order list */}
          <div className="row border-top mb-3">
            {orders.length === 0 && (
              <div className="col-md-12 py-3">
                <p>Your Cart is empty.</p>
                <Link
                  to="/Shop"
                  onClick={() => setActive(!active)}
                  className="btn btn-secondary"
                >
                  SHOP NOW
                </Link>
              </div>
            )}

            {orders.map((order, index) => (
              <div key={index} className="col-md-12 d-flex py-3 border-btm">
                <div className="cart-img-container">
                  <img src="/" alt="-img" className="w-100 h-100" />
                </div>

                <div className="cart-item-info d-flex justify-content-between text-capitalize">
                  <div>
                    <h5 className="cart-item-title">{order.name}</h5>
                    <p className="cart-item-var">{order.variant}</p>
                    <p className="cart-item-size">{order.size}</p>
                    <p className="cart-item-price">₱{order.price}</p>
                    <div className="d-flex align-items-center">
                      <span
                        className="qty-btn fw-medium"
                        onClick={() => handleMinus(index)}
                      >
                        -
                      </span>
                      <input
                        type="number"
                        name="qty"
                        id="cartQty"
                        className="form-control w-25 text-center mx-2"
                        min="1"
                        value={order.quantity}
                        onChange={(event) => handleQuantityChange(index, event)}
                      />
                      <span
                        className="qty-btn fw-medium"
                        onClick={() => handlePlus(index)}
                      >
                        +
                      </span>
                    </div>
                  </div>
                  <div>
                    <button
                      className="btn btn-fix"
                      onClick={() => handleDel(index)}
                    >
                      {<FaTrash />}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order total amount */}
        {orders.length > 0 ? (
          <>
            <div>
              <h5>Subtotal: ₱{subtotal}</h5>
            </div>
            <button
              className="btn btn-secondary text-uppercase"
              onClick={() => handleCheckout()}
            >
              Proceed to Checkout
            </button>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Cart;
