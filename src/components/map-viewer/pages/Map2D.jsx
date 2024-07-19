import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
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
import { useAppContext } from '../../../AppContext';
import { debounce } from 'lodash';
import React from "react";

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

  const [sidebarWidth, setSidebarWidth] = useState(256); // Default sidebar width
  // const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Track sidebar state

  const mapContainerRef = useRef(null);

  const { isSidebarOpen } = useAppContext();

  const [mapDimensions, setMapDimensions] = useState({
    width: window.innerWidth - (isSidebarOpen ? 255 : 64),
    height: window.innerHeight - 47,
  });

  const handleResize = debounce(() => {
    setMapDimensions({
      width: window.innerWidth - (isSidebarOpen ? 255 : 64),
      height: window.innerHeight - 47,
    });
  }, 200); // Debounce with a 200ms delay

  useEffect(() => {
    handleResize(); // Initial call to set dimensions

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isSidebarOpen]);


  useEffect(() => {
    if (!map.current || !mapContainerRef.current) return;

    map.current.resize(); // Ensure the map resizes correctly
  }, [mapDimensions]);

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
    <div className="relative" >
      <div className="filtering">
        <SearchLocation
          onSearchChange={handleSearch}
          filteringData={filteringData}
          search={search}
          onClickAction={handleClick}
        />
        <DataBrowser
          triggerMicromarket={triggerMicromarket}
          resetMicromarket={resetMicromarket}
          triggerZoning={triggerZoning}
          resetZoning={resetZoning}
        />
      </div>
      <div className="search-buttonradius-container z-10">
        <button id="search-buttonradius" className="p-2 bg-blue-500 text-white rounded-full">Search</button>
      </div>
      <FilterLine subMenu={subMenu} expandedMenu={expandedMenu} />
      <div className="bg-[rgba(35,55,75,0.9)] text-white p-2 font-mono z-10 fixed bottom-0 right-0 m-3 rounded-md">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        <div id="filter"></div>
      </div>

      <div
        ref={mapContainer}
        className="transition-all duration-300 ease-in-out"
        style={{ height: `${mapDimensions.height}px`, width: `${mapDimensions.width}px` }}
      />
    </div>
  );
}

export default Map2D;
