import { Checkbox } from "@mui/material";
import React, { useEffect, useState } from "react";
import PropertyResource from "../../PropertyResource";

const MRTStations = ({ form, onFormChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { mrtStations, setMrtStations, fetchMRTStations } = PropertyResource();
  const [expandedLines, setExpandedLines] = useState({}); // Track which lines are expanded

  useEffect(() => {
    fetchMRTStations(); // Fetch the MRT stations on mount
  }, []);

  // Helper function to generate line code from line name
  const getLineCode = (lineName) => {
    const words = lineName.split(" "); // Split by spaces
    // Check if the first word is "MRT" or "LRT", and start after it
    const startIndex = words[0] === "MRT" || words[0] === "LRT" ? 1 : 0;
  
    return words
      .slice(startIndex) // Start after "MRT" or "LRT"
      .filter((word) => word !== "Line") // Omit the word "Line"
      .flatMap((word) => word.split("-")) // Treat hyphenated words as separate
      .map((word) => word[0]) // Take the first letter of each remaining word
      .join("")
      .toUpperCase(); // Join and convert to uppercase
  };
  

  // Filter stations based on search term and categorize by lineName
  const filteredStationsByLine = Object.keys(mrtStations).reduce((acc, lineName) => {
    const lineStations = mrtStations[lineName].stations.filter((station) =>
      station.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (lineStations.length > 0) {
      acc[lineName] = {
        ...mrtStations[lineName],
        stations: lineStations
      };
    }
    return acc;
  }, {});

  // Toggle expanded state for lines
  const toggleLine = (lineName) => {
    setExpandedLines((prev) => ({
      ...prev,
      [lineName]: !prev[lineName] // Toggle the expand/collapse state of the clicked line
    }));
  };

  const toggleStation = (station) => {
    setMrtStations((prevStations) => {
      return Object.keys(prevStations).reduce((acc, lineName) => {
        const updatedStations = prevStations[lineName].stations.map((s) => {
          if (s.value === station.value) {
            const newChecked = !s.checked; // Toggle the checked state

            // Update the form in the parent component
            const updatedForm = newChecked
              ? [...form.mrts, station.value] // If checked, add to form
              : form.mrts.filter((value) => value !== station.value); // If unchecked, remove from form

            onFormChange({
              ...form,
              mrts: updatedForm,
            });
            return { ...s, checked: newChecked }; // Update station's checked state
          }
          return s;
        });

        acc[lineName] = { ...prevStations[lineName], stations: updatedStations };
        return acc;
      }, {});
    });
  };

  return (
    <div className="px-5 mx-auto">
      <div className="flex text-sm items-center justify-between mb-4">
        <span className="text-gray-600 text-sm font-medium">Select Train Station</span>
        <label className="ml-2 flex text-sm items-center">
          <Checkbox size="small" />
          Future Lines
        </label>
      </div>
      <input
        type="text"
        placeholder="Search Station Name"
        className="border border-gray-500 p-2 w-full rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="mt-4">
        <h3 className="font-medium text-gray-600 text-sm mb-2">Available Stations:</h3>
        {Object.keys(filteredStationsByLine).map((lineName) => {
          const { color, stations } = filteredStationsByLine[lineName];
          const isExpanded = expandedLines[lineName]; // Check if the line is expanded
          const lineCode = getLineCode(lineName); // Generate the line code dynamically

          return (
            <div key={lineName} className="mb-4">
              {/* Line header (clickable to expand/collapse) */}
              <div
                className={`flex items-center justify-between cursor-pointer py-2 px-3 border-b border-gray-300`}
                onClick={() => toggleLine(lineName)}
              >
                <div className="flex items-center">
                  <div
                    className={`h-6 w-10 flex items-center justify-center text-white font-bold text-xs mr-2 rounded-md ${color}`}
                  >
                    {lineCode}
                  </div>
                  <h4 className="text-md font-bold">{lineName}</h4>
                </div>
                <span className="text-gray-600">
                  {isExpanded ? "▼" : "►"} {/* Toggle the expand/collapse arrow */}
                </span>
              </div>

              {/* Station list (only show if expanded) */}
              {isExpanded && (
                <ul className="pl-10 mt-2">
                  {stations.map((station) => {
                    const isChecked = form.mrts.includes(station.value); // Check if station is in form

                    return (
                      <li
                        key={station.value}
                        className="flex items-center p-1 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 mb-1"
                      >
                        <input
                          type="checkbox"
                          className="form-checkbox text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-offset-2"
                          id={`station-${station.value}`}
                          checked={isChecked} // Set checked based on whether station is in form
                          onChange={() => toggleStation(station)} // Use station.value for toggle
                        />
                        <div
                          className={`ml-2 h-6 w-6 flex items-center justify-center text-white font-bold text-xs mr-2 rounded-md ${station.color}`}
                        ></div>
                        <label
                          htmlFor={`station-${station.value}`}
                          className="w-full ml-3 text-gray-800 text-md whitespace-nowrap"
                        >
                          {station.label}
                        </label>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MRTStations;
