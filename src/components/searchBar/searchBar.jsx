import React, { useState } from "react";
import { products } from "./products"; // Adjust the path as necessary
import "./searchBar.css";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";

export default function SearchBar({ placeholder, icon }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(routes.search)
    const results = products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log(results); // Xuất kết quả tìm kiếm ra console
    setSearching(true);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    setSearching(false); // Khi nhập liệu mới, đặt searching về false
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

    const clearSearchResults = () => {
      setSearchQuery("");
      setSearching(false);
    };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={searchQuery}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <button className="search-button" onClick={handleSearch}>
        <i className={icon}></i>
      </button>
      {/* {!searching && searchQuery && (
        // Kiểm tra không đang tìm kiếm và có kết quả tìm kiếm, hiển thị nút để xóa kết quả tìm kiếm
        <button className="clear-button" onClick={clearSearchResults}>

        </button>
      )} */}
    </div>
  );
}
