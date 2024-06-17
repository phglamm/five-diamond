import React, { useState } from "react";
import axios from "axios";
import "./searchBar.css";

export default function SearchBar({ placeholder, icon }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users`);
      const results = response.data.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
      console.log(results); // For debugging purposes
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
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
      {searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map((result) => (
            <div key={result.id} className="search-result-item">
              {result.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
