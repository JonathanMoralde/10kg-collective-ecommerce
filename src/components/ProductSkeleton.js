import React from "react";
import Skeleton from "react-loading-skeleton";

const ProductSkeleton = () => {
  return (
    <>
      <div className="col-md-3 mx-auto">
        <Skeleton height={328} />
      </div>
      <div className="col-md-3 mx-auto">
        <Skeleton height={328} />
      </div>
      <div className="col-md-3 mx-auto">
        <Skeleton height={328} />
      </div>
      <div className="col-md-3 mx-auto">
        <Skeleton height={328} />
      </div>
      <div className="col-md-3 mx-auto">
        <Skeleton height={328} />
      </div>
      <div className="col-md-3 mx-auto">
        <Skeleton height={328} />
      </div>
      <div className="col-md-3 mx-auto">
        <Skeleton height={328} />
      </div>
      <div className="col-md-3 mx-auto">
        <Skeleton height={328} />
      </div>
    </>
  );
};

export default ProductSkeleton;
