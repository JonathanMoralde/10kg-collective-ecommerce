import React from "react";
import about from "../images/about/about.jpg";

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
            <div className="about-img-container w-75 h-75 ms-auto">
              <img src={about} className="img-fluid" alt="10KG Co" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
