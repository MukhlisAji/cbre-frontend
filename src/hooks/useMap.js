import mapboxgl from "mapbox-gl";
import { useEffect, useState } from "react";
import { createGeoJSONCircle } from "../helper";

export function useMap(styleMap, map, zoom) {
  const [dataMap, setDataMap] = useState();
  const [filteringData, setFilteringData] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearch = (searchValue) => {
    setSearch(searchValue);
    const lowerSearch = searchValue?.toLowerCase();
    const filtering = dataMap?.filter((item) => {
      const lowerTitle = item?.properties?.BUILDINGNAME?.toLowerCase();

      return lowerTitle?.includes(lowerSearch);
    });
    if (filteringData.length > 0) {
      map.current.setCenter(filtering?.[0]?.geometry?.coordinates);
      map.current.setZoom(15);
    }
    setFilteringData(filtering);
    if (searchValue.length === 0) {
      setFilteringData([]);
    }
  };

  map.current?.addSource(
    "polygon-radius-tes",
    createGeoJSONCircle([103.885863, 1.3434299], 0.5)
  );

  map.current?.addLayer({
    id: "polygon-radiusss",
    type: "fill",
    source: "polygon-radius-tes",
    layout: {},
    paint: {
      "fill-color": "blue",
      "fill-opacity": 0.6,
    },
  });

  const drawRadiusGeoJSON = (center, radius) => {
    const options = { steps: 64, units: "meters" };
    const circle = turf.circle(center, radius, options);

    // Menambahkan atau memperbarui sumber radius
    addOrUpdateSource("polygon-radius-tes", circle);

    // Menambahkan atau memperbarui lapisan radius
    addOrUpdateLayer("polygon-radiusss", "polygon-radius-tes", "fill", {
      "fill-color": "blue",
      "fill-opacity": 0.6,
    });

    // Menambahkan atau memperbarui lapisan outline radius
    addOrUpdateLayer("polygon-radius-outline", "polygon-radius-tes", "line", {
      "line-color": "blue",
      "line-width": 2,
    });
  };

  // const drawRadius = (center, radius) => {
  //   const options = { steps: 64, units: "meters" };
  //   const circle = turf.circle(center, radius, options);
  //   const lineString = turf.polygonToLineString(circle);

  //   // Add radius circle to map
  //   if (map.current.getSource("radius")) {
  //     map.current.getSource("radius").setData(lineString);
  //   } else {
  //     map.current.addLayer({
  //       id: "radius",
  //       type: "line",
  //       source: {
  //         type: "geojson",
  //         data: lineString,
  //       },
  //       layout: {},
  //       paint: {
  //         "line-color": "#007cbf",
  //         "line-width": 2,
  //       },
  //     });
  //   }
  // };

  const fetchApi = async () => {
    const res = await fetch(`http://103.127.134.145:3000/map`);
    // const res = await fetch(`http://103.127.134.145:3000/map-region/SG04`)
    const responseData = await res.json();
    setDataMap(responseData.geojson.features);

    responseData.geojson.features.forEach((location, index) => {
      // Create HTML element for the marker
      const el = document.createElement("div");
      el.className = "label-marker-map";

      // Create SVG element
      const svg = `
      <div class="marker-map">
      <div class="label-name-map">${location.properties.BUILDINGNAME}</div>
        <div class="label-icon-wrapper">
          <svg display="block" height="41px" width="27px" viewBox="0 0 27 41">
              <defs>
                  <radialGradient id="shadowGradient">
                      <stop offset="10%" stop-opacity="0.4"></stop>
                      <stop offset="100%" stop-opacity="0.05"></stop>
                  </radialGradient>
              </defs>
              <ellipse cx="13.5" cy="34.8" rx="10.5" ry="5.25" fill="url(#shadowGradient)"></ellipse>
              <path fill="#1b72e5" d="M27,13.5C27,19.07 20.25,27 14.75,34.5C14.02,35.5 12.98,35.5 12.25,34.5C6.75,27 0,19.22 0,13.5C0,6.04 6.04,0 13.5,0C20.96,0 27,6.04 27,13.5Z"></path>
              <path opacity="0.25" d="M13.5,0C6.04,0 0,6.04 0,13.5C0,19.22 6.75,27 12.25,34.5C13,35.52 14.02,35.5 14.75,34.5C20.25,27 27,19.07 27,13.5C27,6.04 20.96,0 13.5,0ZM13.5,1C20.42,1 26,6.58 26,13.5C26,15.9 24.5,19.18 22.22,22.74C19.95,26.3 16.71,30.14 13.94,33.91C13.74,34.18 13.61,34.32 13.5,34.44C13.39,34.32 13.26,34.18 13.06,33.91C10.28,30.13 7.41,26.31 5.02,22.77C2.62,19.23 1,15.95 1,13.5C1,6.58 6.58,1 13.5,1Z"></path>
          </svg>
          <div class="label-address-map">${index + 1}</div>
          </div>
        </div>
      `;

      // Append SVG and custom circle to marker element
      el.innerHTML = svg;

      // Add marker to map
      const marker = new mapboxgl.Marker(el);
      marker.setLngLat(location.geometry.coordinates).addTo(map.current);
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
      const mName = document.querySelectorAll(".label-name-map");
      mName.forEach((item) => {
        item.style.display = "none";
      });

      if (zoom > 14) {
        const mName = document.querySelectorAll(".label-name-map");
        mName.forEach((item) => {
          item.style.display = "block";
        });
      }
    });
  };

  useEffect(() => {
    fetchApi();
    // if (map.current) {
    //   map.current.on("load", () => {
    //     drawRadius([106.827183, -6.175394], 1000); // Pusat Monas, Jakarta dengan radius 1000 meter
    //   });
    // }
  }, [styleMap, localStorage.getItem("styleMap")]);

  return {
    dataMap,
    setDataMap,
    filteringData,
    setFilteringData,
    handleSearch,
    search,
  };
}
