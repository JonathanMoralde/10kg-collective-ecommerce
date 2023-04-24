import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ProductEdit = () => {
  const { id, name, price } = useParams();
  const navigate = useNavigate();

  const [e_name, setE_Name] = useState(name);
  const [e_price, setE_Price] = useState(price);
  const [category, setCategory] = useState();
  const [size, setSize] = useState([]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSizeChange = (e) => {
    if (e.target.checked) {
      setSize([...size, e.target.value]);
    } else {
      setSize(size.filter((s) => s !== e.target.value));
    }
  };

  // DYNAMIC VARIATION FIELDS
  const [inputFields, setInputFields] = useState([""]);

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    values[index] = event.target.value;
    setInputFields(values);
  };

  const handleAddFields = () => {
    setInputFields([...inputFields, ""]);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  // NEXT & BACK FORM HANDLE
  const [isNext, setIsNext] = useState(false);

  // handle EDIT
  const editProduct = () => {
    // e.preventDefault();

    let productData = new FormData();

    productData.append("item_id", id); //this will be used for SQL query
    productData.append("item_name", e_name); //update
    productData.append("item_price", e_price); //update
    productData.append("item_category", category); //update
    productData.append("size_name[]", JSON.stringify(size)); //update
    productData.append("variation_name[]", JSON.stringify(inputFields)); //update

    const url = "http://localhost/10kg-collective/admin/edit_product.php";

    // console.log(name, price);

    if (name && price && category && size && inputFields) {
      axios
        .post(url, productData)
        .then((response) => {
          if (response.data === 1) {
            toast.success("Product updated successfully!", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            navigate("/admin/Products");
          } else {
            toast.error("Failed to update product", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        })
        .catch((error) => {
          toast.success("Maintenance Mode", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    }
  };

  return (
    <>
      <div className="container-fluid form-section-background">
        <div className="container-md form-section-container w-50 py-5 shadow bg-white">
          <div className="row form-parent overflow-hidden">
            <div
              className={`col-md-12 d-flex flex-column align-items-center item-info-form ${
                isNext ? "next-toggled" : ""
              }`}
            >
              {/* ADD NEW */}
              <form className="w-75">
                {/* ACTION */}
                <h3 className="section-title mb-4 text-center">Item Details</h3>

                <div className="name-price-form-container d-flex justify-content-between">
                  {/* Name */}
                  <div className="form-floating mb-4 item-name-form">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingprod"
                      placeholder="name@example.com"
                      required
                      value={e_name}
                      onChange={(e) => setE_Name(e.target.value)}
                      name="item_name"
                    />
                    <label htmlFor="floatingprod">Product Name</label>
                  </div>

                  {/* Price */}
                  <div className="form-floating mb-4 item-price-form">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingPrice"
                      placeholder="999"
                      min="1"
                      required
                      value={e_price}
                      onChange={(e) => setE_Price(e.target.value)}
                      name="item_price"
                    />
                    <label htmlFor="floatingPrice">Price</label>
                  </div>
                </div>

                {/* Category */}
                <h5 className="input-label">Category</h5>
                <div className="d-flex mb-4">
                  <div className="form-check me-5">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      value={1}
                      onChange={(e) => handleCategoryChange(e)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault1"
                    >
                      Tees
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                      value={2}
                      onChange={(e) => handleCategoryChange(e)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault2"
                    >
                      Shorts
                    </label>
                  </div>
                </div>

                {/* Size */}
                <h5 className="input-label">Size</h5>
                <div className="mb-4 d-flex justify-content-between">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="Small"
                      id="flexCheckDefault"
                      onChange={(e) => handleSizeChange(e)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      Small
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="Medium"
                      id="flexCheckChecked"
                      onChange={(e) => handleSizeChange(e)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckChecked"
                    >
                      Medium
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="Large"
                      id="flexCheckChecked"
                      onChange={(e) => handleSizeChange(e)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckChecked"
                    >
                      Large
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="Extra Large"
                      id="flexCheckChecked"
                      onChange={(e) => handleSizeChange(e)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckChecked"
                    >
                      Extra Large
                    </label>
                  </div>
                </div>

                {/* <div className="item-images-form-container d-flex justify-content-between">
                
                <div className="mb-4 item-thumbnail-form">
                  <label className="form-label" for="customFile">Upload Product Thumbnail</label>
                  <input type="file" className="form-control" id="customFile" />
                </div>

                
                <div className="mb-4 item-preview-form">
                  <label for="formFileMultiple" className="form-label">Upload Product showcase images</label>
                  <input className="form-control" type="file" id="formFileMultiple" multiple />
                </div>
                </div> */}

                <div className="d-flex justify-content-center">
                  <Link to="/admin/products" className="btn btn-secondary me-3">
                    Cancel
                  </Link>

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      if (e_name && e_price && category && size) {
                        setIsNext(!isNext);
                      } else {
                        toast.warn("Please fill out important details!", {
                          position: "top-center",
                          autoClose: 2000,
                          hideProgressBar: true,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "light",
                        });
                      }
                    }}
                  >
                    Next
                  </button>
                </div>
              </form>
            </div>

            {/* sliding form - variations form */}
            <div
              className={`col-md-12 d-flex flex-column align-items-center justify-content-between variations-form bg-white ${
                isNext && e_name && e_price && category && size
                  ? "next-toggle"
                  : ""
              }`}
            >
              <h3 className="section-title mb-4">Item Variations</h3>

              <div className="dynamic-var w-75">
                <div className="d-flex justify-content-center w-100 flex-wrap">
                  {inputFields.map((inputField, index) => (
                    <div className="mb-4 d-flex w-50" key={index}>
                      <div className="form-floating ">
                        <input
                          id={`floatingVariation${index}`}
                          className="form-control var-input"
                          type="text"
                          placeholder="Enter text"
                          value={inputField.value}
                          onChange={(event) => handleInputChange(index, event)}
                        />
                        <label htmlFor={`floatingVariation${index}`}>
                          Enter a variation
                        </label>
                      </div>

                      <button
                        className="btn btn-secondary var-input-del"
                        type="button"
                        onClick={() => handleRemoveFields(index)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="d-flex justify-content-center align-items-center ">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => handleAddFields()}
                  >
                    Add More
                  </button>
                </div>
              </div>

              {/* btns */}
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-secondary me-4"
                  onClick={() => setIsNext(!isNext)}
                >
                  Back
                </button>
                {/* Submit btn */}
                <button
                  type="submit"
                  className="btn btn-secondary"
                  onClick={() => editProduct()}
                  name="submit"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductEdit;