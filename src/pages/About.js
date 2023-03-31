import React from "react";

const About = () => {
  return (
    <>
      <div className="container-fluid container-fix about-page my-5">
        <h3 className="section-title">About Us</h3>
        <div className="row">
          <div className="col-md-6 mt-5">
            <p className="about-text">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Dignissimos molestiae itaque id facilis iusto adipisci
              necessitatibus nobis qui enim asperiores?
            </p>
            <p className="about-text">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Dignissimos molestiae itaque id facilis iusto adipisci
              necessitatibus nobis qui enim asperiores?
            </p>
          </div>
          <div className="col-md-6">
            <div className="about-img-container">
              <img src="/" alt="..." />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
