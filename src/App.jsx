import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect } from "react";
import "./App.css";
import IconLine from './assets/jalur.png';
import FilterLine from "./components/FilterLine/FilterLine";
import NotFound from "./components/NotFound";
import SearchList from "./components/SearchList";
// import SearchLocation from "./components/SearchLocation";
import { StyleList, filterdata } from "./constant";
import { useConfig, useMRTData, useMRTLine, useMap, useRegion } from './hooks';
import { AllRegion, NortWest, SouthEast, StyleSatelliteStreet } from './utils';
import SearchLocation from "./components/SearchLocation/SearchLocation";



function App() {

  // config map
  const { lat, lng, map, mapContainer, zoom, setLat, setLng, setZoom, styleMap, handleChangeStyleMap } = useConfig()

  // region
  const { showAllRegion, showRegion } = useRegion(map)
  // main map
  const { filteringData, handleSearch, search } = useMap(styleMap, map, zoom)

  // MRT
  useMRTData(zoom, map)
  const { setShowMRT } = useMRTLine(map)



  const handleClick = (coordinate) => {
    map.current.setCenter(coordinate);
    map.current.setZoom(15);
  };

  const subMenu = [
    {
      name: "Line MRT/LRT",
      icon: IconLine,
      onClick: () => {
        setShowMRT(prev => !prev);
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
            showRegion(data.REGIONCODE)
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
    <div className="App">
      <SearchLocation onSearchChange={handleSearch} filteringData={filteringData} search={search} onClickAction={handleClick} />
      {/* <SearchLocation onSearchChange={handleSearch} />
      {filteringData.length > 0 && (
        <SearchList onClickAction={handleClick} filteringData={filteringData} />
      )}
      {!filteringData.length && search.length > 0 && <NotFound />} */}



      <FilterLine subMenu={subMenu} expandedMenu={expandedMenu} />

      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}

        <div id="filter">

        </div>
      </div>

      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

export default App;
