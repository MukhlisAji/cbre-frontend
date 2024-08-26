import React, { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import {
  IoAddOutline,
  IoArrowBackOutline,
  IoSaveOutline,
} from "react-icons/io5";
import { useAppContext } from "../../../../AppContext";
import AddProject from "../project/AddProject";
import DraggableBuilding from "../project/DraggableBuilding";
import DetailedView from "./DetailedView";
import { data } from "autoprefixer";

export default function SearchResult({ onBack, buildings, setBuildings, map, mapApi }) {
  const { selectedBuildings, setSelectedBuildings } = useAppContext();
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [sectionHeight, setSectionHeight] = useState(0);
  const { confirmSave, setConfirmSave } = useAppContext();

  const [saveNew, setSaveNew] = useState();
  const { toggleDrawer } = useAppContext();

  const handleBuildingChange = (index) => {
    const newBuildings = [...buildings];
    newBuildings[index].enabled = !newBuildings[index].enabled;
    setBuildings(newBuildings);

    const updatedSelectedBuildings = newBuildings.filter(
      (building) => building.enabled
    );
    setSelectedBuildings(updatedSelectedBuildings);
  };

  const handleItemClick = (building) => {
    setSelectedBuilding(building);
    building.enabled = true
    if (map.current) {
      map.current.flyTo({
        center: [parseFloat(building.LONGITUDE), parseFloat(building.LATITUDE)],
        zoom: 15,
        essential: true, // ensures the animation happens even if the user has enabled prefers-reduced-motion
      });
    }
  };

  const handleCloseDetailView = () => {
    setSelectedBuilding(null);
  };

  const onClose = () => {
    setConfirmSave(false);
  };

  const moveBuilding = (dragIndex, hoverIndex) => {
    const dragBuilding = buildings[dragIndex];
    const newBuildings = [...buildings];
    newBuildings.splice(dragIndex, 1);
    newBuildings.splice(hoverIndex, 0, dragBuilding);
    setBuildings(newBuildings);
    console.log(newBuildings);

    const dataMap = {
      data: newBuildings,
    }
    mapApi(dataMap);
  };

  const DraggableItem = ({ building, index }) => {
    const [checked, setChecked] = useState(false);
    const [{ isDragging }, drag] = useDrag({
      type: "BUILDING",
      item: { index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    const [, drop] = useDrop({
      accept: "BUILDING",
      hover: (item) => {
        if (item.index !== index) {
          moveBuilding(item.index, index);
          item.index = index;
        }
      },
    });
    return (
      <div
        ref={(node) => drag(drop(node))}
        key={building.BUILDINGID}
        className={`flex w-full p-2 border-b space-x-2.5 cursor-pointer bg-white ${selectedBuilding && selectedBuilding.id === building.BUILDINGID
          ? "bg-blue-100"
          : "hover:bg-gray-200"
          }`}
        onClick={() => handleItemClick(building)}
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        {/* <Checkbox
          checked={checked}
          onChange={() => handleBuildingChange(index)}
          className={`form-checkbox h-5 w-5 text-c-teal mt-2.5 rounded-md ${checked ? "bg-c-teal" : "bg-neutral-300"
            }`}
        >
          {checked && <BsCheckLg className="text-white text-lg" />}
        </Checkbox> */}
        <DraggableBuilding onClick={() => {
          setChecked(prev => !prev)
          console.log(checked)
        }} building={building} index={index} />
      </div>
    );
  };

  useEffect(() => {
    const handleResize = () => {
      const screenHeight = window.innerHeight;
      const newHeight = screenHeight - 100;
      setSectionHeight(newHeight);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

    return (
      <div className="flex w-full h-full">
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded-full hover:bg-neutral-200 cursor-pointer">
              <IoArrowBackOutline onClick={onBack} className="text-md" />
            </div>
            <span className="text-md text-neutral-700">Search Results</span>
          </div>
          <div
            style={{ height: `${sectionHeight}px` }}
            className="overflow-y-auto pr-3"
          >
            <div className="flex-grow space-y-2 w-full">
              {buildings.map((building, index) => (
                <DraggableItem
                  key={building.BUILDINGID}
                  building={building}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>

        {selectedBuilding && (
          <DetailedView
            building={selectedBuilding}
            onClose={handleCloseDetailView}
          />
        )}

        <div className="absolute bottom-0 left-0 w-full flex justify-center space-x-4 p-2 bg-neutral-200 shadow-md">
          <button
            onClick={() => {
              toggleDrawer("saveProject");
            }}
            className="flex items-center font-thin px-4 py-2 text-blue-700 border rounded-md bg-white text-xs hover:bg-neutral-100 hover:text-neutral-700 transition-all duration-300"
          >
            <IoSaveOutline className="mr-2 text-lg" />
            Save Project
          </button>
          <button
            onClick={() => {
              setConfirmSave(true);
            }}
            className="flex items-center font-thin px-4 py-2 text-white rounded-md bg-c-teal text-xs hover:bg-c-weldon-blue transition-all duration-300"
          >
            <IoAddOutline className="mr-2 text-lg" />
            New
          </button>
        </div>

        {confirmSave && (
          <div>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50" />
            <AddProject
              onClose={() => {
                setConfirmSave(false);
              }}
            />
          </div>
        )}
      </div>
    );
  }
