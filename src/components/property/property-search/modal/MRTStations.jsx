import { Checkbox } from "@mui/material";
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa"; // For arrow icon

const MRTStations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLines, setSelectedLines] = useState([]);

  const lines = [
    { code: "EW", name: "East-West Line", color: "bg-green-500" },
    { code: "NS", name: "North-South Line", color: "bg-red-500" },
    { code: "NE", name: "North-East Line", color: "bg-purple-500" },
    { code: "CC", name: "Circle Line", color: "bg-orange-500" },
    { code: "DT", name: "Downtown Line", color: "bg-blue-500" },
    { code: "TE", name: "Thomson-East Line", color: "bg-yellow-700" },
    { code: "BP", name: "Bukit-Panjang LRT Line", color: "bg-gray-500" },
    { code: "SK", name: "Sengkang LRT Line", color: "bg-gray-600" },
    { code: "PG", name: "Punggol LRT Line", color: "bg-gray-700" },
  ];

  const handleLineSelect = (code) => {
    setSelectedLines((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


  return (
    <div className="p-5 mx-auto">
      <div className="flex items-center justify-between mb-4">
        <span>Select Line or Train Station
        </span>
        <label className="ml-2 flex text-md items-center">
          <Checkbox {...label}
          />
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

      {lines.map((line) => (
        <div key={line.code} className="border-b py-2 flex items-center justify-between">
          <div className="flex items-center cursor-pointer">
            <Checkbox {...label} checked={selectedLines.includes(line.code)}
              onChange={() => handleLineSelect(line.code)}
            />
            <div
              className={`h-7 w-7 flex items-center justify-center text-white font-bold text-sm mr-2 rounded-md ${line.color}`}
            >
              {line.code}
            </div>
            <span className="font-medium text-gray-600">{line.name}</span>
          </div>
          <FaChevronDown className="text-gray-500 cursor-pointer" />
        </div>
      ))}
    </div>
  );
};

export default MRTStations;
