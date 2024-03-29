import React from "react";
import { Link } from "react-router-dom";

const ShowProducts = ({ filter, user }) => {
  return (
    <>
      {filter.map((product) => {
        return (
          <div className="col-md-3 me-2" key={product.item_id}>
            <Link
              to={
                user
                  ? `/Shop/${product.item_id}`
                  : `/User?redirect=/Shop/${product.item_id}`
              }
              className="card mb-3"
            >
              <img
                src={product.image_src}
                className="card-img-top"
                alt="product-img"
                height="234px"
              />
              <div className="card-body">
                <h5 className="card-title text-black">{product.item_name}</h5>
                <p className="card-text">{product.item_price}</p>
              </div>
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default ShowProducts;
