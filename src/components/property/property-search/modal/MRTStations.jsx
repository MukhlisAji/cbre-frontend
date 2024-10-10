import { Checkbox } from "@mui/material";
import React, { useEffect, useState } from "react";
import PropertyResource from "../../PropertyResource";

const MRTStations = ({ form, onFormChange, setSelectedStations }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { mrtStations, setMrtStations, fetchMRTStations } = PropertyResource();

  useEffect(() => {
    fetchMRTStations();
  }, []);

  // Filter stations based on the search term
  const filteredStations = mrtStations.filter((station) =>
    station.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Toggle station selection
  // const toggleStation = (station) => {
  //   const isSelected = form.includes(station.value);
  //   console.log('stationvalu ', station.value);
  //   console.log('stationvalu ', isSelected);


  //   // Update the form in the parent component
  //   const updatedForm = isSelected
  //     ? form.filter((value) => value !== station.value) // Remove if already selected
  //     : [...form, station.value]; // Add if not selected
  //   console.log("updatedForm " , updatedForm);
  //   onFormChange(updatedForm); // Pass the updated form to the parent
  // };

  const toggleStation = (station) => {
    setMrtStations((prevStations) => {
      return prevStations.map((s) => {
        if (s.value === station.value) {
          const newChecked = !s.checked; // Toggle the checked state

          // Update the form in the parent component
          const updatedForm = newChecked
            ? [...form, station.value] // If checked, add to form
            : form.filter((value) => value !== station.value); // If unchecked, remove from form

          onFormChange(updatedForm); // Pass the updated form to the parent
          return { ...s, checked: newChecked }; // Update station's checked state
        }
        return s; // Return the unchanged station
      });
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
        <ul className="grid grid-cols gap-4">
          {filteredStations.map((station) => {
            const isChecked = form.includes(station.value); // Check if station is in form

            return (
              <li
                key={station.value}
                className="flex items-center p-1 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
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

      </div>
    </div>
  );
};

export default MRTStations;
