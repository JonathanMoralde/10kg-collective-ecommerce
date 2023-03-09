import React from "react";
import Searchbar from "../components/Searchbar";

const Shop = () => {
  return (
    <>
      <main className="container-fluid container-fix shop-section">
        <div className="shop-search-bar row">
          <div className="col-md-3">
            <Searchbar />
          </div>
        </div>
        <div className="categories row mt-3">
          <div className="col-md-3">
            <h3 className="section-title">Categories</h3>
            <div className="category-btns d-flex flex-column align-items-start justify-content-between mt-3">
              <button className="menu-btn">All Item</button>
              <button className="menu-btn">Newest Release</button>
              <button className="menu-btn">Tees</button>
              <button className="menu-btn">Shorts</button>
            </div>
          </div>
          <div className="col-md-9">
            <div className="d-flex justify-content-between">
              <h3 className="section-title">All Items</h3>
              <div className="btn-group dropdown-fix">
                <button
                  className="btn dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <button className="dropdown-item">Menu item</button>
                  </li>
                  <li>
                    <button className="dropdown-item">Menu item</button>
                  </li>
                  <li>
                    <button className="dropdown-item">Menu item</button>
                  </li>
                </ul>
              </div>
            </div>

            <div className="item-card-container mt-3"></div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Shop;
