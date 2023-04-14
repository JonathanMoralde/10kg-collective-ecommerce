import React from "react";
import sizeguide from "../../images/footer/size guide 2.jpg";

const SizeGuide = () => {
  return (
    <>
      <div className="container-md py-5">
        <h3 className="section-title text-center mb-3">Size Guide</h3>
        <div className="sizeguide-img-container w-50 mx-auto">
          <img src={sizeguide} alt="size chart" className="img-fluid" />
        </div>
      </div>
    </>
  );
};

export default SizeGuide;
