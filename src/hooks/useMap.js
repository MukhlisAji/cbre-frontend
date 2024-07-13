// import MapboxDraw from "@mapbox/mapbox-gl-draw";
import mapboxgl from "mapbox-gl";
// import {
//   CircleMode,
//   DirectMode,
//   DragCircleMode,
//   SimpleSelectMode,
// } from "mapbox-gl-draw-circle";
import * as turf from "@turf/turf";
import { useEffect, useState } from "react";

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

  // // userProperties has to be enabled
  // const draw = new MapboxDraw({
  //   defaultMode: "draw_circle",
  //   userProperties: true,
  //   modes: {
  //     ...MapboxDraw.modes,
  //     draw_circle: CircleMode,
  //     drag_circle: DragCircleMode,
  //     direct_select: DirectMode,
  //     simple_select: SimpleSelectMode,
  //   },
  // });

  // // Add this draw object to the map when map loads
  // // if(map.current.getControls().getArray().length === 0) {
  // //   map.current.addControl(draw);
  // // }

  // useEffect(() => {
  //   // Add draw control if it hasn't been added yet
  //   if (map.current) {
  //     map.current.addControl(draw);
  //   }
  // }, [map]);

  // function createCircle(center, radius) {
  //   const steps = 64;
  //   const circleCoordinates = [];

  //   for (let i = 0; i < dataMap.length; i++) {
  //     const angle = (i * 360) / steps;
  //     const radians = angle * (Math.PI / 180);
  //     const dx = radius * Math.cos(radians);
  //     const dy = radius * Math.sin(radians);

  //     const deltaLat = dy / 111320;
  //     const deltaLng = dx / (111320 * Math.cos((center[1] * Math.PI) / 180)); // Longitude

  //     circleCoordinates.push([center[0] + deltaLng, center[1] + deltaLat]);
  //   }
  //   circleCoordinates.push(circleCoordinates[0]);
  //   return {
  //     type: "Feature",
  //     geometry: {
  //       type: "Polygon",
  //       coordinates: [circleCoordinates],
  //     },
  //   };
  // }
  // let circleLayer = null;
  // map.current?.on("click", function (e) {
  //   const center = [e.lngLat.lng, e.lngLat.lat];
  //   const radius = 2000;

  //   if (circleLayer) {
  //     map.current?.removeLayer(circleLayer);
  //     map.current?.removeSource(circleLayer);
  //   }
  //   const circleFeature = createCircle(center, radius);

  //   map.current?.addSource("circlesource", {
  //     type: "geojson",
  //     data: {
  //       type: "FeatureCollection",
  //       features: [circleFeature],
  //     },
  //   });

  //   map.current?.addLayer({
  //     id: "circle",
  //     type: "fill",
  //     source: "circlesource",
  //     layout: {},
  //     paint: {
  //       "fill-color": "#F3C294",
  //       "fill-opacity": 0.4,
  //     },
  //   });

  //   circleLayer = "circle";
  // });

  // const drawRadiusGeoJSON = (center, radius) => {
  //   //  const circleFeature = createCircle(center, radius);

  //   map.current.addSource("circlesource", {
  //     type: "geojson",
  //     data: {
  //       type: "FeatureCollection",
  //       features: [
  //         {
  //           type: "Feature",
  //           geometry: {
  //             type: "Polygon",
  //             coordinates: [106.827183, -6.175394],
  //           },
  //         },
  //       ],
  //     },
  //   });

  //   map.current.addLayer({
  //     id: "circleid",
  //     type: "fill",
  //     source: "circlesource",
  //     layout: {},
  //     paint: {
  //       "fill-color": "#F3C294",
  //       "fill-opacity": 0.4,
  //     },
  //   });

  //   console.log("Added new source and layers");
  // };

  function createCircle(center, radius) {
    const options = { steps: 64, units: "meters" };
    const circle = turf.circle(center, radius, options);
    return circle;
  }

  function updateCircle(center, radius) {
    const updatedCircle = createCircle(center, radius);
    map.current.getSource("circle").setData(updatedCircle);
  }

  useEffect(() => {
    console.log("tes");
    if (map.current) {
      // add circle part 2
      let circleFeature = null;
      let centerPoint = null;
      let radius = 2000;
      let isDragging = false;
      let resizing = false;

      function addCircle(center, radius) {
        // Cek apakah source dengan ID "circle" sudah ada
        console.log("coba");
        if (map.current.getSource("circle")) {
          // console.log('Source "circle" already exists.');
          return;
        }

        circleFeature = createCircle(center, radius);

        map.current.addSource("circle", {
          type: "geojson",
          data: circleFeature,
        });

        map.current.addLayer({
          id: "circle",
          type: "fill",
          source: "circle",
          layout: {},
          paint: {
            "fill-color": "#F3C294",
            "fill-opacity": 0.4,
          },
        });

        map.current.addLayer({
          id: "circle-outline",
          type: "line",
          source: "circle",
          layout: {},
          paint: {
            "line-color": "#000",
            "line-width": 2,
          },
        });
      }

      map.current.on("click", function (e) {
        if (resizing) {
          resizing = false;
          return;
        }

        if (circleFeature && !isDragging) {
          const coordinates =
            map.current.getSource("circle")._data.geometry.coordinates[0];
          const point = [e.lngLat.lng, e.lngLat.lat];
          if (turf.booleanPointInPolygon(point, turf.polygon([coordinates]))) {
            console.log("Center:", centerPoint);
            console.log("Radius (meters):", radius);
            return;
          }
          map.current.removeLayer("circle");
          map.current.removeLayer("circle-outline");
          map.current.removeSource("circle");
          circleFeature = null;
          return;
        }

        const center = [e.lngLat.lng, e.lngLat.lat];
        centerPoint = center;
        radius = 2000;

        if (circleFeature) {
          map.current.removeLayer("circle");
          map.current.removeLayer("circle-outline");
          map.current.removeSource("circle");
        }

        addCircle(center, radius);

        // Disable map dragPan when clicking inside the circle
        map.current.dragPan.disable();
      });

      map.current.on("mousemove", function (e) {
        if (!circleFeature) return;

        const coordinates =
          map.current.getSource("circle")._data.geometry.coordinates[0];
        const point = [e.lngLat.lng, e.lngLat.lat];

        if (turf.booleanPointInPolygon(point, turf.polygon([coordinates]))) {
          map.current.getCanvas().style.cursor = "move";
          map.current.dragPan.disable(); // Disable map dragPan when mouse is inside circle
        } else {
          map.current.getCanvas().style.cursor = "";
          map.current.dragPan.enable(); // Enable map dragPan when mouse is outside circle
        }

        if (isDragging) {
          const dragRadius = turf.distance(
            centerPoint,
            [e.lngLat.lng, e.lngLat.lat],
            { units: "meters" }
          );
          radius = dragRadius;
          updateCircle(centerPoint, radius);
        }
      });

      map.current.on("mousedown", function (e) {
        if (!circleFeature) return;

        const coordinates =
          map.current.getSource("circle")._data.geometry.coordinates[0];
        const point = [e.lngLat.lng, e.lngLat.lat];

        if (turf.booleanPointInPolygon(point, turf.polygon([coordinates]))) {
          isDragging = true;
          resizing = true;
          map.current.getCanvas().style.cursor = "nwse-resize";
          map.current.dragPan.disable(); // Disable map dragPan when resizing starts
        }
      });

      map.current.on("mouseup", function () {
        if (isDragging) {
          isDragging = false;
          resizing = false;
          map.current.getCanvas().style.cursor = "";
          console.log("Updated Radius (meters):", radius);
          console.log("Center:", centerPoint);
          map.current.dragPan.enable(); // Enable map dragPan when resizing ends
        }
      });

      map.current.on("mouseleave", function () {
        if (isDragging) {
          isDragging = false;
          resizing = false;
          map.current.getCanvas().style.cursor = "";
          map.current.dragPan.enable(); // Enable map dragPan when mouse leaves map
        }
      });
    }
  }, [map]);

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
    //   map.current?.on("load", () => {
    //     const draw = new MapboxDraw({
    //       displayControlsDefault: false,
    //       controls: {
    //         polygon: true,
    //         trash: true,
    //       },
    //     });

    //     map.current?.addControl(draw);

    //     // Add a circle to the map for demonstration purposes
    //     const center = [106.827183, -6.175394]; // Example center point
    //     const radius = 1000; // Example radius in meters
    //     const circleFeature = turf.circle(center, radius, {
    //       steps: 64,
    //       units: "meters",
    //     });

    //     draw.add({
    //       type: "FeatureCollection",
    //       features: [circleFeature],
    //     });
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
