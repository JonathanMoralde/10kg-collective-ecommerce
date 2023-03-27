import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaMinus } from "react-icons";
import { useNavigate } from "react-router-dom";

const SingleProduct = () => {
  const navigate = useNavigate();
  // handle Log in
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost/10kg-collective/userModule/check_session.php")
      .then((response) => {
        const isLoggedIn = response.data.loggedIn;
        setLoggedIn(isLoggedIn);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const { id } = useParams();
  const [data, setData] = useState([]);
  const [selectedSize, setSelectedSize] = useState("S");
  const [selectedVariant, setSelectedVariant] = useState("Gray");
  const [quantity, setQuantity] = useState("1");

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

  if (!product) {
    return <div>Loading...</div>;
  }

  // CART & BUY BTN HANDLER
  const handleClick = (e) => {
    if (e.target.name === "cart") {
      // check first if user is logged in
      if (!loggedIn) {
        navigate(`/User?redirect=/Shop/${id}`); // or navigate("/register");
        return null;
      }

      if (selectedSize && selectedVariant && quantity) {
        // POST TO THIS FILE (cart.php can be changed)
        const url = "http://localhost/10kg-collective/orderModule/cart.php";

        let cartData = new FormData();

        // this are the POST data if(isset("cart"))
        cartData.append("item_id", product.item_id);
        cartData.append("item_name", product.item_name);
        cartData.append("item_price", product.item_price);
        cartData.append("item_size", selectedSize);
        cartData.append("item_variant", selectedVariant);
        cartData.append("order_qty", quantity);

        axios
          .post(url, cartData)
          .then((response) => alert(response.data))
          .catch((error) => alert(error));
      }
    }

    if (e.target.name === "buy") {
      // check first if user is logged in
      if (!loggedIn) {
        navigate(`/User?redirect=/Shop/${id}`); // or navigate("/register");
        return null;
      }
      if (selectedSize && selectedVariant && quantity) {
        // POST TO THIS FILE (checkout.php can be changed)
        const url = "http://localhost/10kg-collective/orderModule/checkout.php";

        let buyData = new FormData();

        // this are the POST data if(isset("buy"))
        buyData.append("item_id", product.item_id);
        buyData.append("item_name", product.item_name);
        buyData.append("item_price", product.item_price);
        buyData.append("item_size", selectedSize);
        buyData.append("item_variant", selectedVariant);
        buyData.append("order_qty", quantity);

        axios
          .post(url, buyData)
          .then((response) => alert(response.data))
          .catch((error) => alert(error));
      }
    }
  };

  return (
    <section className="container-fluid container-fix single-product-section">
      <div className="row">
        {/* image preview */}
        <div className="col-md-6"></div>
        {/* form */}
        <div className="col-md-6">
          <h3 className="product-title">{product.item_name}</h3>
          <p className="product-price">₱ {product.item_price}</p>
          <p className="product-stock-status">In stock</p>
          <div className="product-form-container">
            {/* Size */}
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="form-select form-select-sm"
              name="size"
            >
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>

            {/* variation */}
            <select
              value={selectedVariant}
              onChange={(e) => setSelectedVariant(e.target.value)}
              className="form-select form-select-sm"
              name="variant"
            >
              <option value="Gray">Gray</option>
              <option value="Cream">Cream</option>
              <option value="Arctic">Arctic</option>
              <option value="Mustard">Mustard</option>
            </select>
          </div>

          {/* quantity */}
          <input
            type="number"
            className="form-control"
            name="quantity"
            min="1"
            id="quantity"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          />

          {/* btns */}
          <div className="product-btn-container">
            <button
              type="button"
              className="btn btn-outline-secondary"
              name="cart"
              onClick={(e) => handleClick(e)}
            >
              Add to Cart
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              name="buy"
              onClick={(e) => handleClick(e)}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
