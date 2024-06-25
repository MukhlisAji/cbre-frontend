import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect } from "react";
import "./App.css";
import FilterLine from "./components/FilterLine";
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
  const { initalRegion, setInitialRegion } = useRegion(map)
  // main map
  const { filteringData, handleSearch, search } = useMap(styleMap, map, zoom)

  // MRT
  useMRTData(zoom, map)
  const { setShowMRT, showMRT } = useMRTLine(map)



  const handleClick = (coordinate) => {
    map.current.setCenter(coordinate);
    map.current.setZoom(15);
  };


  const handleReset = () => {
    if (initalRegion.length > 0) {
      initalRegion.forEach((item) => {
        const layerId = `region-${item}`;
        const sourceId = `sgregion-${item}`;

        // TODO : BUG
        // Remove the layer if it exists
        if (map.current.getLayer(layerId)) {
          map.current.removeLayer(layerId);
        }

        // TODO : BUG
        // Remove the source if it exists
        if (map.current.getSource(sourceId)) {
          map.current.removeSource(sourceId);
        }
      });
    }
  };

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

      {/* Todo: Fix Style so it looks better */}

      <FilterLine onClickAction={() => setShowMRT(!showMRT)} />
      <div style={{ position: 'absolute', bottom: 0, height: 'max-content', zIndex: 999999, display: 'flex', gap: '10px', }}>

        {StyleList.map((item, index) => (
          <button key={index} style={{ fontSize: '16px', width: '120px', height: '100px' }} onClick={() => handleChangeStyleMap(item.value)}>{item.label}</button>
        ))}

      </div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        {/* Filtering Region Button */}
        <div id="filter">
          {/* BUTTON TODO IS ALREADY BUG */}
          <button onClick={handleReset}>RESET</button>
          {filterdata.map((item, index) => (
            <button
              key={index}
              onClick={() =>
                setInitialRegion((prev) => {
                  return [...prev, item.REGIONCODE];
                })
              }
            >
              {item.REGIONNAME}
            </button>
          ))}
        </div>
      </div>

      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

export default App;
