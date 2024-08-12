import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";
import React, { useEffect, useState } from "react";
import "../../../App.css";
import { useAppContext } from "../../../AppContext";
import IconLine from "../../../assets/jalur.png";
import FilterLine from "../FilterLine/FilterLine";
import { StyleList, filterdata } from "../constant";
import { useConfig, useMap, useRegion } from "../hooks";
import { useMicromarket } from "../hooks/useMicromarket";
import { useZoning } from "../hooks/useZoning";
import { AllRegion, NortWest, SouthEast, StyleSatelliteStreet } from "../utils";

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
  } = useConfig();

  const { isSidebarOpen, isCollapsed2dSearchOpen } = useAppContext();


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
  const { filteringData, handleSearch, search } = useMap(styleMap, map, zoom, triggerRadius);


  // MRT
  // useMRTData(zoom, map);
  // const { setShowMRT } = useMRTLine(map);

  const handleClick = (coordinate) => {
    map.current.setCenter(coordinate);
    map.current.setZoom(15);
  };

  const subMenu = [
    {
      name: "Line MRT/LRT",
      icon: IconLine,
      onClick: () => {
        setShowMRT((prev) => !prev);
      },
    },
    {
      name: "North West",
      icon: NortWest,
      onClick: () => showRegion("SG03"),
    },
    {
      name: "South East",
      icon: SouthEast,
      onClick: () => showRegion("SG04"),
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
    {
      label: "Region Map",
      items: [
        ...filterdata.map((data) => ({
          name: data.REGIONNAME,
          icon: data.ICON,
          onClick: () => {
            showRegion(data.REGIONCODE);
          },
        })),
        {
          name: "All Region",
          icon: AllRegion,
          onClick: showAllRegion,
        },
      ],
    },
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
  }, []);

  return (
    <div className="relative w-full min-h-full overflow-hidden">
      <div className="filtering">
        {/* <SearchLocation
          onSearchChange={handleSearch}
          filteringData={filteringData}
          search={search}
          onClickAction={handleClick}
        /> */}
        <div className="flex items-center space-x-2">
          {/* <DataBrowser
            triggerMicromarket={triggerMicromarket}
            resetMicromarket={resetMicromarket}
            triggerZoning={triggerZoning}
            resetZoning={resetZoning}
          /> */}
          <button
            onClick={() => setTriggerRadius(prev => !prev)}
            className={`px-2 py-4 shadow-md text-sm rounded-lg font-bold flex justify-center items-center border ${triggerRadius
              ? 'bg-c-teal text-white border-c-teal'
              : 'bg-white text-neutral-600 hover:bg-c-teal hover:text-white hover:border-c-teal'
              }`}
          >
            RADIUS
          </button>
          <div className="z-10">
            <button
              className="px-2 py-4 bg-white hover:bg-c-teal text-neutral-600 hover:text-white border  hover:border-c-teal shadow-md text-sm rounded-lg font-bold flex justify-center items-center"
              id="search-buttonradius"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <FilterLine subMenu={subMenu} expandedMenu={expandedMenu} />
      {/* <div className="bg-[rgba(35,55,75,0.9)] text-white p-2 font-mono z-10 fixed bottom-0 right-0 m-3 rounded-md">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        <div id="filter"></div>
      </div> */}
      <div
        ref={mapContainer}
        className="transition-all duration-300 ease-in-out overflow-hidden w-full h-full"
      />
    </div >
  );
}

export default Map2D;
