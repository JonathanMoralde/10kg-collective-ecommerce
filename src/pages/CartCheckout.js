import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const CartCheckout = ({ user }) => {
  const id = user.user_id;
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]); //array of objects
  const [cartOrders, setCartOrders] = useState([]);
  let subtotal = 0;

  const [loading, setLoading] = useState(false);
  let componentMounted = true;

  // const fakeData = [
  //   {
  //     order_id: 1,
  //     name: "plain series",
  //     price: "250",
  //     size: "Medium",
  //     variant: "white",
  //     quantity: 2,
  //   },
  //   {
  //     order_id: 2,
  //     name: "Weightless",
  //     price: "399",
  //     size: "Small",
  //     variant: "white",
  //     quantity: 1,
  //   },
  //   {
  //     order_id: 3,
  //     name: "TTP",
  //     price: "450",
  //     size: "Large",
  //     variant: "Black",
  //     quantity: 3,
  //   },
  //   {
  //     order_id: 4,
  //     name: "TTP",
  //     price: "450",
  //     size: "Large",
  //     variant: "Black",
  //     quantity: 1,
  //   },
  // ];

  // get all order of user
  useEffect(() => {
    // const url = "https://localhost/10kg-collective/orderModule/user_order.php"; //php file that retrieves user's pending order

    // axios
    //   .get(url)
    //   .then((response) => {
    //     alert(response.data);
    //     //order list will be set here
    //     // setOrders(response.data)
    //   })
    //   .catch(() => {
    //     alert("Maintenance Mode");
    //   });

    // setOrders(fakeData); //hard code
    const fetchData = async () => {
      setLoading(true);
      const response = await axios.get(
        `http://localhost/10kg-collective/displayModule/user_order.php?user_id=${id}`
      );

      if (componentMounted) {
        setOrders(response.data);
        setLoading(false);
      }

      return (componentMounted = false);
    };
  }, []);

  // get orders that have order status = "Cart"
  useEffect(() => {
    if (!loading && orders.length > 0) {
      // pending orders
      const cartList = orders.filter((o) => o.order_status == "Cart"); //using === seems
      setCartOrders(cartList);
    }
  }, [orders]);

  // get total
  cartOrders.forEach((order) => {
    let ordertotal = parseInt(order.item_price) * parseInt(order.order_qty);
    subtotal += ordertotal;
  });

  // handle checkout
  const handleCheckout = () => {
    const url =
      "https://localhost/10kg-collective/orderModule/multiple_checkout.php"; //this checkout should handle multiple pending orders (checkout.js only sends 1 order)

    let checkoutData = new FormData();
    checkoutData.append("user_id", id); //user_id
    checkoutData.append("orders", JSON.stringify(cartOrders)); //all cart orders JSON format
    // checkoutData.append("orders", cartOrders); //all cart orders (not sent as JSON)

    axios
      .post(url, checkoutData) //POST, update order status to pending
      .then((response) => alert(response.data)) //prints echo
      .catch((error) => alert(error.data));
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
          {cartOrders.map((order) => {
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
