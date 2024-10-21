import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { useAtom } from "jotai";
import "mapbox-gl/dist/mapbox-gl.css";
import React, { useEffect, useState } from "react";
import "../../../App.css";
import { useAppContext } from "../../../AppContext";
import IconLine from "../../../assets/jalur.png";
import FilterLine from "../FilterLine/FilterLine";
import { StyleList, filterdata } from "../constant";
import { useConfig, useMap, useMRTData, useRegion } from "../hooks";
import { useMicromarket } from "../hooks/useMicromarket";
import { useZoning } from "../hooks/useZoning";
import {
  AllRegion,
  NortWest,
  SouthEast,
  StyleSatelliteStreet,
  StyleStreet,
} from "../utils";
import { buildAtom } from "./project/store/build";
import TwoDSearch from "./search/2dSearch";
import {
  FormControlLabel,
  Switch,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import ReactDOM from "react-dom";
import SearchNew from "../../property/property-search/SearchNew";
import { generateTransactionId } from "../../lib/api/Authorization";
import { CONFIG } from "../../../config";

function Map2D() {
  const {
    lat,
    lng,
    map,
    mapContainer,
    zoom,
    setLat,
    setLng,
    setZoom,
    styleMap,
    handleChangeStyleMap,
    isMap3D,
    setIsMap3D,
  } = useConfig();

  const [isSearch, setIsSearch] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isSidebarOpen, isCollapsed2dSearchOpen } = useAppContext();
  // const [build] = useAtom(buildAtom)

  // Map show

  useEffect(() => {
    if (!map.current || !mapContainer.current) return;

    // Resize map when sidebar or collapsed search state changes
    setTimeout(() => {
      map.current.resize();
    }, 300);
  }, [isSidebarOpen, isCollapsed2dSearchOpen]);

  // Ensure map resizes correctly when window size changes
  useEffect(() => {
    const handleResize = () => {
      if (map.current) {
        map.current.resize();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Region
  const { showAllRegion, showRegion } = useRegion(map);

  // Micro Market
  const { triggerMicromarket, resetMicromarket } = useMicromarket(map);

  // Zoning
  const { triggerZoning, resetZoning } = useZoning(map);

  const [triggerRadius, setTriggerRadius] = useState(false);
  // Main map
  const { filteringData, handleSearch, search, mapApi, setBuild , build} = useMap(
    styleMap,
    map,
    zoom,
    triggerRadius
  );

  // MRT
  useMRTData(zoom, map);
  // const { setShowMRT } = useMRTLine(map);

  const handleClick = (coordinate) => {
    map.current.setCenter(coordinate);
    map.current.setZoom(15);
  };

  const subMenu = [
    // {
    //   name: "North West",
    //   icon: NortWest,
    //   onClick: () => showRegion("SG03"),
    // },
    // {
    //   name: "South East",
    //   icon: SouthEast,
    //   onClick: () => showRegion("SG04"),
    // },
    {
      name: "Style Street",
      icon: StyleStreet,
      onClick: () => {
        handleChangeStyleMap("mapbox://styles/mapbox/streets-v12");
      },
    },
    {
      name: "Style Satellite Street",
      icon: StyleSatelliteStreet,
      onClick: () => {
        handleChangeStyleMap("mapbox://styles/mapbox/satellite-streets-v12");
      },
    },
  ];

  const expandedMenu = [
    // {
    //   label: "Region Map",
    //   items: [
    //     ...filterdata.map((data) => ({
    //       name: data.REGIONNAME,
    //       icon: data.ICON,
    //       onClick: () => {
    //         showRegion(data.REGIONCODE);
    //       },
    //     })),
    //     {
    //       name: "All Region",
    //       icon: AllRegion,
    //       onClick: showAllRegion,
    //     },
    //   ],
    // },
    {
      label: "Type Map",
      items: [
        ...StyleList.map((data) => ({
          name: data.label,
          icon: data.icon,
          onClick: () => {
            handleChangeStyleMap(data.value);
          },
        })),
      ],
    },
  ];
  useEffect(() => {
    if (!map.current) return; // Wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
    addCustomControl();
  }, []);

  const addCustomControl = () => {
    const customControl = {
      onAdd() {
        // Create a container for the control
        const container = document.createElement("div");
        container.id = "control-layer";
        container.className = "mapboxgl-ctrl";

        // Render the React component into the container
        ReactDOM.render(
          <FilterLine subMenu={subMenu} expandedMenu={expandedMenu} />,
          container
        );

        return container;
      },

      onRemove() {
        document.getElementById("control-layer").remove();
      },
    };

    // Add the custom control to the map
    map.current.addControl(customControl, "top-right");
  };
  const handleToggleChange = (event) => {
    setIsMap3D(event.target.checked);
  };

  const [isBuildingsActive, setIsBuildingsActive] = useState(false);
  const [buildings, setBuildings] = useState([]);
  const handleClickSearch = async (form, category) => {
    setIsBuildingsActive(true);
    console.log("Search initiated with formData:", form()); // Debugging log
    const transactionId = generateTransactionId();
    const searchBy =
      category === "Address"
        ? "searchbyaddress"
        : category === "MRT"
        ? "searchbymrts"
        : category === "Account/Contacts"
        ? "searchbyaccountscontacts"
        : "searchbydistrict";

    console.log("searchby ", searchBy);
    try {
      setIsLoading(true)
      const response = await fetch(`${CONFIG.PROPERTY_SERVICE}/${searchBy}`, {
        method: "POST",
        headers: {
          transactionId: transactionId,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form()),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setIsLoading(false)
      console.log("Search results:", result);
      setBuildings(result.resultSet.propertyInformation);
      mapApi({ data: result.resultSet.propertyInformation });
      // return result;
    } catch (error) {
      console.error("Error during search:", error);
      throw error;
    }
  };

  return (
    <>
      <div className="relative top-0 z-30">
        {isBuildingsActive && <TwoDSearch isLoading={isLoading} build = {build}mapApi={mapApi} map={map} buildings={buildings} setBuildings={setBuildings} setIsBuildingsActive={setIsBuildingsActive} setBuild={setBuild} />}
      </div>
      <div className="relative w-full min-h-full overflow-hidden">
        <div className="filtering absolute top-2 left-4 z-40 flex items-center space-x-2 bg-white bg-opacity-75 p-2 rounded-lg shadow-md">
          <SearchNew handleClickSearch={handleClickSearch} />
          {/* <button
            onClick={() => setTriggerRadius((prev) => !prev)}
            className={`px-2 py-1.5 shadow-md text-sm rounded-lg font-bold flex justify-center items-center border ${triggerRadius
                ? "bg-c-teal text-white border-c-teal"
                : "bg-white text-neutral-600 hover:bg-c-teal hover:text-white hover:border-c-teal"
              }`}
          >
            Radius
          </button>
          <button
            className="px-2 py-1.5 bg-white hover:bg-c-teal text-neutral-600 hover:text-white border hover:border-c-teal shadow-md text-sm rounded-lg font-bold flex justify-center items-center"
            id="search-buttonradius"
          >
            Search
          </button>
          <button
            onClick={() => setTriggerRadius(false)}
            className="px-2 py-1.5 bg-white hover:bg-c-teal text-neutral-600 hover:text-white border hover:border-c-teal shadow-md text-sm rounded-lg font-bold flex justify-center items-center"
            id="clear-buttonradius"
          >
            Clear
          </button> */}
        </div>

        {/* Map Container */}
        <div
          ref={mapContainer}
          className="w-full h-full transition-all duration-300 ease-in-out overflow-hidden"
        >
          <div id="spinner"></div>
        </div>
        <div className="absolute top-2 right-7  flex items-center gap-1.5">
          <img
            id="control-building-map"
            src="3d.svg"
            alt="3D"
            className="w-[30px] h-[30px]"
          />
          <FormControlLabel
            control={
              <Switch
                size="medium"
                checked={isMap3D}
                onChange={handleToggleChange}
              />
            }
          />
        </div>
      </div>
    </>
  );
}

export default Map2D;
