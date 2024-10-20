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
import { CONFIG_APP } from "../../config/app";
import { generatePPT } from "../../helper/generatePpt";

export default function SearchResult({
  onBack,
  buildings,
  setBuildings,
  map,
  mapApi,
  setIsBuildingsActive,
}) {
  const { selectedBuildings, setSelectedBuildings } = useAppContext();
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [sectionHeight, setSectionHeight] = useState(0);
  const { confirmSave, setConfirmSave } = useAppContext();
  const [nearByMrt, setNearByMrt] = useState(null);
  const [nearByOthers, setNearByOthers] = useState(null);

  const [checkedBuildings, setCheckedBuildings] = useState([]);
  const [showCheckedBuildings, setShowCheckedBuildings] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    const fetchMrt = async () => {
      const res = await fetch(`${CONFIG_APP.MAPBOX_API}/near-by-mrt`, {
        method: "GET",
      });
      const mrt = await res.json();

      setNearByMrt(mrt.data);
    };

    const fetchOther = async () => {
      const res = await fetch(`${CONFIG_APP.MAPBOX_API}/near-by-others`, {
        method: "GET",
      });
      const others = await res.json();

      setNearByOthers(others.data);
    };

    const fetchBoth = async () => {
      fetchMrt();
      fetchOther();
    };
    const setLoading = async () => {
      console.log("trueee");
      setIsLoading(true);
      await fetchBoth();
      setIsLoading(false);
      console.log("falsee");
    };

    setLoading();
    console.log(nearByOthers);
    console.log("inii");
  }, [selectedBuilding]);

  const handleItemClick = (building) => {
    setSelectedBuilding(building);
    building.enabled = true;
    if (map.current) {
      map.current.flyTo({
        center: [parseFloat(building.longitude), parseFloat(building.latitude)],
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
    };
    mapApi(dataMap);
  };

  const handleChangeCheck = (building) => {
    setBuildings((prevBuildings) => {
      // Cari building yang memiliki id yang sama
      const updatedBuildings = prevBuildings.map((b) => {
        if (b.BUILDINGID === building.BUILDINGID) {
          // Ubah status enabled berdasarkan kondisi saat ini
          return {
            ...b,
            enabled: !b.enabled, // Toggle antara true dan false
          };
        }
        return b;
      });

      return updatedBuildings;
    });
  };

  const DraggableItem = ({ building, checked, index, controlChecked }) => {
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
        className={`flex w-full p-2 border-b space-x-2.5 cursor-pointer bg-white ${
          selectedBuilding &&
          selectedBuilding.BUILDINGID === building.BUILDINGID
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
        <DraggableBuilding
          handleChangeCheck={handleChangeCheck}
          checked={checked}
          building={building}
          index={index}
          controlChecked={controlChecked}
        />
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
      {!showCheckedBuildings && (
        <>
          <div className="flex flex-col w-full">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 rounded-full hover:bg-neutral-200 cursor-pointer">
                {/* <IoArrowBackOutline onClick={onBack} className="text-md" /> */}
                <IoArrowBackOutline
                  onClick={() => setIsBuildingsActive(false)}
                  className="text-md"
                />
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
                    checked={building.enabled || false}
                    controlChecked={true}
                  />
                ))}
              </div>
            </div>
          </div>
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
        </>
      )}

      {selectedBuilding && (
        <DetailedView
          building={selectedBuilding}
          onClose={handleCloseDetailView}
          nearByMrt={nearByMrt}
          nearByOthers={nearByOthers}
          isLoading={isLoading}
        />
      )}

      {confirmSave && (
        <div>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50" />
          <AddProject
            onClose={() => {
              setConfirmSave(false);
              setShowCheckedBuildings(true);
              mapApi({
                data: buildings.filter((building) => building.enabled),
              });
              setCheckedBuildings(
                buildings.filter((building) => building.enabled)
              );
            }}
          />
        </div>
      )}

      {showCheckedBuildings && (
        <>
          <div className="flex flex-col w-full">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 rounded-full hover:bg-neutral-200 cursor-pointer">
                <IoArrowBackOutline
                  onClick={() => {
                    setShowCheckedBuildings(false);
                    mapApi({ data: buildings });
                  }}
                  className="text-md"
                />
              </div>
              <span className="text-md text-neutral-700">
                Buildings Checked Results
              </span>
            </div>
            <div
              style={{ height: `${sectionHeight}px` }}
              className="overflow-y-auto pr-3"
            >
              <div className="flex-grow space-y-2 w-full">
                {checkedBuildings.map((building, index) => (
                  <DraggableItem
                    key={building.BUILDINGID}
                    building={building}
                    index={index}
                    checked={building.enabled || false}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full flex justify-center space-x-4 p-2 bg-neutral-200 shadow-md">
            <button
              onClick={() => {
                generatePPT({ building: checkedBuildings });
              }}
              className="flex items-center font-thin px-4 py-2 text-white rounded-md bg-c-teal text-xs hover:bg-c-weldon-blue transition-all duration-300"
            >
              <IoAddOutline className="mr-2 text-lg" />
              Export to PPT
            </button>
          </div>
        </>
      )}
    </div>
  );
}
