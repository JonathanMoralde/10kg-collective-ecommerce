import React from "react";

const ShowProducts = ({ filter }) => {
  return (
    <>
      {filter.map((product) => {
        return (
          <div className="col-md-3" key={product.item_id}>
            <div className="card mb-3">
              <img
                src={product.item_image}
                className="card-img-top"
                alt="product-img"
                height="234px"
              />
              <div className="card-body">
                <h5 className="card-title">{product.item_name}</h5>
                <p className="card-text">{product.item_price}</p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ShowProducts;
