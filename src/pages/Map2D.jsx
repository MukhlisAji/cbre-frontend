import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect } from "react";
import "../App.css";
import IconLine from "../assets/jalur.png";
import FilterLine from "../components/FilterLine/FilterLine";
// import SearchLocation from "./components/SearchLocation";
import SearchLocation from "../components/SearchLocation/SearchLocation";
import { StyleList, filterdata } from "../constant";
import { useConfig, useMRTData, useMRTLine, useMap, useRegion } from "../hooks";
import { AllRegion, NortWest, SouthEast, StyleSatelliteStreet } from "../utils";

import DataBrowser from "../components/DataBrowser/DataBrowser";
import { useMicromarket } from "../hooks/useMicromarket";
import { useZoning } from "../hooks/useZoning";
import React from "react";

function Map2D() {
  // config map template 2d
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

  // region
  const { showAllRegion, showRegion } = useRegion(map);

  // Micro Market
  const { triggerMicromarket, resetMicromarket } = useMicromarket(map);

  // Zoning
  const { triggerZoning, resetZoning } = useZoning(map);

  // main map
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
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  }, []);

  return (
    <div className="App relative h-full">
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
      {/* <SearchLocation onSearchChange={handleSearch} />
      {filteringData.length > 0 && (
        <SearchList onClickAction={handleClick} filteringData={filteringData} />
      )}
      {!filteringData.length && search.length > 0 && <NotFound />} */}
      <div className="search-buttonradius-container">
        <button id="search-buttonradius">Search</button>
      </div>
      <FilterLine subMenu={subMenu} expandedMenu={expandedMenu} />

      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        <div id="filter"></div>
      </div>

      <div ref={mapContainer} className="h-full" />
    </div>
  );
}

export default Map2D;
