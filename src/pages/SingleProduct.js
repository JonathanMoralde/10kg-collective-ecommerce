import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaMinus } from "react-icons";
import { useNavigate } from "react-router-dom";

const SingleProduct = ({ user }) => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [data, setData] = useState([]);
  const [selectedSize, setSelectedSize] = useState("S");
  const [selectedVariant, setSelectedVariant] = useState("Gray");
  const [quantity, setQuantity] = useState("1");
  const [itemSize, setItemSize] = useState([]);
  const [itemVariant, setItemVariant] = useState([]);

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

  // this will get all item sizes
  useEffect(() => {
    const getSizes = async () => {
      const response = await axios.get(
        "https:/localhost/10kg-collective/displayModule/sizes.php"
      );

      // Get the size list object from the response
      const sizeList = await response.data;

      setItemSize(sizeList);
    };

    getSizes();
  }, []);

  // this will get variants
  useEffect(() => {
    const getVariants = async () => {
      const response = await axios.get(
        "https:/localhost/10kg-collective/displayModule/variant.php"
      );

      // Get the size list object from the response
      const variantList = await response.data;

      setItemVariant(variantList);
    };
    getVariants();
  }, []);

  // Filter to the Single product

  const productSize = itemSize.filter((product) => product.item_id == id);
  const productVariant = itemVariant.filter((product) => product.item_id == id);
  const product = data.find((product) => product.item_id == id);

  if (!product) {
    return <div>Loading...</div>;
  }

  // CART & BUY BTN HANDLER
  const handleClick = (e) => {
    if (e.target.name === "cart") {

      if (selectedSize && selectedVariant && quantity) {
        // POST TO THIS FILE (cart.php can be changed)
        const url = "http://localhost/10kg-collective/orderModule/cart.php";

        let cartData = new FormData();

        cartData.append("user_id", user.user_id)
        cartData.append("item_id", product.item_id);
        cartData.append("item_size", selectedSize);
        cartData.append("item_variant", selectedVariant);
        cartData.append("order_qty", quantity);

        axios
          .post(url, cartData)
          .then((response) => {
            if(response.data === 1){
              alert("added to Cart")
              navigate('/Shop')
            } else {
              alert("Failed to add in cart")
            }
          })
          .catch((error) => alert(error));
      }
    }

    if (e.target.name === "buy") {
      navigate(
        `/Shop/Checkout/${id}/${selectedSize}/${selectedVariant}/${quantity}/${product.item_name}/${product.item_price}`
      );
    }
  };

  return (
    <section className="container-fluid container-fix single-product-section">
      <div className="row py-5">
        {/* PRODUCT IMAGE CAROUSEL/PREVIEW SECTION */}
        <div className="col-md-6">
          <div id="carouselExampleIndicators" className="carousel slide">
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="/" className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src="/" className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src="/" className="d-block w-100" alt="..." />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        {/* PRODUCT DETAILS AND FORM SECTION */}
        <div className="col-md-6 ">
          <h3 className="product-title">{product.item_name}</h3>
          <p className="product-price">₱{product.item_price}</p>
          <p className="product-stock-status">
            {product.item_status == "A" ? "In stock" : "Out of Stock"}
          </p>
          {/* form */}
          <form className="single-product-form mt-5">
            <div className="product-form-container d-flex justify-content-between">
              {/* Size */}
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="form-select form-select-sm"
                name="size"
              >
                {productSize.map((product) => (
                  <option key={product.size_id} value={product.size_id}>
                    {product.size_name}
                  </option>
                ))}
              </select>

              {/* variation */}
              <select
                value={selectedVariant}
                onChange={(e) => setSelectedVariant(e.target.value)}
                className="form-select form-select-sm"
                name="variant"
              >
                {productVariant.map((product) => (
                  <option
                    key={product.variation_id}
                    value={product.variation_id}
                  >
                    {product.variation_name}
                  </option>
                ))}
              </select>

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
            </div>

            {/* btns */}
            <div className="product-btn-container d-flex justify-content-between aling-items-center mt-5">
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
          </form>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
