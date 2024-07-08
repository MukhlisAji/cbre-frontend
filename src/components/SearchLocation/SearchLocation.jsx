import React, { useState, useEffect, useRef } from "react";
import { History, PinSearch } from "../../utils/image";

import "./SearchLocation.css";

const SearchLocation = ({
  onSearchChange,
  filteringData,
  onClickAction,
  search,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [history, setHistory] = useState([]);

  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  const handleAddHistory = (item) => {
    setHistory((prevHistory) => {
      const newHistory = prevHistory.filter((his) => his !== item);
      newHistory.unshift(item);
      if (newHistory.length > 4) {
        newHistory.pop();
      }
      setIsFocused(false);
      return newHistory;
    });
  };

  const handleDeleteHistory = (item, e) => {
    e.stopPropagation(); // Stop event propagation to prevent triggering the search
    setHistory((prevHistory) => prevHistory.filter((his) => his !== item));
  };

  const handleClearQuery = () => {
    onSearchChange("");
  };

  const renderList = () => {
    let result = [];

    if (search === "") {
      result = history;
    } else {
      const historyMatch = history.filter((item) =>
        item.properties.BUILDINGNAME.toLowerCase().includes(
          search.toLowerCase()
        )
      );

      const dataMatch = filteringData?.filter((item) =>
        history.length === 0
          ? item
          : !history.some(
              (historyItem) =>
                historyItem.properties.BUILDINGNAME ===
                item.properties.BUILDINGNAME
            )
      );

      result = historyMatch.concat(dataMatch);
    }

    if (result.length === 0) {
      return <div className="result-item">No results found</div>;
    }

    return result.slice(0, 4).map((item, index) => {
      const isHistory = history.includes(item);
      return (
        <div
          key={index}
          className="result-item"
          onClick={() => {
            handleAddHistory(item);
            onClickAction(item.geometry.coordinates);
          }}
        >
          <span
            className="result-label-name"
            style={{ color: isHistory ? "#888" : "#444" }}
          >
            <span className="result-icon">
              {isHistory ? (
                <img src={History} alt="history" />
              ) : (
                <img src={PinSearch} alt="pin" />
              )}
            </span>
            {item.properties.BUILDINGNAME}
          </span>
          {isHistory && (
            <svg
              onClick={(e) => handleDeleteHistory(item, e)}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-x"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg>
          )}
        </div>
      );
    });
  };

  return (
    <div className="search-location" ref={searchRef}>
      <form
        className={`search-bar ${
          isFocused && (history.length > 0 || search)
            ? "search-bar-focused"
            : ""
        }`}
      >
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="Search Location"
        />
        {search && (
          <svg
            onClick={handleClearQuery}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
          </svg>
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-search"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
      </form>
      {isFocused && (history.length > 0 || search.length > 0) && (
        <div className="search-results">{renderList()}</div>
      )}
    </div>
  );
};

export default SearchLocation;
