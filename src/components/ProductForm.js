import React from "react";
import { useState } from "react";

const ProductForm = () => {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [size, setSize] = useState();
  const [variant, setVariant] = useState();

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
                <h3 className="section-title mb-5">Add Item</h3>

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
                    name="item_name"
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
                    name="item_price"
                  />
                  <label htmlFor="floatingPrice">Price</label>
                </div>

                {/* Category */}
                <div className="form-floating mb-4">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingCategory"
                    placeholder="Category"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    name="item_category"
                  />
                  <label htmlFor="floatingCategory">Category</label>
                </div>

                {/* Size */}
                <div className="form-floating mb-4">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingSize"
                    placeholder="Size"
                    required
                    value={category}
                    onChange={(e) => setSize(e.target.value)}
                    name="sizes"
                  />
                  <label htmlFor="floatingSize">Size</label>
                </div>

                {/* Variation */}
                <div className="form-floating mb-4">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingVariant"
                    placeholder="Size"
                    required
                    value={category}
                    onChange={(e) => setVariant(e.target.value)}
                    name="variants"
                  />
                  <label htmlFor="floatingVariant">Variation</label>
                </div>

                {/* Submit btn */}
                <button
                  type="submit"
                  className="btn btn-secondary"
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
