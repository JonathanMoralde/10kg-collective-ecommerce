import React from "react";
import title from "../images/hero/plain series (2).png";
import { Link } from "react-router-dom";
import video from "../images/hero/advert.mp4";
import poster1 from "../images/hero/1.png";
import poster2 from "../images/hero/2.png";
import poster3 from "../images/hero/3.png";
import ttpPoster from "../images/Posters/TTP.jpg";
import weightlessClone from "../images/Posters/WeightlessClone.jpg";
import { FaShapes, FaTshirt, FaShippingFast } from "react-icons/fa";

const Home = () => {
  return (
    <>
      <main className="container-fluid hero-background-img d-flex align-items-center justify-content-center">
        <div className="row hero-container shadow">
          <div className="hero-text d-grid col-lg-5">
            <div className="hero-text-container ">
              <p>Introducing our newest release</p>
              <img src={title} alt="Title" className="hero-title mt-3" />
              <p className="hero-sub-title mt-3">
                Simplicity is the ultimate sophistication
              </p>
              <Link to="/Shop" className="btn btn-secondary">
                SHOP NOW
              </Link>
            </div>
          </div>
          {/* VIDEO / CAROUSEL */}
          <div className="hero-carousel d-grid col-lg-7">
            <div id="carouselExampleIndicators" className="carousel slide">
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="0"
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="1"
                  aria-label="Slide 2"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="2"
                  aria-label="Slide 3"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="3"
                  aria-label="Slide 4"
                ></button>
              </div>
              <div className="carousel-inner">
                <div className="carousel-item carousel-image video-carousel active">
                  <video
                    src={video}
                    width="100%"
                    height="100%"
                    loop
                    autoPlay="autoplay"
                    playsInline
                    muted
                  ></video>
                </div>
                <div className="carousel-item carousel-image bg-img-1 ">
                  <img
                    src={poster1}
                    className="object-fit-md-cover w-100 h-100"
                    alt="first poster"
                  />
                </div>
                <div className="carousel-item carousel-image bg-img-2">
                  <img
                    src={poster2}
                    className="object-fit-md-cover w-100 h-100"
                    alt="second poster"
                  />
                </div>
                <div className="carousel-item carousel-image bg-img-3">
                  <img
                    src={poster3}
                    className="object-fit-md-cover w-100 h-100"
                    alt="third poster"
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      <section className="container-fluid collection-section container-fix">
        <h3 className="section-title ">All Collections</h3>
        <div className="collection-container">
          <div className="row ">
            <div className="col-lg-8">
              <div className="card text-bg-dark main-card mt-md-3 ">
                <img src={poster1} className="card-img" alt="Plain Series" />
                <div className="card-img-overlay">
                  <h5 className="card-title">Plain Series</h5>
                  <Link to="/Shop" className="btn btn-secondary">
                    SHOP NOW
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card text-bg-dark side-card mt-md-3 ">
                <img
                  src={weightlessClone}
                  className="card-img"
                  alt="Plain Series"
                />
                <div className="card-img-overlay">
                  <h5 className="card-title">Weightless</h5>
                  <Link to="/Shop" className="btn btn-secondary">
                    SHOP NOW
                  </Link>
                </div>
              </div>
              <div className="card text-bg-dark side-card mt-md-3 ">
                <img src={ttpPoster} className="card-img" alt="Plain Series" />
                <div className="card-img-overlay">
                  <h5 className="card-title">Trust the Process</h5>
                  <Link to="/Shop" className="btn btn-secondary">
                    SHOP NOW
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container quality-section container-fix">
        <div className="row">
          <div className="col-lg-4">
            <FaShapes size="6.25rem" className="icon-color" />
            <h5 className="quality-title mt-4">Inclusive Sizing</h5>
            <p className="quality-text mt-2">
              Offering sizes that range from XS to XL
            </p>
          </div>
          <div className="col-lg-4">
            <FaTshirt size="6.25rem" className="icon-color" />
            <h5 className="quality-title mt-4">Quality Material</h5>
            <p className="quality-text mt-2">
              Each garment is made of 100% cotton
            </p>
          </div>
          <div className="col-lg-4">
            <FaShippingFast size="6.25rem" className="icon-color" />
            <h5 className="quality-title mt-4">Free Shipping</h5>
            <p className="quality-text mt-2">
              We provide free shipping in Polangui Area
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
