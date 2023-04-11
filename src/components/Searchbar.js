import React from "react";
import { FaSearch } from "react-icons/fa";

const Searchbar = ({
  searchQuery,
  setSearchQuery,
  searchResult,
  setFilter,
  setClickedFilter,
}) => {
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchBtn = (e) => {
    e.preventDefault();

    setSearchQuery(searchQuery);
    setFilter(searchResult);
    if (searchQuery) {
      setClickedFilter(searchQuery);
    } else {
      setClickedFilter("All Item");
    }
  };
  return (
    <>
      <form className="d-flex search-bar-container">
        <input
          type="search"
          className="form-control search-input"
          placeholder="Search"
          name="Search"
          value={searchQuery}
          onChange={(e) => handleSearch(e)}
          id="shopSearch"
        />
        <button
          className="btn btn-secondary search-btn"
          type="send"
          onClick={(e) => handleSearchBtn(e)}
        >
          <FaSearch />
        </button>
      </form>
    </>
  );
};

export default Searchbar;
