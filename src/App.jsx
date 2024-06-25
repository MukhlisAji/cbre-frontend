import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect } from "react";
import "./App.css";
import IconLine from './assets/jalur.png';
import FilterLine from "./components/FilterLine/FilterLine";
import NotFound from "./components/NotFound";
import SearchList from "./components/SearchList";
import SearchLocation from "./components/SearchLocation";
import { StyleList, filterdata } from "./constant";
import { useConfig } from "./hooks/useConfig";
import { useMRTData, useMRTLine } from "./hooks/useMRT";
import { useMap } from "./hooks/useMap";
import { useRegion } from "./hooks/useRegion";



function App() {

  // config map
  const { lat, lng, map, mapContainer, zoom, setLat, setLng, setZoom, styleMap, handleChangeStyleMap } = useConfig()

  // region
  const { setInitialRegion, showAllRegion, showRegion } = useRegion(map)
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
      name: "Line MRT/LTR",
      icon: IconLine,
      onClick: () => {
        setShowMRT(prev => !prev);
      },
    },
    {
      name: "North West",
      icon: IconLine,
      onClick: () => showRegion("SG03"),
    },
    {
      name: "South East",
      icon: IconLine,
      onClick: () => showRegion("SG04"),
    },

    {
      name: "Style Satellite Street",
      icon: IconLine,
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
          icon: IconLine,
          onClick: () => {
            showRegion(data.REGIONCODE)
          },
        })),
        {
          name: "All Region",
          icon: IconLine,
          onClick: showAllRegion,
        },

      ],
    },
    {
      label: "Type Map",
      items: [
        ...StyleList.map((data) => ({
          name: data.label,
          icon: IconLine,
          onClick: () => {
            handleChangeStyleMap(data.value);
          },
        })),
      ],
    },
  ];


  // const handleReset = () => {
  //   if (initialRegion.length > 0) {
  //     initialRegion.forEach((item) => {
  //       const layerId = `region-${item}`;
  //       const sourceId = `sgregion-${item}`;

  //       // TODO : BUG
  //       // Remove the layer if it exists
  //       if (map.current.getLayer(layerId)) {
  //         map.current.removeLayer(layerId);
  //       }

  //       // TODO : BUG
  //       // Remove the source if it exists
  //       if (map.current.getSource(sourceId)) {
  //         map.current.removeSource(sourceId);
  //       }
  //     });
  //   }
  // };

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
      <SearchLocation onSearchChange={handleSearch} />
      {filteringData.length > 0 && (
        <SearchList onClickAction={handleClick} filteringData={filteringData} />
      )}
      {!filteringData.length && search.length > 0 && <NotFound />}



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
