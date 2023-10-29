import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Products = ({ adminUser }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  let componentMounted = true;
  const [loading, setLoading] = useState(false);

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

  // Product delete
  const handleDel = (item_id) => {
    let delData = new FormData();
    delData.append("item_id", item_id); //will send item_id to backend for deleting

    axios
      .post(
        "https://10kgcollective.000webhostapp.com/admin/delete_product_handle.php",
        delData
      ) //update item status
      .then((response) => {
        if (response.data === 1) {
          toast.success("Product deleted successfully!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.error("Unable to delete product", {
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
      .catch((error) =>
        toast.error("Error occured while deleting the product", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      );
  };

  // NEW CATEGORY HANDLE
  const [category, setCategory] = useState("");
  const handleCatSubmit = (e) => {
    e.preventDefault();

    if (category) {
      let catData = new FormData();
      catData.append("category_name", category);

      axios
        .post(
          "https://10kgcollective.000webhostapp.com/admin/insert_category.php",
          catData
        )
        .then((response) => {
          if (response.data === 1) {
            toast.success("Successfully added new category!");
            setCategory("");
          } else {
            toast.warn("Could not add category");
          }
        });
    }
  };

  return (
    <>
      <div className="container-fluid container-fix">
        <div className="d-flex justify-content-between align-items-center py-5">
          <h3 className="section-title">Products</h3>
          <div className="d-flex">
            {/* <!-- Button trigger modal --> */}
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-toggle="modal"
              data-bs-target="#categoryModal"
            >
              Add New Category
            </button>

            {/* <!-- Modal --> */}
            <div
              class="modal fade"
              id="categoryModal"
              tabindex="-1"
              aria-labelledby="categoryModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="categoryModalLabel">
                      Add New Category
                    </h1>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <form
                      className="w-50 mx-auto mt-3"
                      onSubmit={(e) => handleCatSubmit(e)}
                    >
                      <div class="form-floating mb-3">
                        <input
                          type="text"
                          class="form-control"
                          id="floatingInputCat"
                          placeholder="Category Name"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        />
                        <label for="floatingInputCat">Category Name</label>
                      </div>
                      <div className="mb-3 d-flex justify-content-center">
                        <button
                          type="button"
                          className="btn btn-secondary me-3"
                          data-bs-dismiss="modal"
                          onClick={() => setCategory("")}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <Link
              className="btn btn-secondary ms-3"
              to="/admin/product-form"
              role="button"
            >
              Add New
            </Link>
          </div>
        </div>
        <div className="row">
          {data.map((product) => {
            console.log(product.image_src);
            return (
              <div className="col-md-3 mb-2" key={product.item_id}>
                <div className="card mb-3">
                  <img
                    src={`${product.image_src}`}
                    className="card-img-top"
                    alt="product-img"
                    height="234px"
                  />
                  <div className="card-body">
                    <h5 className="card-title text-black">
                      {product.item_name}
                    </h5>
                    <p className="card-text">{product.item_price}</p>
                    {product.item_status === "I" ? (
                      <h5 className="text-danger-emphasis">Phased Out</h5>
                    ) : (
                      <div className="d-flex justify-content-between align-items-center">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => {
                            navigate(
                              `/admin/edit-product/${product.item_id}/${product.item_name}/${product.item_price}`
                            );
                          }}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => {
                            handleDel(product.item_id);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Products;
