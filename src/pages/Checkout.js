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
 

  const handleClick = () => {

    // POST
    const url = "https://localhost/10kg-collective/orderModule/checkout.php";

    let buyData = new FormData();

    // buyy
    buyData.append("user_id", user.user_id);
    buyData.append("item_id", product.item_id);
    buyData.append("item_size", size);
    buyData.append("item_variant", variant);
    buyData.append("order_qty", qty);


    if(buyData){
      axios
      .post(url, buyData)
      .then((response) => {
        if(response.data === 1){
          alert("Ordered Successfully")
          navigate("/UserDashboard");
        }else {
          alert("Order Failed")
        }
      })
      .catch((error) => alert(error));
    }
    
  };

  return (
    <>
      <div className="container-fluid container-fix checkout-page my-5">
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

        <div className="row">
          <div className="col-md-6 d-flex">
            <div className="card mb-3 me-5">
              <img
                src=""
                className="card-img-top"
                alt="product-img"
                height="150px"
              />
            </div>
            <div className="">
              <h5 className="checkout-product-title">{name}</h5>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex justify-content-between align-items-center h-100">
              <h3 className="col-title">{size}</h3>
              <h3 className="col-title">{variant}</h3>
              <h3 className="col-title">{qty}</h3>
              <h3 className="col-title">{price}</h3>
            </div>
          </div>
        </div>
        <div className="checkout-btn-container d-flex justify-content-center align-items-center">
          <button className="btn btn-outline-secondary me-3">Cancel</button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => handleClick()}
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default Checkout;
