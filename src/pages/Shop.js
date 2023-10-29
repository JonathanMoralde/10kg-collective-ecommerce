import React, { useEffect, useState, useContext } from "react";
import Searchbar from "../components/Searchbar";
import ShowProducts from "../components/ShowProducts";
import ProductSkeleton from "../components/ProductSkeleton";
import axios from "axios";
// import AppContext from "../AppContext";

const Shop = ({ user }) => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;
  const [clickedFilter, setClickedFilter] = useState("All Item");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [clickedSort, setClickedSort] = useState("Newest");

  const [catDisplay, setCatDisplay] = useState([]);

  // get products from db
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);

      const response = await axios.get(
        "https://10kgcollective.000webhostapp.com/displayModule/display_shop.php" //php file
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

  useEffect(() => {
    const getCat = async () => {
      let response = await axios.get(
        "https://10kgcollective.000webhostapp.com/displayModule/display_category.php"
      );
      if (componentMounted) {
        setCatDisplay(response.data);
      }
    };

    getCat();
  }, []);

  // category btns
  const filterProduct = (cat) => {
    const filteredList = data.filter(
      (product) => product.item_category === cat
    );

    setFilter(filteredList);
  };

  // searchbar
  useEffect(() => {
    const filteredList = data.filter((product) =>
      product.item_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // setFilter(filteredList); //automatically show results
    setSearchResult(filteredList); //show results only if btn clicked
  }, [searchQuery, data]);

  // Sort Drop down
  const handleSort = (e) => {
    if (e.target.textContent === "Newest") {
      const sortedData = filter.sort(
        (a, b) => new Date(b.date_added) - new Date(a.date_added)
      );
      setFilter(sortedData);
    } else if (e.target.textContent === "Oldest") {
      const sortedData = filter.sort(
        (a, b) => new Date(a.date_added) - new Date(b.date_added)
      );
      setFilter(sortedData);
    } else if (e.target.textContent === "Highest Price") {
      const sortedData = filter.sort(
        (a, b) => new Date(b.item_price) - new Date(a.item_price)
      );
      setFilter(sortedData);
    } else {
      const sortedData = filter.sort(
        (a, b) => new Date(a.item_price) - new Date(b.item_price)
      );
      setFilter(sortedData);
    }
  };

  console.log(catDisplay);
  return (
    <>
      <main className="container-fluid container-fix shop-section">
        <div className="shop-search-bar row">
          <div className="col-md-3">
            <Searchbar
              setSearchQuery={setSearchQuery}
              searchQuery={searchQuery}
              setFilter={setFilter}
              searchResult={searchResult}
              setClickedFilter={setClickedFilter}
            />
          </div>
        </div>
        <div className="categories row mt-3">
          <div className="col-md-3">
            <h3 className="section-title">Categories</h3>
            <div className="category-btns d-flex flex-column align-items-start justify-content-between mt-3">
              <button
                className={`menu-btn ${
                  clickedFilter === "All Item" ? "active-cat" : ""
                }`}
                onClick={(e) => {
                  setFilter(data);
                  setClickedFilter(e.currentTarget.textContent);
                }}
              >
                All Item
              </button>

              {catDisplay.map((c) => {
                return (
                  <button
                    className={`menu-btn ${
                      clickedFilter === c.category_name ? "active-cat" : ""
                    }`}
                    onClick={(e) => {
                      filterProduct(c.category_id);
                      setClickedFilter(e.currentTarget.textContent);
                    }}
                    key={c.category_id}
                  >
                    {c.category_name}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="col-md-9 ps-5">
            <div className="d-flex justify-content-between">
              <h3 className="section-title text-capitalize">{clickedFilter}</h3>
              <div className="btn-group dropdown-fix">
                <button
                  className="btn hover-fix dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {clickedSort}
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <button
                      className={`dropdown-item`}
                      onClick={(e) => {
                        setClickedSort(e.target.textContent);
                        handleSort(e);
                      }}
                    >
                      Newest
                    </button>
                  </li>
                  <li>
                    <button
                      className={`dropdown-item`}
                      onClick={(e) => {
                        setClickedSort(e.target.textContent);
                        handleSort(e);
                      }}
                    >
                      Oldest
                    </button>
                  </li>
                  <li>
                    <button
                      className={`dropdown-item`}
                      onClick={(e) => {
                        setClickedSort(e.target.textContent);
                        handleSort(e);
                      }}
                    >
                      Highest Price
                    </button>
                  </li>
                  <li>
                    <button
                      className={`dropdown-item`}
                      onClick={(e) => {
                        setClickedSort(e.target.textContent);
                        handleSort(e);
                      }}
                    >
                      Lowest Price
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <div className="container-fluid">
              <div className="row item-card-container mt-3 d-flex align-items-centert">
                {loading ? (
                  <ProductSkeleton />
                ) : (
                  <ShowProducts filter={filter} user={user} />
                )}
                {searchResult < 1 && <p>Couldn't find a match</p>}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Shop;
