import React, { useState, useEffect } from "react";
import { BiSearch, BiChevronLeft, BiChevronRight } from "react-icons/bi";
import CustomDropdown from "../../../shared/CustomDropdown";
import { useAppContext } from "../../../../AppContext";
import { useNavigate } from "react-router-dom";
import SearchResult from "./SearchResult";
import {
  SearchUtils,
  fetchNlaOptions,
  fetchRentOptions,
  fetchDateOptions,
  fetchUsageOptions,
  fetchRegionOptions,
  fetchStatusOptions,
  fetchZoningOptions,
  fetchPropertyUsageOptions,
} from "./SearchUtils";
import { Box, FormControlLabel, Slider, Switch } from "@mui/material";
import { IoAddOutline, IoSaveOutline } from "react-icons/io5";
import { TbZoomReset } from "react-icons/tb";
import { IoMdSearch } from "react-icons/io";

export default function TwoDSearch({ mapApi }) {
  const { isCollapsed2dSearchOpen, setIsCollapsed2dSearchOpen } =
    useAppContext();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("buildings");
  const [searchQuery, setSearchQuery] = useState("");
  const [sectionHeight, setSectionHeight] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [value, setValue] = useState(50);
  const [activeButton, setActiveButton] = useState("all");
  const [isTransactionEnabled, setIsTransactionEnabled] = useState(false);

  const {
    options: nlaOptions,
    selectedOption: selectedNLA,
    setSelectedOption: setSelectedNLA,
  } = SearchUtils(fetchNlaOptions);
  const {
    options: rentOptions,
    selectedOption: selectedRent,
    setSelectedOption: setSelectedRent,
  } = SearchUtils(fetchRentOptions);
  const {
    options: dateOptions,
    selectedOption: selectedDate,
    setSelectedOption: setSelectedDate,
  } = SearchUtils(fetchDateOptions);
  const {
    options: usageOptions,
    selectedOption: selectedUsage,
    setSelectedOption: setSelectedUsage,
  } = SearchUtils(fetchUsageOptions);
  const {
    options: statusOptions,
    selectedOption: selectedStatus,
    setSelectedOption: setSelectedStatus,
  } = SearchUtils(fetchStatusOptions);
  const {
    options: regionOptions,
    selectedOption: selectedRegion,
    setSelectedOption: setSelectedRegion,
  } = SearchUtils(fetchRegionOptions);
  const {
    options: zoningOptions,
    selectedOption: selectedZoning,
    setSelectedOption: setSelectedZoning,
  } = SearchUtils(fetchZoningOptions);
  const {
    options: propUsageOptions,
    selectedOption: selectedPropUsage,
    setSelectedOption: setSelectedPropUsage,
  } = SearchUtils(fetchPropertyUsageOptions);

  const handleToggleChange = (event) => {
    setIsTransactionEnabled(event.target.checked);
  };

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const marks = [
    { value: 0, label: "0" },
    { value: 100, label: "100" },
  ];

  const toggleCollapse = () => {
    setIsCollapsed2dSearchOpen(!isCollapsed2dSearchOpen);
  };

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
    setShowResults(true);
  };

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  useEffect(() => {
    const handleResize = () => {
      const screenHeight = window.innerHeight;
      const newHeight = screenHeight - 300;
      setSectionHeight(newHeight);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleBackToSearch = () => {
    setShowResults(false);
  };

  const handleSearchButton = () => {
    console.log("Searching for:", searchQuery);
    // console.log({
    //   sub_type: ,});
    mapApi({
      sub_type: null,
      region: selectedRegion === "Select" ? null : selectedRegion,
      micromarket: null,
      zoning: selectedZoning === "Select" ? null : selectedZoning,
      property_usage: null,
      building_nla: 10000,
      space_status: null,
      vacant_space: 5000,
      asking_rent: 15,
      available_date: "2024-01-01",
    });
    // setShowResults(true);
  };

  return (
    <div className="flex bg-neutral-150 h-full relative">
      <div className="flex relative">
        <div
          className={`flex flex-col overflow-hidden bg-neutral-100 shadow-md rounded-md transition-all duration-300 ease-in-out z-10 ${isCollapsed2dSearchOpen ? "w-0.5" : "w-72"
            }`}
        >
          <div
            className={`flex flex-col p-4 transition-opacity duration-300 ease-in-out ${isCollapsed2dSearchOpen ? "opacity-0" : "opacity-100"
              }`}
          >
            {!showResults ? (
              <>
                <div className="relative mb-4 w-full h-full">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-1.5 shadow-md border border-neutral-300 rounded-md pr-10"
                  />
                  <BiSearch
                    className="absolute right-3 top-2 text-neutral-500 cursor-pointer"
                    size={24}
                    onClick={handleSearch}
                  />
                </div>
                {/* Tabs */}
                <div className="flex mb-4 w-full text-sm gap-1 px-1 rounded-md bg-neutral-200">
                  <button
                    onClick={() => setActiveTab("buildings")}
                    className={`flex-grow p-2 rounded-md my-1 text-sm text-neutral-500 ${activeTab === "buildings"
                      ? "bg-white text-black border-neutral-300 shadow-md"
                      : "bg-neutral-200 text-neutral-700 border-neutral-300"
                      }`}
                  >
                    Buildings
                  </button>
                  <button
                    onClick={() => setActiveTab("account")}
                    className={`flex-grow p-2 rounded-md my-1 text-sm text-neutral-500 ${activeTab === "account"
                      ? "bg-white text-black border-neutral-300 shadow-md"
                      : "bg-neutral-200 text-neutral-700 border-neutral-300"
                      }`}
                  >
                    Account
                  </button>
                </div>
                {/* Tab Content */}
                {activeTab === "buildings" && (
                  <div className="space-y-4 w-full text-sm">
                    <div className="flex mb-4 w-full">
                      <button
                        onClick={() => handleButtonClick("all")}
                        className={`flex-grow p-1 w-1/2 rounded-l-md shadow-md text-sm ${activeButton === "all"
                          ? "bg-c-teal text-white"
                          : "bg-neutral-200 text-neutral-500 hover:bg-neutral-300"
                          }`}
                      >
                        All Buildings
                      </button>
                      <button
                        onClick={() => handleButtonClick("available")}
                        className={`flex-grow p-1 w-1/2 rounded-r-md shadow-md text-sm ${activeButton === "available"
                          ? "bg-c-teal text-white"
                          : "bg-neutral-200 text-neutral-500 hover:bg-neutral-300"
                          }`}
                      >
                        Available Buildings
                      </button>
                    </div>
                    <div
                      style={{ height: `${sectionHeight}px` }}
                      className="overflow-y-auto pr-3"
                    >
                      <CustomDropdown
                        label="Space Status"
                        options={statusOptions}
                        selectedOption={selectedStatus}
                        onSelect={setSelectedStatus}
                      />
                      <CustomDropdown
                        label="Asset Class"
                        options={rentOptions}
                        selectedOption={selectedStatus}
                        onSelect={setSelectedRent}
                      />
                      <CustomDropdown
                        label="Region/Micromarket"
                        options={regionOptions}
                        selectedOption={selectedRegion}
                        onSelect={setSelectedRegion}
                      />
                      <CustomDropdown
                        label="Zioning"
                        options={zoningOptions}
                        selectedOption={selectedZoning}
                        onSelect={setSelectedZoning}
                      />
                      <CustomDropdown
                        label="Size"
                        options={nlaOptions}
                        selectedOption={selectedNLA}
                        onSelect={setSelectedNLA}
                      />
                      <CustomDropdown
                        label="NLA"
                        options={nlaOptions}
                        selectedOption={selectedNLA}
                        onSelect={setSelectedNLA}
                      />
                      <CustomDropdown
                        label="Asking Rent"
                        options={rentOptions}
                        selectedOption={selectedRent}
                        onSelect={setSelectedRent}
                      />
                      <CustomDropdown
                        label="Available Dates"
                        options={dateOptions}
                        selectedOption={selectedDate}
                        onSelect={setSelectedDate}
                      />
                      <CustomDropdown
                        label="Property Usage"
                        options={propUsageOptions}
                        selectedOption={selectedPropUsage}
                        onSelect={setSelectedPropUsage}
                      />
                      <div className="flex items-center space-x-2 py-2 mt-2">
                        <label className="block text-xs font-semibold leading-6 text-neutral-500">
                          Transaction
                        </label>
                        <FormControlLabel
                          control={
                            <Switch
                              size="small"
                              checked={isTransactionEnabled}
                              onChange={handleToggleChange}
                            />
                          }
                        />
                      </div>

                      {isTransactionEnabled && (
                        <>
                          <div className="flex flex-col items-center w-full mt-2">
                            <label className="mr-auto text-xs font-semibold leading-6 text-neutral-500">
                              Transaction Amount
                            </label>
                            <Box className="w-full pl-6 pr-4">
                              <Slider
                                value={value}
                                onChange={handleSliderChange}
                                aria-label="Default"
                                valueLabelDisplay="auto"
                                min={0}
                                max={100}
                                marks={[
                                  { value: 0, label: "0" },
                                  { value: 100, label: "100" },
                                ]} // Adjust marks as needed
                              />
                            </Box>
                          </div>

                          <div className="flex flex-col items-center w-full mt-2">
                            <label className="mr-auto text-xs font-semibold leading-6 text-neutral-500">
                              Transaction Period
                            </label>
                            <Box className="w-full pl-6 pr-4">
                              <Slider
                                value={value}
                                onChange={handleSliderChange}
                                aria-label="Default"
                                valueLabelDisplay="auto"
                                min={0}
                                max={100}
                                marks={[
                                  { value: 0, label: "0" },
                                  { value: 100, label: "100" },
                                ]} // Adjust marks as needed
                              />
                            </Box>
                          </div>
                        </>
                      )}

                      <div className="absolute bottom-0 left-0 w-full flex justify-center space-x-4 p-2 pl-4 pr-8 bg-neutral-200 shadow-md">
                        <button
                          // onClick={}
                          className="flex items-center font-thin w-1/2 px-4 py-2 text-blue-700 border rounded-md bg-white text-xs hover:bg-neutral-100 hover:text-neutral-700 transition-all duration-300"
                        >
                          <TbZoomReset className="mr-2 text-lg" />
                          Reset
                        </button>
                        <button
                          onClick={handleSearchButton}
                          className="flex items-center font-thin w-1/2 px-4 py-2 text-white rounded-md bg-c-teal text-xs hover:bg-c-weldon-blue transition-all duration-300"
                        >
                          <IoMdSearch className="mr-2 text-lg" />
                          Search
                        </button>
                      </div>

                      {/* <button
                        className="text-sm bg-c-teal rounded-md text-white"
                        onClick={handleSearchButton}
                      >
                        SEARCH
                      </button> */}
                    </div>
                  </div>
                )}
                {activeTab === "account" && (
                  <div className="space-y-4 w-full text-sm">
                    <div className="flex mb-4 w-full">
                      <button
                        onClick={() => handleButtonClick("all")}
                        className={`flex-grow p-1 w-1/2 rounded-l-md shadow-md text-sm ${activeButton === "all"
                          ? "bg-c-teal text-white"
                          : "bg-neutral-200 text-neutral-500 hover:bg-neutral-300"
                          }`}
                      >
                        All Buildings
                      </button>
                      <button
                        onClick={() => handleButtonClick("available")}
                        className={`flex-grow p-1 w-1/2 rounded-r-md shadow-md text-sm ${activeButton === "available"
                          ? "bg-c-teal text-white"
                          : "bg-neutral-200 text-neutral-500 hover:bg-neutral-300"
                          }`}
                      >
                        Available Buildings
                      </button>
                    </div>
                    <div
                      style={{ height: `${sectionHeight}px` }}
                      className="overflow-y-auto pr-3"
                    >
                      <CustomDropdown
                        label="Space Status"
                        options={nlaOptions}
                        selectedOption={selectedNLA}
                        onSelect={setSelectedNLA}
                      />
                      <CustomDropdown
                        label="Asset Class"
                        options={rentOptions}
                        selectedOption={selectedRent}
                        onSelect={setSelectedRent}
                      />
                    </div>
                  </div>
                )}
              </>
            ) : (
              <SearchResult onBack={handleBackToSearch} />
            )}
          </div>
        </div>
        <div
          className={`absolute -right-10 top-1/2 -mt-16 transform -translate-y-1/2 z-0`}
        >
          <button
            onClick={toggleCollapse}
            className="bg-white rounded-lg p-3 hover:bg-neutral-300 transition-all duration-300 ease-in-out"
          >
            {isCollapsed2dSearchOpen ? (
              <BiChevronRight size={24} />
            ) : (
              <BiChevronLeft size={24} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
