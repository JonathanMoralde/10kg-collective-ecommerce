import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Checkout = ({ user }) => {
  const { id, size, variant, qty, name, price } = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // this will get all Items
  useEffect(() => {
    const getProduct = async () => {
      const response = await axios.get(
        "https:/localhost/10kg-collective/displayModule/display.php"
      );

      // Get the itemlist object from the response
      const itemlist = await response.data;

      setData(itemlist);
    };

    getProduct();
  }, []);

  // Filter to the Single product
  const product = data.find((product) => product.item_id == id);
  // console.log(product);

  // // GET THE USER ID THROUGH SESSION //method 1 error
  // useEffect(() => {
  //   axios
  //     .get("https:/localhost/10kg-collective/userModule/checksession.php")
  //     .then((response) => {
  //       const userId = response.user_id;
  //       // use the `userId` variable here
  //       setUserID(userId);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // }, []);

  // console.log(userID);

  const handleClick = (e) => {
    // e.target.preventDefault()

    // POST
    const url = "http://localhost/10kg-collective/orderModule/checkout.php";

    let buyData = new FormData();

    // buyy
    buyData.append("user_id", user.user_id);
    buyData.append("item_id", product.item_id);
    buyData.append("item_size", size);
    buyData.append("item_variant", variant);
    buyData.append("order_qty", qty);

    axios
      .post(url, buyData)
      .then((response) => {
        alert(response.data);
        navigate("/User");
      })
      .catch((error) => alert(error));
    // console.log(user.user_id, product.item_id, size, variant, qty);
  };

  // console.log(user);
  return (
    <>
      <div className="container-fluid container-fix checkout-page">
        <h3 className="section-title">Checkout</h3>
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

        <div className="row">
          <div className="col-md-6 d-flex ">
            <div className="card mb-3 me-3">
              <img
                src=""
                className="card-img-top"
                alt="product-img"
                height="234px"
              />
            </div>
            <div>
              <h5 className="checkout-product-title">{name}</h5>
              {/* ERROR DISPLAYING NAME ON FIRST */}
              <button type="button" className="btn btn-outline-danger">
                Remove
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex justify-content-between">
              <h3 className="col-title">{size}</h3>
              <h3 className="col-title">{variant}</h3>
              <h3 className="col-title">{qty}</h3>
              <h3 className="col-title">{price}</h3>
              {/* ERROR DISPLAYING PRICE ON FIRST */}
            </div>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={(e) => handleClick(e)}
        >
          Checkout
        </button>
      </div>
    </>
  );
};

export default Checkout;
