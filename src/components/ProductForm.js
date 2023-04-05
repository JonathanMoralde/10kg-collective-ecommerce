import React from "react";
import { useState } from "react";
import axios from 'axios'

const ProductForm = () => {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [size, setSize] = useState();
  const [variant, setVariant] = useState();

  const addProduct = (e) => {
    e.target.preventDefault();

    let productData = new FormData()

    productData.append("item_name", name) //insert
    productData.append("item_price", price) //insert
    productData.append("item_category", category) //check matching category name, set number
    productData.append("size_name", size) //insert new row to table with item's item_id as foreign
    productData.append("variation_name", variant) //insert new row to table with item's item_id as foreign

    const url = "http://localhost/10kg-collective/admin/add_product.php"

    if(name && price && category && size && variant){
      axios.post(url, productData)
      .then((response)=>{
        alert(response.data)
      })
      .catch((error)=>{
        alert(error.data)
      })
    }


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
                
                <div>
                <label class="form-label" for="customFile">Default file input example</label>
<input type="file" class="form-control" id="customFile" />
                </div>

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
                    value={size}
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
                    value={variant}
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
