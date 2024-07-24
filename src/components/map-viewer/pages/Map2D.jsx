import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";
import React, { useEffect } from "react";
import "../../../App.css";
import IconLine from "../../../assets/jalur.png";
import FilterLine from "../FilterLine/FilterLine";
import SearchLocation from "../SearchLocation/SearchLocation";
import { StyleList, filterdata } from "../constant";
import { useConfig, useMRTData, useMRTLine, useMap, useRegion } from "../hooks";
import { AllRegion, NortWest, SouthEast, StyleSatelliteStreet } from "../utils";
import DataBrowser from "../DataBrowser/DataBrowser";
import { useMicromarket } from "../hooks/useMicromarket";
import { useZoning } from "../hooks/useZoning";
import { useAppContext } from "../../../AppContext";

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

  // Main map
  const { filteringData, handleSearch, search } = useMap(styleMap, map, zoom);

  // MRT
  useMRTData(zoom, map);
  const { setShowMRT } = useMRTLine(map);

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
        <DataBrowser
          triggerMicromarket={triggerMicromarket}
          resetMicromarket={resetMicromarket}
          triggerZoning={triggerZoning}
          resetZoning={resetZoning}
        />
      </div>
      <div className="search-buttonradius-container z-10">
        <button
          id="search-buttonradius"
          className="p-2 bg-blue-500 text-white rounded-full"
        >
          Search
        </button>
      </div>
      <FilterLine subMenu={subMenu} expandedMenu={expandedMenu} />
      <div className="bg-[rgba(35,55,75,0.9)] text-white p-2 font-mono z-10 fixed bottom-0 right-0 m-3 rounded-md">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        <div id="filter"></div>
      </div>
      <div
        ref={mapContainer}
        className="transition-all duration-300 ease-in-out overflow-hidden w-full h-full"
      />
    </div>
  );
}

export default Map2D;
