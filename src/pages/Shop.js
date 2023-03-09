import React, { useEffect, useState } from "react";
import Searchbar from "../components/Searchbar";
import ShowProducts from "../components/ShowProducts";
import ProductSkeleton from "../components/ProductSkeleton";
import Skeleton from "react-loading-skeleton";

const Shop = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);

      const response = await fetch("https://fakestoreapi.com/products");

      if (componentMounted) {
        setData(await response.clone().json());
        setFilter(await response.json());
        setLoading(false);
      }

      return () => {
        componentMounted = false;
      };
    };

    getProducts();
  }, []);

  const filterProduct = (cat) => {
    const filteredList = data.filter((product) => product.category === cat);
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
              <button className="menu-btn" onClick={() => setFilter(data)}>
                All Item
              </button>
              <button
                className="menu-btn"
                onClick={() => filterProduct("men's clothing")}
              >
                Newest Release
              </button>
              <button
                className="menu-btn"
                onClick={() => filterProduct("women's clothing")}
              >
                Tees
              </button>
              <button
                className="menu-btn"
                onClick={() => filterProduct("jewelery")}
              >
                Shorts
              </button>
            </div>
          </div>
          <div className="col-md-9 ps-5">
            <div className="d-flex justify-content-between">
              <h3 className="section-title">All Items</h3>
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
              <div className="row item-card-container mt-3 d-flex justify-content-between">
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
