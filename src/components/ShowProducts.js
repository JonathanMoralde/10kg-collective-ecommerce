import React from "react";

const ShowProducts = ({ filter }) => {
  return (
    <>
      {filter.map((product) => {
        return (
          <div className="col-md-3" key={product.id}>
            <div className="card mb-3">
              <img
                src={product.image}
                className="card-img-top"
                alt="product-img"
                height="234px"
              />
              <div className="card-body">
                <h5 className="card-title">{product.title.substring(0, 12)}</h5>
                <p className="card-text">{product.price}</p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ShowProducts;
