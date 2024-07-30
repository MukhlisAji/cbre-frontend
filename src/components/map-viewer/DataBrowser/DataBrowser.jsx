import React, { useState, useEffect } from "react";
import "./DataBrowser.css";
// import { useMicromarket } from "../../hooks/useMicromarket";

const DataBrowser = ({ triggerMicromarket, resetMicromarket, triggerZoning, resetZoning }) => {
  const [dataBrowser, setDataBrowser] = useState(false);
  const [micromarketData, setMicromarketData] = useState([]);
  const [zoningData, setZoningData] = useState([]);
  const [selectedDropdown, setSelectedDropdown] = useState("");

  useEffect(() => {
    fetchData("micromarket");
    fetchData("zoning");
  }, []);

  const fetchData = (type) => {
    let apiUrl;
    if (type === "micromarket") {
      apiUrl = "http://103.127.134.145:3000/data/micromarket";
    } else if (type === "zoning") {
      apiUrl = "http://103.127.134.145:3000/data/zoning";
    }

    fetch(apiUrl)
      .then((response) => response.json())
      .then((item) => {
        if (type === "micromarket") {
          setMicromarketData(item.data);
        } else {
          setZoningData(item.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleDropdownClick = (type) => {
    setSelectedDropdown((prevSelectedDropdown) =>
      prevSelectedDropdown === type ? "" : type
    );
  };

  useEffect(() => {
    if (selectedDropdown === "micromarket") {
      resetZoning();
    } else if (selectedDropdown === "zoning") {
      resetMicromarket();
    } else {
      resetMicromarket();
      resetZoning();
    }
  }, [selectedDropdown]);

  return (
    <>
      <button
        className={`data-browser-btn text-neutral-600 ${
          dataBrowser ? "data-browser-btn-active" : ""
        }`}
        onClick={() => setDataBrowser(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="14"
          fill="#000"
          className="bi bi-layers-fill"
          viewBox="0 0 16 16"
        >
          <path d="M7.765 1.559a.5.5 0 0 1 .47 0l7.5 4a.5.5 0 0 1 0 .882l-7.5 4a.5.5 0 0 1-.47 0l-7.5-4a.5.5 0 0 1 0-.882z" />
          <path d="m2.125 8.567-1.86.992a.5.5 0 0 0 0 .882l7.5 4a.5.5 0 0 0 .47 0l7.5-4a.5.5 0 0 0 0-.882l-1.86-.992-5.17 2.756a1.5 1.5 0 0 1-1.41 0z" />
        </svg>
        Data
      </button>
      {dataBrowser && (
        <div className="data-browser">
          <div className="header-data-browser">
            <h2>Data Browser</h2>
            <button className="close-btn" onClick={() => setDataBrowser(false)}>
              x
            </button>
          </div>
          <div className="container-data-browser">
            <div className="dropdown">
              <button
                className="dropbtn"
                onClick={() => handleDropdownClick("micromarket")}
              >
                Micromarket Data ({micromarketData.length || 0}){" "}
                <span
                  className={`arrow ${
                    selectedDropdown === "micromarket" ? "rotate" : ""
                  }`}
                >
                  &#9662;
                </span>
              </button>
              <div
                className={`dropdown-content ${
                  selectedDropdown === "micromarket" ? "open" : ""
                }`}
              >
                {micromarketData.map((item, index) => (
                  <div onClick={() => triggerMicromarket(item)} key={index}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="dropdown">
              <button
                className="dropbtn"
                onClick={() => handleDropdownClick("zoning")}
              >
                Zoning Data ({zoningData.length || 0}){" "}
                <span
                  className={`arrow ${
                    selectedDropdown === "zoning" ? "rotate" : ""
                  }`}
                >
                  &#9662;
                </span>
              </button>
              <div
                className={`dropdown-content ${
                  selectedDropdown === "zoning" ? "open" : ""
                }`}
              >
                {zoningData.map((item, index) => (
                  <div onClick={() => triggerZoning(item)} key={index}>{item}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DataBrowser;
