import React, { useState, useEffect } from "react";
import { BiSearch, BiChevronLeft, BiChevronRight } from "react-icons/bi";
import CustomDropdown from "../../../shared/CustomDropdown";
import { useAppContext } from "../../../../AppContext";
import { useNavigate } from "react-router-dom";
import SearchResult from "./SearchResult";
import {
  SearchUtils,
  fetchRegionOptions,
  fetchStatusOptions,
  fetchZoningOptions,
  fetchPropertyUsageOptions,
  fetchMicromarketeOptions,
  fetchSubTypeOptions,
} from "./SearchUtils"; // Import the hook
import { Box, FormControlLabel, Slider, Switch } from "@mui/material";
import { IoAddOutline, IoSaveOutline } from "react-icons/io5";
import { TbZoomReset } from "react-icons/tb";
import { IoMdSearch } from "react-icons/io";
import { DatePicker } from "@mui/x-date-pickers";
import { format } from "date-fns";


export default function TwoDSearch({ mapApi }) {
  const { isCollapsed2dSearchOpen, setIsCollapsed2dSearchOpen } =
    useAppContext();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("buildings");
  const [searchQuery, setSearchQuery] = useState("");
  const [sectionHeight, setSectionHeight] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [buildingNLA, setBuildingNla] = useState(50);
  const [vacantSpace, setVacantSpace] = useState(50);

  const [askingRent, setAskingRent] = useState(50);
  const [availableDate, setAvailableDate] = useState(null);
  const [activeButton, setActiveButton] = useState("all");
  const [isTransactionEnabled, setIsTransactionEnabled] = useState(false);

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
  const {
    options: micromarketOptions,
    selectedOption: selectedMicromarket,
    setSelectedOption: setSelectedMicromarket,
  } = SearchUtils(fetchMicromarketeOptions);
  const {
    options: subTypeOptions,
    selectedOption: selectedSubType,
    setSelectedOption: setSelectedSubType,
  } = SearchUtils(fetchSubTypeOptions);

  const handleToggleChange = (event) => {
    setIsTransactionEnabled(event.target.checked);
  };

  const handleNLAChange = (event, newValue) => {
    setBuildingNla(newValue);
  };

  const handleRentChange = (event, newValue) => {
    setAskingRent(newValue);
  };

  const handleSpaceChange = (event, newValue) => {
    setVacantSpace(newValue);
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
      sub_type: selectedSubType === "Select" ? null : selectedSubType,
      region: selectedRegion === "Select" ? null : selectedRegion,
      micromarket:
        selectedMicromarket === "Select" ? null : selectedMicromarket,
      zoning: selectedZoning === "Select" ? null : selectedZoning,
      property_usage: selectedPropUsage === "Select" ? null : selectedPropUsage,
      building_nla: buildingNLA,
      space_status: selectedStatus === "Select" ? null : selectedStatus,
      vacant_space: vacantSpace,
      asking_rent: askingRent,
      available_date: availableDate ? format(availableDate, 'yyyy-MM-dd') : null,
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
                        label="Sub Type"
                        options={subTypeOptions}
                        selectedOption={selectedSubType}
                        onSelect={setSelectedSubType}
                      />
                      <CustomDropdown
                        label="Region"
                        options={regionOptions}
                        selectedOption={selectedRegion}
                        onSelect={setSelectedRegion}
                      />
                      <CustomDropdown
                        label="Micromarket"
                        options={micromarketOptions}
                        selectedOption={selectedMicromarket}
                        onSelect={setSelectedMicromarket}
                      />
                      <CustomDropdown
                        label="Zoning"
                        options={zoningOptions}
                        selectedOption={selectedZoning}
                        onSelect={setSelectedZoning}
                      />
                      <CustomDropdown
                        label="Property Usage"
                        options={propUsageOptions}
                        selectedOption={selectedPropUsage}
                        onSelect={setSelectedPropUsage}
                      />
                      <CustomDropdown
                        label="Space Status"
                        options={statusOptions}
                        selectedOption={selectedStatus}
                        onSelect={setSelectedStatus}
                      />
                      {/* <CustomDropdown
                        label="Available Dates"
                        options={dateOptions}
                        selectedOption={selectedDate}
                        onSelect={setSelectedDate}
                      /> */}

                      <div className="relative">
                        <label className="block mt-2 text-xs font-semibold leading-6 text-neutral-500">
                          Available Date
                        </label>
                        <DatePicker className="rounded-md" value={availableDate} onChange={setAvailableDate} />
                      </div>

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
                              Building NLA
                            </label>
                            <Box className="w-full pl-6 pr-4">
                              <Slider
                                value={buildingNLA}
                                onChange={handleNLAChange}
                                aria-label="Default"
                                valueLabelDisplay="auto"
                                min={0}
                                max={10000}
                                marks={[
                                  { value: 0, label: "0" },
                                  { value: 5000, label: "5000" },
                                  { value: 10000, label: "10000" },
                                ]} // Adjust marks as needed
                              />
                            </Box>
                          </div>

                          <div className="flex flex-col items-center w-full mt-2">
                            <label className="mr-auto text-xs font-semibold leading-6 text-neutral-500">
                              Vacant Space
                            </label>
                            <Box className="w-full pl-6 pr-4">
                              <Slider
                                value={vacantSpace}
                                onChange={handleSpaceChange}
                                aria-label="Default"
                                valueLabelDisplay="auto"
                                min={0}
                                max={5000}
                                marks={[
                                  { value: 0, label: "0" },
                                  { value: 5000, label: "5000" },
                                ]} // Adjust marks as needed
                              />
                            </Box>
                          </div>
                          <div className="flex flex-col items-center w-full mt-2">
                            <label className="mr-auto text-xs font-semibold leading-6 text-neutral-500">
                              Asking Rent
                            </label>
                            <Box className="w-full pl-6 pr-4">
                              <Slider
                                value={askingRent}
                                onChange={handleRentChange}
                                aria-label="Default"
                                valueLabelDisplay="auto"
                                min={0}
                                max={100}
                                marks={[
                                  { value: 0, label: "0" },
                                  { value: 500, label: "500" },
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
                        options={statusOptions}
                        selectedOption={selectedStatus}
                        onSelect={setSelectedStatus}
                      />
                      <CustomDropdown
                        label="Asset Class"
                        options={statusOptions}
                        selectedOption={selectedStatus}
                        onSelect={setSelectedStatus}
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
