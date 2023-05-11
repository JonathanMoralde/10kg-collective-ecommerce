import React from "react";
import { useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProductForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [size, setSize] = useState([]);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [showcaseFiles, setShowcaseFiles] = useState([]);

  // CATEGORY  HANDLE VALUE
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  // SIZE HANDLE VALUE
  const handleSizeChange = (e) => {
    if (e.target.checked) {
      setSize([...size, e.target.value]);
    } else {
      setSize(size.filter((s) => s !== e.target.value));
    }
  };

  // IMAGE HANDLE VALUE
  const handleThumbnailFileChange = (e) => {
    const file = e.target.files[0];
    if (file && validateFileExtension(file.name)) {
      setThumbnailFile(file);
      // Valid file extension
      // Perform further actions or validations here
    } else {
      // Invalid file extension
      toast.warning("Invalid file extension");
      e.target.value = null;
    }
  };

  const handleShowcaseFilesChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => validateFileExtension(file.name));
    if (validFiles.length === files.length) {
      setShowcaseFiles(files);
      // All files have valid extensions
      // Perform further actions or validations here
    } else {
      // Some files have invalid extensions
      toast.warning("Invalid file extension");
      e.target.value = null; // Clear the input form
    }
  };

  const validateFileExtension = (fileName) => {
    const allowedExtensions = [".jpg", ".jpeg", ".png"];
    const extension = fileName
      .substring(fileName.lastIndexOf("."))
      .toLowerCase();
    return allowedExtensions.includes(extension);
  };

  // DYNAMIC VARIATION FIELDS
  // const [inputFields, setInputFields] = useState([{ value: "" }]);
  const [inputFields, setInputFields] = useState([""]);

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    // values[index].value = event.target.value;
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

  // SUBMIT HANDLE
  const addProduct = () => {
    // e.preventDefault();
    // console.log(size);
    // console.log(inputFields);

    let productData = new FormData();

    productData.append("item_name", name);
    productData.append("item_price", price);
    productData.append("item_category", category);
    productData.append("size_name[]", JSON.stringify(size));
    // productData.append("size_name[]", size);
    productData.append("variation_name[]", JSON.stringify(inputFields));
    // productData.append("variation_name[]", inputFields);
    productData.append("thumbnail", thumbnailFile);
    showcaseFiles.forEach((file) => {
      productData.append("showcase[]", file);
    });

    // // Insert size names
    // size.forEach((sizeName) => {
    //   productData.append("size_name[]", sizeName);
    // });

    // // Insert variation names
    // inputFields.forEach((variation) => {
    //   productData.append("variation_name[]", variation.value);
    // });

    const url = "http://localhost/10kg-collective/admin/add_product.php";

    if (
      name &&
      price &&
      category &&
      size &&
      inputFields &&
      thumbnailFile &&
      showcaseFiles
    ) {
      axios
        .post(url, productData)
        .then((response) => {
          if (response.data === 1) {
            toast.success("Product was added successfully", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            // if(response.data){

            // alert(response.data)
            navigate("/admin/Products");
          } else {
            toast.error("Product was not added", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            console.log(response.data);
          }
        })
        .catch((error) => {
          toast.error("Maintenance Mode", {
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

  console.log(thumbnailFile);
  console.log(showcaseFiles);
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
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
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

                {/* IMAGES */}
                <div className="item-images-form-container d-flex justify-content-between">
                  <div className="mb-4 item-thumbnail-form">
                    <label className="form-label" for="customFile">
                      Upload Product Thumbnail
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="customFile"
                      onChange={(e) => handleThumbnailFileChange(e)}
                    />
                  </div>

                  <div className="mb-4 item-preview-form">
                    <label for="formFileMultiple" className="form-label">
                      Upload showcase images
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      id="formFileMultiple"
                      multiple
                      onChange={(e) => handleShowcaseFilesChange(e)}
                    />
                  </div>
                </div>

                {/* BTNS */}
                <div className="d-flex justify-content-center">
                  <Link to="/admin/products" className="btn btn-secondary me-3">
                    Cancel
                  </Link>

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      if (
                        name &&
                        price &&
                        category &&
                        size &&
                        thumbnailFile &&
                        showcaseFiles
                      ) {
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
                isNext && name && price ? "next-toggle" : ""
              }`}
            >
              <h3 className="section-title mb-4">Item Variations</h3>

              <div className="dynamic-var w-75">
                <div className="d-flex justify-content-center w-100 flex-wrap">
                  {inputFields.map((inputField, index) => (
                    <div className="mb-4 d-flex w-50" key={index}>
                      <div className="form-floating">
                        <input
                          id={`floatingVariation${index}`}
                          className="form-control var-input"
                          type="text"
                          placeholder="Enter text"
                          value={inputField}
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
                <div className="d-flex justify-content-center align-items-center">
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
                  onClick={() => addProduct()}
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

export default ProductForm;
