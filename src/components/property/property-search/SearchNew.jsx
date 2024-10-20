import React, { useRef, useState, useEffect } from "react";
// import { ImageSlider } from './ImageSlider';
import { LuSettings2 } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import ModalSearch from "./modal/ModalSearch";
import ModalFilter from "./modal/ModalFilter";
import { generateTransactionId } from "../../lib/api/Authorization";
// import './SearchArea.css';
import homeImage from "../../../../src/assets/home.avif";
import ClassicSearch from "./ClassicSearch";
import PopoverFilter from "./modal/PopoverFilter";
import PropertySearchForm from "./PropertySearchForm";

const SearchNew = ({ setIsClassic = () => {}, className, handleClickSearch=()=>{} }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const [hoveredItem, setHoveredItem] = useState(null);
  const [category, setCategory] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalFilterVisible, setIsModalFilterVisible] = useState(false);
  const [filter, setFilter] = useState("");
  const containerRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [placeholderText, setPlaceholderText] = useState("Search");
  const [isAnimating, setIsAnimating] = useState(false); // For managing animation state
  const [showPlaceholder, setShowPlaceholder] = useState(!query);
  const [displayPopover, setDisplayPopover] = useState(false);
  const placeholders = [
    "by Address",
    "by Account/Contact",
    "by District",
    "by Micromarket",
    "by MRT",
  ];
  const location = useLocation();
  const inputRef = useRef(null);

  const categories = [
    { key: "Address", label: "Search by Address" },
    { key: "Account/Contacts", label: "Search by Account/Contacts" },
    { key: "District", label: "Search by District" },
    { key: "Micromarket", label: "Search by Micromarket" },
    { key: "MRT", label: "Search by MRT" },
  ];
  const results = ["test search"];

  const [formAddress, setFormAddress] = useState({
    buildingName: "",
    streetNumber: "",
    streetName: "",
    postalCode: "",
    pageNo: 1,
    pageSize: 10,
  });
  const [formDistrict, setFormDistrict] = useState({
    districts: [],
    pageNo: 1,
    pageSize: 10,
  });

  const [formMrt, setFormMRT] = useState({
    mrts: [],
    pageNo: 1,
    pageSize: 10,
  });

  const [formAccount, setFormAccount] = useState({
    keyword: "",
    type: "",
    pageNo: 1,
    pageSize: 10,
  });

  const handleSetQuery = (form) => {
    let queryString = "";

    if (category === "District") {
      // Include only district-related fields, adjust as per your state
      queryString = `${form.districts ? form.districts : ""}`.trim();
    } else if (category === "Address") {
      // Include address-related fields
      queryString = `${form.buildingName ? form.buildingName : ""},${
        form.streetNumber ? form.streetNumber : ""
      },${form.streetName ? form.streetName : ""},${
        form.postalCode ? form.postalCode : ""
      }`.trim();
    } else if (category === "Account/Contacts") {
      queryString = `${form.keyword ? form.keyword : ""}, ${
        form.type ? form.type : ""
      }`;
    } else if (category === "Micromarket") {
      // Include only district-related fields, adjust as per your state
      queryString = `${form.districts ? form.districts : ""}`.trim();
    } else if (category === "MRT") {
      // Include only district-related fields, adjust as per your state
      queryString = `${form.mrts ? form.mrts : ""}`.trim();
    }

    // Remove any trailing commas or unnecessary spaces
    // queryString = queryString.replace(/,\s*$/, '').replace(/\s*,/g, '');
    console.log("Constructed Query: ", queryString);

    setQuery(queryString); // Update the query with the constructed string
  };

  const handleFormChange = (updatedForm) => {
    if (category === "Address") {
      setFormAddress(updatedForm);
      console.log("Updated Address Form:", updatedForm);
    } else if (category === "District") {
      setFormDistrict(updatedForm);
      console.log("Updated District Form:", updatedForm);
    } else if (category === "MRT") {
      setFormMRT(updatedForm);
      console.log("Updated MRT Form:", updatedForm);
    } else if (category === "Account/Contacts") {
      setFormAccount(updatedForm);
      console.log("Updated Account Form:", updatedForm);
    } else if (category === "Micromarket") {
      setFormDistrict(updatedForm);
      console.log("Updated Micromarket Form:", updatedForm);
    }
    handleSetQuery(updatedForm);
  };

  const getForm = () => {
    if (category === "Address") {
      return formAddress;
    } else if (category === "District") {
      return formDistrict;
    } else if (category === "MRT") {
      return formMrt;
    } else if (category === "Account/Contacts") {
      return formAccount;
    } else if (category === "Micromarket") {
      return formDistrict;
    }
  };

  // useEffect(() => {
  //   const interval = setInterval(changePlaceholder, 3000);
  //   return () => clearInterval(interval); // Cleanup interval on unmount
  // }, [index]);

  // const changePlaceholder = () => {
  //   setIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
  // };

  useEffect(() => {
    const interval = setInterval(() => {
      triggerPlaceholderChange();
    }, 3000);

    return () => clearInterval(interval);
  }, [index]);

  // Trigger placeholder change with animation
  const triggerPlaceholderChange = () => {
    setIsAnimating(true); // Start animation
    setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
      setIsAnimating(false); // End animation after the transition
    }, 500); // Match the duration of the CSS animation
  };

  const handleFocus = () => {
    setIsFocused(true);
    setPlaceholderText("");
    setShowPlaceholder(false);
    setIsExpanded(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setPlaceholderText(query ? "" : "Search");
    setShowPlaceholder(query ? false : true);
  };

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    handleClickSearch(getForm, category, query);
    console.log("Query: ", query);
    setIsExpanded(false);
  };

  const handleSearchClick = () => {
    setShowPlaceholder(query ? false : true);
    handleSearch();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleCategoryClick = (category) => {
    setCategory(category.key);
    setIsModalVisible(true);
    setIsExpanded(false);
  };

  const handleFiltersClick = (filter) => {
    setFilter(filter);
    if (filter === "filter") {
      setIsModalFilterVisible(true);
    } else {
      setDisplayPopover(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  // const showPlaceholder = !query;
  const currentPlaceholder = placeholders[index];
  const previousPlaceholder =
    placeholders[(index - 1 + placeholders.length) % placeholders.length];

  const [activeButton, setActiveButton] = useState("All"); // Default active button
  const [sliderStyle, setSliderStyle] = useState({ width: 0, left: 0 }); // To control the slider's width and position
  const buttonRefs = {
    All: useRef(null),
    Lease: useRef(null),
    Sale: useRef(null),
  };

  useEffect(() => {
    updateSliderPosition(); // Update the slider position on initial load
  }, [activeButton]); // Update whenever the active button changes

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  const updateSliderPosition = () => {
    const activeButtonRef = buttonRefs[activeButton.replace(" ", "")].current;
    if (activeButtonRef) {
      const { width, left } = activeButtonRef.getBoundingClientRect();
      setSliderStyle({
        width,
        left: left - activeButtonRef.parentNode.getBoundingClientRect().left,
      });
    }
  };

  const [activePopover, setActivePopover] = useState(null);

  const handlePopoverClick = (category) => {
    if (activePopover === category) {
      setActivePopover(null); // Close the popover if the same button is clicked again
    } else {
      setActivePopover(category); // Set the clicked button as active
    }
  };
  return (
    <>
      <div className={className}>
        <div className="bg-black bg-opacity-60 p-5 backdrop-blur-xs rounded-xl shadow-lg">
          <div className="flex flex-col ">
            <div className="w-full flex justify-between items-center">
              <div className="relative flex">
                <div
                  ref={containerRef}
                  className="relative w-80 flex items-center bg-white rounded-lg shadow-lg"
                >
                  <div
                    className={`absolute ml-16 inset-0 flex items-center pointer-events-none transition-all duration-500 ease-in-out ${
                      isAnimating ? "slide-out" : "slide-in"
                    }`}
                  >
                    {showPlaceholder && (
                      <span className="text-gray-400">
                        {currentPlaceholder}
                      </span>
                    )}
                  </div>

                  <input
                    type="text"
                    className="form-input w-full py-2 px-2 rounded-l-lg focus:outline-none text-gray-600"
                    placeholder={placeholderText}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    value={query}
                    onChange={handleSearchChange}
                    ref={inputRef}
                  />

                  {isExpanded && (
                    <div className="absolute top-12 w-full h-auto bg-white border rounded-md shadow-lg z-50 flex">
                      <div className="relative w-full">
                        {categories.length > 0 && (
                          <div className="mb-2 text-c-dark-grayish">
                            {categories.map((category, index) => (
                              <h4
                                key={index}
                                className="text-sm p-3 hover:bg-gray-200 cursor-pointer"
                                onClick={() => handleCategoryClick(category)}
                                onMouseEnter={() => setHoveredItem(category)}
                                onMouseLeave={() => setHoveredItem(null)}
                              >
                                {category.label}
                              </h4>
                            ))}
                          </div>
                        )}
                        {results.length > 0 && (
                          <div>
                            <h4 className="text-xs px-3 py-1 text-gray-500 bg-gray-100 mb-2">
                              Recent Searches
                            </h4>
                            <ul>
                              {results.map((result, index) => (
                                <li
                                  key={index}
                                  className="p-3 text-sm text-c-teal hover:bg-gray-200 cursor-pointer"
                                  onMouseEnter={() => setHoveredItem(result)}
                                  onMouseLeave={() => setHoveredItem(null)}
                                >
                                  {result}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <span
                  onClick={handleSearchClick}
                  className="bg-c-teal hover:bg-c-teal/90 cursor-pointer text-white text-md font-semibold py-2 px-3 rounded-r-lg"
                >
                  <IoSearch className="text-lg" />
                </span>
              </div>

              <div className="flex gap-2 ml-2">
                <span
                  onClick={() => handleFiltersClick("filter")}
                  className="flex items-center text-gray-600 gap-2 py-1.5 px-3 bg-white text-xs font-semibold rounded-lg shadow-lg cursor-pointer"
                >
                  <LuSettings2 className="text-md" />
                  Filter
                </span>
                <div className="relative inline-block text-left">
                  <span
                    className="flex items-center text-gray-600 gap-2 py-2.5 px-3 whitespace-nowrap bg-white text-xs font-semibold rounded-lg shadow-lg cursor-pointer"
                    onClick={() => handlePopoverClick("propertyType")}
                  >
                    <span>Property Type</span>
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </span>

                  <PopoverFilter
                    isVisible={activePopover === "propertyType"}
                    category="propertyType"
                    onClose={() => setActivePopover(null)}
                  />
                </div>

                <div className="relative inline-block text-left">
                  <span
                    className="flex items-center text-gray-600 gap-3 py-2.5 px-3 whitespace-nowrap bg-white text-xs font-semibold rounded-lg shadow-lg cursor-pointer"
                    onClick={() => handlePopoverClick("rent")}
                  >
                    <span>Rent/Transacted</span>
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </span>

                  <PopoverFilter
                    isVisible={activePopover === "rent"}
                    category="rent"
                    onClose={() => setActivePopover(null)}
                  />
                </div>

                <div className="relative inline-block text-left">
                  <span
                    className="flex items-center text-gray-600 gap-2 py-2.5 whitespace-nowrap px-3 bg-white text-xs font-semibold rounded-lg shadow-lg cursor-pointer"
                    onClick={() => handlePopoverClick("size")}
                  >
                    <span>Size</span>
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </span>

                  <PopoverFilter
                    isVisible={activePopover === "size"}
                    category="size"
                    onClose={() => setActivePopover(null)}
                  />
                </div>
                <div className="relative inline-block text-left">
                  <span
                    className="flex items-center text-gray-600 gap-3 py-2.5 px-3 whitespace-nowrap bg-white text-xs font-semibold rounded-lg shadow-lg cursor-pointer"
                    onClick={() => handlePopoverClick("availability")}
                  >
                    <span>Availability</span>
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </span>

                  <PopoverFilter
                    isVisible={activePopover === "availability"}
                    category="availability"
                    onClose={() => setActivePopover(null)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="relative inline-flex gap-2 rounded-full mt-6">
              {/* Button Items */}
              <span
                ref={buttonRefs.All}
                onClick={() => handleButtonClick("All")}
                className={`relative z-10 py-1 px-4 rounded-full cursor-pointer text-sm font-semibold transition-colors duration-100 ease-in-out
    ${
      activeButton === "All"
        ? "bg-c-teal text-white"
        : " text-gray-300 bg-black/10 hover:bg-black/20"
    }`}
              >
                All
              </span>
              <span
                ref={buttonRefs.Lease}
                onClick={() => handleButtonClick("Lease")}
                className={`relative z-10 py-1 px-4 rounded-full cursor-pointer text-sm font-semibold transition-colors duration-100 ease-in-out
    ${
      activeButton === "Lease"
        ? "bg-c-teal text-white"
        : "text-gray-300 bg-black/10 hover:bg-black/20"
    }`}
              >
                For Lease
              </span>
              <span
                ref={buttonRefs.Sale}
                onClick={() => handleButtonClick("Sale")}
                className={`relative z-10 py-1 px-4 rounded-full cursor-pointer text-sm font-semibold transition-colors duration-100 ease-in-out
    ${
      activeButton === "Sale"
        ? "bg-c-teal text-white"
        : " text-gray-300 bg-black/10 hover:bg-black/20"
    }`}
              >
                For Sale
              </span>
            </div>
            <div className="pt-6 px-1 text-right flex items-center">
              <span
                onClick={() => setIsClassic(true)}
                className="bg-black/10 hover:bg-black/20 py-1.5 px-3 rounded-full text-gray-300 text-xs hover:texr.gray-300/80 cursor-pointer"
              >
                Classic View
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal search component */}
      <ModalSearch
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        category={category}
        form={getForm()}
        onFormChange={handleFormChange}
        setQuery={setQuery}
        onClick={handleSearchClick}
      />
      <ModalFilter
        isVisible={isModalFilterVisible}
        onClose={() => setIsModalFilterVisible(false)}
        filter={filter}
      />
    </>
  );
};

export default SearchNew;
