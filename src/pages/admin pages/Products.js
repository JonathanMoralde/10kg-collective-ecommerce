import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Products = ({ adminUser }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

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

  // Product delete
  const handleDel = (item_id) => {
    let delData = new FormData();
    delData.append("item_id", item_id); //will send item_id to backend for deleting

    axios
      .post("https:/localhost/10kg-collective/admin/delete.php", delData) //update item status
      .then((response) => {
        if (response.data === 1) {
          alert("Product deleted successfully");
        } else {
          alert("Product delete failed");
        }
      })
      .catch((error) => alert(error.data, "Maintenance Mode"));
  };

  return (
    <>
      <div className="container-fluid container-fix">
        <div className="d-flex justify-content-between align-items-center py-5">
          <h3 className="section-title">Products</h3>
          <Link
            className="btn btn-secondary"
            to="/admin/product-form"
            role="button"
          >
            Add New
          </Link>
        </div>
        <div className="row">
          {data.map((product) => {
            return (
              <div className="col-md-3 mb-2" key={product.item_id}>
                <div className="card mb-3">
                  <img
                    src={product.item_image}
                    className="card-img-top"
                    alt="product-img"
                    height="234px"
                  />
                  <div className="card-body">
                    <h5 className="card-title text-black">
                      {product.item_name}
                    </h5>
                    <p className="card-text">{product.item_price}</p>
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
