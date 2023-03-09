import React from "react";
import { FaSearch } from "react-icons/fa";

const Searchbar = () => {
  return (
    <>
      <form action="#" className="d-flex search-bar-container">
        <input
          type="search"
          className="form-control search-input"
          placeholder="Search"
          name="Search"
          id=""
        />
        <button className="btn btn-secondary search-btn" type="send">
          <FaSearch />
        </button>
      </form>
    </>
  );
};

export default Searchbar;
