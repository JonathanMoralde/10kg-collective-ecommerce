import React, { useEffect, useState } from "react";
import Searchbar from "../components/Searchbar";
import ShowProducts from "../components/ShowProducts";
import ProductSkeleton from "../components/ProductSkeleton";
import axios from "axios";

const Shop = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;
  const [clickedFilter, setClickedFilter] = useState("All Item");
  // let clickedFilter = "All Items";

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);

      //  const response = await fetch("https://fakestoreapi.com/products"); //change this URL to the PHP MYSQL backend API endpoint

      //  if (componentMounted) {
      //    setData(await response.clone().json());
      //    setFilter(await response.json());
      //    setLoading(false);
      //  }

      const response = await axios.get(
        "https:/localhost/10kg-collective/displayModule/display.php"
      );

      // Get the itemlist object from the response
      const itemlist = await response.data;

      if (componentMounted) {
        setData(itemlist);
        setFilter(itemlist);
        setLoading(false);
      }

      return () => {
        componentMounted = false;
      };
    };

    getProducts();
  }, []);

  const filterProduct = (cat) => {
    const filteredList = data.filter(
      (product) => product.item_category === cat
    );

    setFilter(filteredList);
  };

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
              <button
                className="menu-btn"
                onClick={(e) => {
                  setFilter(data);
                  setClickedFilter(e.currentTarget.textContent);
                }}
              >
                All Item
              </button>
              {/* <button
                className="menu-btn"
                // onClick={() => filterProduct("men's clothing")}
                onClick={() => filterProduct("Newest Release")}
              >
                Newest Release
              </button> */}
              <button
                className="menu-btn"
                // onClick={() => filterProduct("women's clothing")}
                onClick={(e) => {
                  filterProduct(1);
                  setClickedFilter(e.currentTarget.textContent);
                }}
              >
                Tees
              </button>
              <button
                className="menu-btn"
                // onClick={() => filterProduct("jewelery")}
                onClick={(e) => {
                  filterProduct(2);
                  setClickedFilter(e.currentTarget.textContent);
                }}
              >
                Shorts
              </button>
            </div>
          </div>
          <div className="col-md-9 ps-5">
            <div className="d-flex justify-content-between">
              <h3 className="section-title">{clickedFilter}</h3>
              <div className="btn-group dropdown-fix">
                <button
                  className="btn dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Newest
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <button className="dropdown-item">Oldest</button>
                  </li>
                  <li>
                    <button className="dropdown-item">Highest Price</button>
                  </li>
                  <li>
                    <button className="dropdown-item">Lowest Price</button>
                  </li>
                </ul>
              </div>
            </div>

            <div className="container-fluid">
              <div className="row item-card-container mt-3 d-flex align-items-centert">
                {loading ? (
                  <ProductSkeleton />
                ) : (
                  <ShowProducts filter={filter} />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Shop;
