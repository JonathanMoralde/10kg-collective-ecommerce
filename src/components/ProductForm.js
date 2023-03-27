import React from "react";
import { useState } from "react";

const ProductForm = () => {
  const [name, setName] = useState([]);
  const [price, setPrice] = useState();

  const addProduct = (e) => {
    e.target.preventDefault();
  };
  return (
    <>
      <div className="container-fluid form-section-background">
        <div className="container-md form-section-container">
          <div className="row">
            <div className="col-md-6">
              {/* ADD NEW */}
              <form>
                {/* ACTION */}
                <h3 className="section-title mb-5">Sign In</h3>

                {/* Name */}
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingprod"
                    placeholder="name@example.com"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    name="product_name"
                  />
                  <label htmlFor="floatingprod">Product Name</label>
                </div>

                {/* Price */}
                <div className="form-floating mb-4">
                  <input
                    type="number"
                    className="form-control"
                    id="floatingPrice"
                    placeholder="999"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    name="product_price"
                  />
                  <label htmlFor="floatingPrice">Price</label>
                </div>

                {/* Submit btn */}
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={(e) => addProduct(e)}
                  name="submit"
                >
                  Sign In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductForm;
