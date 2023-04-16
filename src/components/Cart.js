import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Cart = ({ user, active, setActive }) => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]); //orders
  let subtotal = 0; //price subtotal

  let componentMounted = true;
  const [loading, setLoading] = useState(false);

  const fakeData = [
    {
      order_id: 1,
      item_name: "plain series",
      item_price: "250",
      size_name: "Medium",
      variation_name: "white",
      order_qty: 2,
    },
    {
      order_id: 2,
      item_name: "Weightless",
      item_price: "399",
      size_name: "Small",
      variation_name: "white",
      order_qty: 1,
    },
  ];

  // get orders from php
  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);

      const response = await axios.get(
        "http://localhost/10kg-collective/displayModule/cart_display.php"
      );

      if (componentMounted) {
        setOrders(response.data);
        setLoading(false);
      }
      return () => {
        componentMounted = false;
      };
    };

    // fetchOrder()
    setOrders(fakeData); //temporary data
  }, []);

  // get price subtotal
  orders.forEach(
    (order) =>
      (subtotal += parseInt(order.item_price) * parseInt(order.order_qty))
  );

  // quantity input field
  const handleQuantityChange = (index, event) => {
    const newOrders = [...orders];
    newOrders[index].order_qty = parseInt(event.target.value);
    setOrders(newOrders);
  };

  const handleMinus = (index) => {
    const newOrders = [...orders];
    if (newOrders[index].order_qty > 1) {
      newOrders[index].order_qty -= 1;
      setOrders(newOrders);
    }
  };
  const handlePlus = (index) => {
    const newOrders = [...orders];
    newOrders[index].order_qty += 1;
    setOrders(newOrders);
  };

  // single order delete
  const handleDel = (index) => {
    // perma delete order from orders table
    const removedOrder = orders[index];
    const { order_id } = removedOrder;
    console.log(removedOrder);

    let delData = new FormData();
    delData.append("order_id", order_id);

    const url = "http://localhost/10kg-collective/orderModule/cart_delete.php";

    axios.post(url, delData).then((response) => {
      // if order deleted, remove it from my orders list
      if (response.data === 1) {
        const newOrders = orders.filter((order) => order != orders[index]);
        setOrders(newOrders);
      } else {
        alert("Failed to remove from cart");
      }
    });
  };

  // checkout btn
  const handleCheckout = () => {
    const cartJSON = JSON.stringify(orders); //json format

    const cartData = new FormData();
    cartData.append("user_id", user.user_id); //$_POST['user_id']
    cartData.append("cart", cartJSON); //$_POST['cart'] contains array of objects converted to json format
    const url = "https://localhost/10kg-collective/orderModule/cart_update.php";
    // update user order first in db by sending updated order data to POST
    axios
      .post(url, cartData)
      .then((response) => {
        // if the order was updated successfully, will then proceed to cart checkout page
        if (response.data === 1) {
          navigate("/Checkout");
        } else {
          // if unsuccessful
          alert("Error occured while proceeding to checkout");
        }
      })
      .catch((error) => alert(error.data));
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
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
                      <h5 className="cart-item-title">{order.item_name}</h5>
                      <p className="cart-item-var">{order.variation_name}</p>
                      <p className="cart-item-size">{order.size_name}</p>
                      <p className="cart-item-price">₱{order.item_price}</p>
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
                          value={order.order_qty}
                          onChange={(event) =>
                            handleQuantityChange(index, event)
                          }
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
      )}
    </>
  );
};

export default Cart;
