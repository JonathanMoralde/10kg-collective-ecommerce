import React from "react";
import { Link } from "react-router-dom";
import whiteLogo from "../images/logo/10KG WHITE trimmed.png";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className="container-fluid container-fix bg-secondary footer-section">
        <Link className="footer-brand mb-4" to="/">
          <img src={whiteLogo} height="30" alt="" />
        </Link>
        <div className="row d-flex justify-content-between">
          <div className="col-md-5 d-flex justify-content-between">
            <Link to="/Privacy" className="text-light footer-links">
              Privacy Policy
            </Link>

            <Link to="/SizeGuide" className="text-light footer-links">
              Size Guide
            </Link>

            <Link to="/Faqs" className="text-light footer-links">
              FAQs
            </Link>

            <Link to="/Returns" className="text-light footer-links">
              Returns
            </Link>
          </div>
          <div className="col-md-2 text-end">
            <Link to="https://www.facebook.com/10KG.Co" className="me-3">
              <FaFacebook className="text-light footer-icons" />
            </Link>
            <Link
              to="https://www.instagram.com/10kg_collective/"
              className="me-3"
            >
              <FaInstagram className="text-light footer-icons" />
            </Link>
            <Link to="/">
              <FaTiktok className="text-light footer-icons" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
