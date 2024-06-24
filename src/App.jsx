import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./App.css";
import FilterLine from "./components/FilterLine";
import NotFound from "./components/NotFound";
import SearchList from "./components/SearchList";
import SearchLocation from "./components/SearchLocation";
import { StyleList } from "./constant";
import { convertSearchParamsToObject } from './helper/convertSearchParamsToObject';
import data from "./utils/data.json";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_KEY;

function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(data.geometry.coordinates[0][0]);
  const [lat, setLat] = useState(data.geometry.coordinates[0][1]);
  const [zoom, setZoom] = useState(10);
  const [showMRT, setShowMRT] = useState(false);
  const [dataJson, setDataJson] = useState([]);
  const [dataRegionJson, setDataRegionJson] = useState([]);
  const [filteringData, setFilteringData] = useState([]);
  const [search, setSearch] = useState("");
  const [initalRegion, setInitialRegion] = useState([]);
  const [styleMap, setStyleMap] = useState("mapbox://styles/rajifmahendra/clxrims5h002k01pf1imoen80");
  const [searchParams, setSearchParams] = useSearchParams()
  const query = convertSearchParamsToObject(searchParams.toString())

  var filterdata = [
    {
      REGIONCODE: "SG03",
      REGIONNAME: "North West",
    },
    {
      REGIONCODE: "SG04",
      REGIONNAME: "South East",
    },
    {
      REGIONCODE: "SG05",
      REGIONNAME: "South West",
    },
  ];

  const colorMap = {
    NE: "#9900aa",
    DT: "#005ec4",
    NS: "#d42e12",
    CC: "#fa9e0d",
    CE: "#fa9e0d",
    EW: "#009645",
    CG: "#009645",
    TE: "#9d5b25",
    BP: "#748477",
    SE: "#748477",
    SW: "#748477",
    PE: "#748477",
    PW: "#748477",
    PTC: "#748477",
    STC: "#748477",
  };

  const code2Color = (code) =>
    colorMap[code.match(/[a-z]+/i)[0].toUpperCase()] || "gray";

  const colorArray = Object.entries(colorMap);

  function getColor(key) {
    for (let [prefix, color] of colorArray) {
      if (key.includes(prefix)) {
        return color;
      }
    }
    return null;
  }

  const handleSearch = (e) => {
    setSearch(e?.target?.value);
    const lowerSearch = e?.target?.value?.toLowerCase();
    const filtering = dataJson?.filter((item) => {
      const lowerTitle = item?.properties?.BUILDINGNAME?.toLowerCase();

      return lowerTitle?.includes(lowerSearch);
    });
    if (filteringData.length > 0) {
      map.current.setCenter(filtering?.[0]?.geometry?.coordinates);
      map.current.setZoom(15);
    }
    setFilteringData(filtering);
    if (e?.target?.value.length === 0) {
      setFilteringData([]);
    }
  };

  const handleClick = (coordinate) => {
    map.current.setCenter(coordinate);
    map.current.setZoom(15);
  };

  const fetchApi = async () => {
    const res = await fetch(`http://103.127.134.145:3000/map`);
    // const res = await fetch(`http://103.127.134.145:3000/map-region/SG04`)
    const responseData = await res.json();
    setDataJson(responseData.geojson.features);
    // if (responseData?.region?.POLYGON) {
    //   var filterdata = [
    //     {
    //       "REGIONCODE": "SG03",
    //       "REGIONNAME": "North West"
    //     },
    //     {
    //       "REGIONCODE": "SG04",
    //       "REGIONNAME": "South East"
    //     },
    //     {
    //       "REGIONCODE": "SG05",
    //       "REGIONNAME": "South West"
    //     }
    //   ]

    //   filterdata.forEach(function (d) {
    //     const target = document.getElementById("filter");
    //     target.innerHTML += "<button>" + d.REGIONNAME + "</button>";
    //   });
    //   setDataRegionJson(responseData.region.POLYGON)
    //   map.current.addSource('sgregion', {
    //     'type': 'geojson',
    //     // 'data': 'http://localhost:4000/geojson/default.geojson'
    //     'data': responseData.region.POLYGON
    //   });
    //   map.current.addLayer({
    //     'id': 'region',
    //     'type': 'fill',
    //     'source': 'sgregion',
    //     'paint': {
    //       'fill-color': ['get', 'color'],
    //       'fill-opacity': 0.5
    //     }
    //   });
    // }
    responseData.geojson.features.forEach((location) => {
      const marker = new mapboxgl.Marker()
        .setLngLat(location.geometry.coordinates)
        .addTo(map.current);
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
      <div class="popup-container">
        <div class="info-box">
      <h3>${location.properties.BUILDINGNAME}</h3>
      <p><strong>Address:</strong> ${location.properties.BUILDINGNAME}, ${location.properties.BUILDINGADDRESS_POSTCODE}</p>
      <p><strong>Building Status:</strong> ${location.properties.BUILDINGSTATUS_EN}</p>
      <p><strong>Gross Floor Area:</strong> ${location.properties.GROSS_FLOOR_AREA} sq ft</p>
      <p><strong>Net Lettable Area:</strong> ${location.properties.NET_LETTABLE_AREA} sq ft</p>
      <p><strong>Location:</strong> ${location.properties.MICROMARKET}</p>
    </div>
    </div>
    `);

      marker.setPopup(popup);
    });
  };
  const RegionData = async () => {
    if (initalRegion.length > 0) {
      const res = await fetch(
        `http://103.127.134.145:3000/map-region/${initalRegion[initalRegion.length - 1]
        }`
      );
      const responseData = await res.json();
      // if (responseData?.REGIONNAME !== initalRegion) {
      //   map.current.removeLayer({
      //     'id': `'region-${initalRegion}'`,
      //     'type': 'fill',
      //     'source': `sgregion-${initalRegion}`,
      //   })
      // }
      // console.log(initalRegion)
      if (responseData?.region?.POLYGON) {
        setDataRegionJson(responseData.region.POLYGON);

        // initalRegion.forEach((item) => {
        //   console.log(item, 'tes-item')
        //   map.current.addSource(`sgregion-${item}`, {
        //     'type': 'geojson',
        //     // 'data': 'http://localhost:4000/geojson/default.geojson'
        //     'data': responseData.region.POLYGON
        //   });

        //   map.current.addLayer({
        //     'id': `'region-${item}'`,
        //     'type': 'fill',
        //     'source': `sgregion-${item}`,
        //     'paint': {
        //       'fill-color': ['get', 'color'],
        //       'fill-opacity': 0.5
        //     }
        //   });
        // })
        map.current.addSource(
          `sgregion-${initalRegion[initalRegion.length - 1]}`,
          {
            type: "geojson",
            // 'data': 'http://localhost:4000/geojson/default.geojson'
            data: responseData.region.POLYGON,
          }
        );

        map.current.addLayer({
          id: `'region-${initalRegion[initalRegion.length - 1]}'`,
          type: "fill",
          source: `sgregion-${initalRegion[initalRegion.length - 1]}`,
          paint: {
            "fill-color": ["get", "color"],
            "fill-opacity": 0.5,
          },
        });
      }
    }
  };

  const MRTLineData = async () => {
    const res = await fetch(
      "http://103.127.134.145:3000/map-transportation/line"
    );
    const responseData = await res.json();
    const geoJson = responseData.geojson;
    map.current.addSource("line", {
      type: "geojson",
      data: geoJson,
    });
    map.current.addLayer({
      id: "line",
      type: "line",
      source: "line",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": ["get", "color"],
        "line-width": 4,
      },
    });

    // Add click event listener to the map
    map.on("click", "region", function (e) {
      var features = map.queryRenderedFeatures(e.point);
      if (!features.length) {
        return;
      }

      var f = features[0];
      $("#console-output").html(``);
      $("#console-output").html(
        `> Hey, you're click on -> Region ` + f.properties.name
      );
    });
  };

  const generatedColor = (color) => {
    if (color == "#fa9e0d") {
      return "#000;";
    }
    return null;
  };
  const generatedRounded = (index, length) => {
    if (index === 0 && length === 1) {
      return "border-radius: 100px";
    } else if (index === length - 1) {
      return "border-top-right-radius: 100px; border-bottom-right-radius: 100px";
    } else if (index === 1 && length === 3) {
      return "border-radius: 0px";
    } else if (index === 0 && length === 3) {
      return "border-top-left-radius: 100px; border-bottom-left-radius: 100px";
    }
  };

  const MRTStationData = async () => {
    const res = await fetch(
      "http://103.127.134.145:3000/map-transportation/label"
    );
    const responseData = await res.json();
    responseData?.geojson?.features?.forEach((station) => {
      if (station.properties.lines) {
        const values = station.properties.lines.filter((value) => value);
        let linesOutput = "";

        linesOutput += `<div class="marker-testing">`;
        values.forEach((value, index, array) => {
          const prefix = value.match(/^[A-Z]+/)[0];
          const separated = value.replace(/([A-Z]+)(\d+)/, "$1 $2");
          const color = colorMap[prefix] || "gray";
          if (color) {
            linesOutput += `<span class="${color}" style="padding: 0.3em 10px; display: inline-block; line-height: 1; background-color: ${color}; font-size: 15px; color: ${generatedColor(
              color
            )}; ${generatedRounded(index, array.length)};">${separated}</span>`;
          }
        });
        linesOutput += `</div>`;

        const element = document.createElement("div");
        element.innerHTML = `
    <div class="container-marker-name-testing">
      <div class="marker-name-testing">${station?.properties?.name}</div>
      <div class="icon-wrapper">
       ${
         station?.properties?.network === "mrt"
           ? `
           <svg
             width="15px"
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 448 512"
           >
             <path
               fill="#ffffff"
               d="M96 0C43 0 0 43 0 96V352c0 48 35.2 87.7 81.1 94.9l-46 46C28.1 499.9 33.1 512 43 512H82.7c8.5 0 16.6-3.4 22.6-9.4L160 448H288l54.6 54.6c6 6 14.1 9.4 22.6 9.4H405c10 0 15-12.1 7.9-19.1l-46-46c46-7.1 81.1-46.9 81.1-94.9V96c0-53-43-96-96-96H96zM64 128c0-17.7 14.3-32 32-32h80c17.7 0 32 14.3 32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V128zM272 96h80c17.7 0 32 14.3 32 32v96c0 17.7-14.3 32-32 32H272c-17.7 0-32-14.3-32-32V128c0-17.7 14.3-32 32-32zM64 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm288-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
             />
           </svg>`
           : `<svg
           width="15px"
           xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 448 512"
         >
           <path
             fill="#ffffff"
             d="M86.8 48c-12.2 0-23.6 5.5-31.2 15L42.7 79C34.5 89.3 19.4 91 9 82.7S-3 59.4 5.3 49L18 33C34.7 12.2 60 0 86.8 0H361.2c26.7 0 52 12.2 68.7 33l12.8 16c8.3 10.4 6.6 25.5-3.8 33.7s-25.5 6.6-33.7-3.7L392.5 63c-7.6-9.5-19.1-15-31.2-15H248V96h40c53 0 96 43 96 96V352c0 30.6-14.3 57.8-36.6 75.4l65.5 65.5c7.1 7.1 2.1 19.1-7.9 19.1H365.3c-8.5 0-16.6-3.4-22.6-9.4L288 448H160l-54.6 54.6c-6 6-14.1 9.4-22.6 9.4H43c-10 0-15-12.1-7.9-19.1l65.5-65.5C78.3 409.8 64 382.6 64 352V192c0-53 43-96 96-96h40V48H86.8zM160 160c-17.7 0-32 14.3-32 32v32c0 17.7 14.3 32 32 32H288c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32H160zm32 192a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm96 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"
           />
         </svg>`
       }
      </div>
      </div>
      ${linesOutput}
    `;

        const markerNameLabel = new mapboxgl.Marker(element);
        markerNameLabel
          .setLngLat(station.geometry.coordinates)
          .addTo(map.current);

        let hoverPopup;

        element.addEventListener("mouseenter", () => {
          hoverPopup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
            <div class="popup-container">
                <div class="popup-image">
                    <img src="${station.properties.wikipedia_image_url}" alt="No Image" />
                </div>
                <div class="info-box">
                    <h3>${station.properties.name}</h3>
                    <div class="other-info">
                        <p><strong>In Hindi:</strong> ${station.properties.name_hi}</p>
                        <p><strong>In Chinese:</strong> ${station.properties.name_zh}</p>
                        <p><strong>Line:</strong> NS23</p>
                        <p><strong>Network:</strong> ${station.properties.network}</p>
                    </div>
                    <p><strong>Type:</strong> ${station.properties.type}</p>
                    <a href="${station.properties.wikipedia_url}" target="_blank">More Info</a>
                </div>
            </div>`);
          hoverPopup.setLngLat(station.geometry.coordinates).addTo(map.current);
          element.hoverPopup = hoverPopup;

          hoverPopup.getElement().addEventListener("mouseleave", () => {
            hoverPopup.remove();
            element.hoverPopup = null;
          });
        });

        element.addEventListener("mouseleave", () => {
          if (hoverPopup && !hoverPopup.getElement().matches(":hover")) {
            hoverPopup.remove();
            element.hoverPopup = null;
          }
        });

        // const name = document.createElement("p");
        // name.innerHTML = `<p class="marker-name" style="font-size: 28px">${station.properties.BUILDINGNAME}</p>`;
        // const markerName = new mapboxgl.Marker(name);
        // markerName.setLngLat(station.geometry.coordinates);

        markerNameLabel
          .setLngLat(station.geometry.coordinates)
          .addTo(map.current);
      }
      // const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
      //     <div class="popup-container">
      //         <div class="popup-image">
      //             <img src="${station.properties.wikipedia_image_url}" alt="No Image" />
      //         </div>
      //         <div class="info-box">
      //             <h3>${station.properties.name}</h3>
      //             <div class="other-info">
      //                 <p><strong>In Hindi:</strong> ${station.properties.name_hi}</p>
      //                 <p><strong>In Chinese:</strong> ${station.properties.name_zh}</p>
      //                 <p><strong>Line:</strong> NS23</p>
      //                 <p><strong>Network:</strong> ${station.properties.network}</p>
      //             </div>
      //             <p><strong>Type:</strong> ${station.properties.type}</p>
      //             <a href="${station.properties.wikipedia_url}" target="_blank">More Info</a>
      //         </div>
      //     </div>`);

      // marker.setPopup(popup);

      const markerLabel = document.querySelectorAll(".marker-testing");
      markerLabel.forEach((item) => {
        item.style.display = "none";
      });

      const markerName = document.querySelectorAll(
        ".container-marker-name-testing"
      );
      markerName.forEach((item) => {
        item.style.display = "none";
      });

      if (zoom < 15) {
        const mLabel = document.querySelectorAll(".marker-testing");
        mLabel.forEach((item) => {
          item.style.display = "none";
        });
      }

      if (zoom < 17) {
        const mName = document.querySelectorAll(
          ".container-marker-name-testing"
        );
        mName.forEach((item) => {
          item.style.display = "none";
        });
      }
    });
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
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      //style: "mapbox://styles/mapbox/streets-v12",
      style: searchParams.get("style"),
      center: [lng, lat],
      zoom: zoom,
    });
    map.current.addControl(new mapboxgl.NavigationControl());
    map.current.addControl(new mapboxgl.FullscreenControl());
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );
    fetchApi();
    // MRTStationData()

    map.current.on("click", "polygon-fill", (e) => {
      const coordinates = e.lngLat;
      const { title, description } = e.features[0].properties;

      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(<p>${description}</p>)
        .addTo(map.current);
    });

    map.current.on("load", () => {
      map.current.addSource("polygon", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [data.geometry.coordinates],
          },
        },
      });

      map.current.addLayer({
        id: "line-layer",
        type: "line",
        source: "polygon",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#cc234a",
          "line-width": 2,
        },
      });
    });

    // label
    map.current.on("zoom", () => {
      const currentZoom = map.current.getZoom().toFixed(2);
      const markerLabels = document.querySelectorAll(".tes");
      markerLabels.forEach((item) => {
        item.style.display = currentZoom < 12 ? "none" : "flex";
      });
    });
  }, [styleMap, searchParams.get("style")]);

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  }, []);

  useEffect(() => {
    MRTStationData();
  }, []);

  useEffect(() => {
    if (zoom < 14) {
      const markerLabel = document.querySelectorAll(".marker-testing");
      markerLabel.forEach((item) => {
        item.style.display = "none";
      });
    } else if (zoom >= 14) {
      const markerLabel = document.querySelectorAll(".marker-testing");
      markerLabel.forEach((item) => {
        item.style.display = "flex";
      });
    }

    if (zoom < 15) {
      const markerName = document.querySelectorAll(
        ".container-marker-name-testing"
      );
      markerName.forEach((item) => {
        item.style.display = "none";
      });
    } else if (zoom >= 15) {
      const markerName = document.querySelectorAll(
        ".container-marker-name-testing"
      );
      markerName.forEach((item) => {
        item.style.display = "flex";
      });
    }
  }, [zoom]);

  useEffect(() => {
    if (showMRT) {
      MRTLineData();
    } else {
      if (map.current.getLayer("line")) {
        map.current.removeLayer("line");
      }
      if (map.current.getSource("line")) {
        map.current.removeSource("line");
      }
    }
  }, [showMRT]);

  useEffect(() => {
    RegionData();
  }, [initalRegion]);



  const handleChangeStyleMap = (value) => {

    setStyleMap(value)
    setSearchParams({ ...query, style: value })
    window.location.reload()
  }
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
