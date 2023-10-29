import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Checkout = ({ user }) => {
  const { id, size, variant, qty, name, price } = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [product, setProduct] = useState();

  // this will get all Items
  useEffect(() => {
    const getProduct = async () => {
      const response = await axios.get(
        "https://10kgcollective.000webhostapp.com/displayModule/display.php"
      );

      // Get the itemlist object from the response
      const itemlist = await response.data;

      setData(itemlist);
    };

    getProduct();
  }, []);

  useEffect(() => {
    // Filter to the Single product
    let product = data.find((product) => product.item_id == id);
    setProduct(product);
  }, [data]);

  const handleClick = () => {
    // POST
    const url =
      "https://10kgcollective.000webhostapp.com/orderModule/checkout.php";

    let buyData = new FormData();

    // buyy
    buyData.append("user_id", user.user_id);
    buyData.append("item_id", product.item_id);
    buyData.append("item_size", size);
    buyData.append("item_variant", variant);
    buyData.append("order_qty", qty);

    if (buyData) {
      axios
        .post(url, buyData)
        .then((response) => {
          if (response.data === 1) {
            toast.success("Ordered Successfully");
            navigate("/UserDashboard");
          } else {
            toast.warn(`Order Failed ${response.data}`);
          }
        })
        .catch((error) => toast.error(error.data));
    }
  };

  console.log(product);

  return (
    <>
      <div className="container-fluid checkout-background py-5">
        <div className="container-md shadow container-fix checkout-page checkout-page-single bg-white">
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
                  src={product ? product.image_src : ""}
                  className="card-img-top"
                  alt="product-img"
                  height="150px"
                />
              </div>
              <div className="">
                <h5 className="checkout-text">{name}</h5>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex justify-content-between h-100">
                <h3 className="checkout-text">{size}</h3>
                <h3 className="checkout-text">{variant}</h3>
                <h3 className="checkout-text">{qty}</h3>
                <h3 className="checkout-text">{price}</h3>
              </div>
            </div>
          </div>

          <h5 className="checkout-text text-center my-3">
            Total Amount: ₱{parseInt(price) * parseInt(qty)}
          </h5>
          <div className="checkout-btn-container d-flex justify-content-center align-items-center">
            <Link to="/Shop" className="btn btn-outline-secondary me-3">
              Cancel
            </Link>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => handleClick()}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
