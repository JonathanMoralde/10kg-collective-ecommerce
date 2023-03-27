import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Checkout = () => {
  const { id, size, variant, qty } = useParams();
  const [data, setData] = useState([]);
  const [userID, setUserID] = useState(null);
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
  //   console.log(product);

  useEffect(() => {
    axios
      .get("https:/localhost/10kg-collective/userModule/checksession.php")
      .then((response) => {
        const userId = response.data.user_id;
        // use the `userId` variable here
        setUserID(userId);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

  const handleClick = (e) => {
    if (size && variant && qty) {
      // POST TO THIS FILE (checkout.php can be changed)
      const url = "http://localhost/10kg-collective/orderModule/checkout.php";

      let buyData = new FormData();

      // this are the POST data if(isset("buy"))
      buyData.append("user_id", userID);
      buyData.append("item_id", product.item_id);
      buyData.append("item_size", size);
      buyData.append("item_variant", variant);
      buyData.append("order_qty", qty);

      axios
        .post(url, buyData)
        .then((response) => {
          alert(response.data);
          navigate("/");
        })
        .catch((error) => alert(error));
    }
  };

  return (
    <>
      <div className="container-fluid container-fix">
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

        {/* <div className="row">
          <div className="col-md-6 d-flex " key={product.item_id}>
             <div className="card mb-3 me-3">
              <img
                src={product.item_image}
                className="card-img-top"
                alt="product-img"
                height="234px"
              />
            </div> 
            <div>
              <h5 className="checkout-product-title">{product.item_name}</h5>
              <button type="button" class="btn btn-outline-danger">
                Danger
              </button>
            </div>
          </div>
          <div className="col-md-6"></div>
        </div> */}
        <button
          type="button"
          class="btn btn-secondary"
          onClick={(e) => handleClick(e)}
        >
          Checkout
        </button>
      </div>
    </>
  );
};

export default Checkout;
