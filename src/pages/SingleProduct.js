import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SingleProduct = ({ user }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedVariant, setSelectedVariant] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [itemSize, setItemSize] = useState([]);
  const [itemVariant, setItemVariant] = useState([]);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [productResponse, sizesResponse, variantsResponse] =
          await Promise.all([
            axios.get(
              "https://localhost/10kg-collective/displayModule/display.php"
            ),
            axios.get(
              "https://localhost/10kg-collective/displayModule/sizes.php"
            ),
            axios.get(
              "https://localhost/10kg-collective/displayModule/variant.php"
            ),
          ]);

        if (componentMounted) {
          setData(productResponse.data);
          setItemSize(sizesResponse.data);
          setItemVariant(variantsResponse.data);
          setLoading(false);
        }

        return () => {
          componentMounted = false;
        };
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // variables extracted from data, itemSize, itemVariant
  const [item_name, setItem_name] = useState("");
  const [item_price, setItem_price] = useState("");
  const [item_status, setItem_status] = useState("");
  const [size_name, setSize_name] = useState([]);
  const [variation_name, setVariation_name] = useState([]);

  useEffect(() => {
    if (!loading && data.length > 0 && itemSize.length > 0) {
      // Filter to the Single product
      // single product
      const product = data.find((product) => product.item_id == id); //using === seems to not work
      const { item_name, item_price, item_status } = product;
      setItem_name(item_name);
      setItem_price(item_price);
      setItem_status(item_status);

      // single product's size
      const productSize = itemSize.filter((product) => product.item_id == id); //using === seems to not work
      const { size_name } = productSize[0];
      setSize_name(JSON.parse(size_name));

      // single product's variant
      const productVariant = itemVariant.filter(
        (product) => product.item_id == id
      ); //using === seems to not work
      const { variation_name } = productVariant[0];
      setVariation_name(JSON.parse(variation_name));
    }
  }, [data, itemSize, id, loading]);


  // CART & BUY BTN HANDLER
  const handleClick = (e) => {
    if (e.target.name === "cart") {
      if (selectedSize && selectedVariant && quantity) {
        // POST TO THIS FILE (cart.php can be changed)
        const url = "http://localhost/10kg-collective/orderModule/cart.php";

        let cartData = new FormData();

        cartData.append("user_id", user.user_id);
        cartData.append("item_id", id);
        cartData.append("item_size", selectedSize);
        cartData.append("item_variant", selectedVariant);
        cartData.append("order_qty", quantity);

        axios
          .post(url, cartData)
          .then((response) => {
            if (response.data === 1) {
              alert("added to Cart");
              navigate("/Shop");
            } else {
              alert("Failed to add in cart");
            }
          })
          .catch((error) => alert(error));
      }
    }

    if (e.target.name === "buy") {
      if (selectedSize && selectedVariant) {
        navigate(
          `/Shop/Checkout/${id}/${selectedSize}/${selectedVariant}/${quantity}/${item_name}/${item_price}`
        );
      } else {
        alert("Please select properly");
      }
    }
  };

  // handle minus btn
  const handleMinus = () => {
    if (quantity > 1) {
      let newQty = parseInt(quantity) - 1;
      setQuantity(newQty);
    }
  };
  // handle plus btn
  const handlePlus = () => {
    let newQty = parseInt(quantity) + 1;
    setQuantity(newQty);
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
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
              <h3 className="product-title">{item_name}</h3>
              <p className="product-price">₱{item_price}</p>
              <p className="product-stock-status">
                {item_status === "A" ? "In stock" : "Out of Stock"}
              </p>
              {/* form */}
              <form className="single-product-form mt-5">
                <div className="product-form-container d-flex justify-content-between">
                  {/* Size */}
                  <div className="form-floating w-25">
                    <select
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      className="form-select form-select-sm w-100"
                      id="floatingSelectSize"
                      name="size"
                      required
                    >
                      <option>Select Size</option>
                      {size_name.map((size, index) => (
                        <option key={index} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                    <label htmlFor="floatingSelectSize">Size</label>
                  </div>

                  {/* variation */}
                  <div className="form-floating w-25">
                    <select
                      value={selectedVariant}
                      onChange={(e) => setSelectedVariant(e.target.value)}
                      className="form-select form-select-sm w-100"
                      id="floatingSelectVar"
                      name="variant"
                      required
                    >
                      <option>Select Variation</option>
                      {variation_name.map((variation, index) => (
                        <option key={index} value={variation}>
                          {variation}
                        </option>
                      ))}
                    </select>
                    <label htmlFor="floatingSelectVar">Variation</label>
                  </div>

                  {/* quantity */}
                  <div className="d-flex align-items-center w-25">
                    <span
                      className="qty-btn fw-medium"
                      onClick={() => handleMinus()}
                    >
                      -
                    </span>
                    <div className="form-floating w-50 mx-1">
                      <input
                        type="number"
                        className="form-control text-center  w-100"
                        name="quantity"
                        min="1"
                        id="quantity"
                        value={quantity}
                        onChange={(e) => {
                          setQuantity(e.target.value);
                        }}
                      />
                      <label htmlFor="quantity">Qty</label>
                    </div>
                    <span
                      className="qty-btn fw-medium"
                      onClick={() => handlePlus()}
                    >
                      +
                    </span>
                  </div>
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
      )}
    </>
  );
};

export default SingleProduct;
