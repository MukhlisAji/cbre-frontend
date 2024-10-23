import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import mapboxgl from "mapbox-gl";
import * as turf from "@turf/turf";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { CONFIG_APP } from "../config/app";
import { buildAtom } from "../pages/project/store/build";
import "./mapboxGeocoder.css";

export function useMap(styleMap, map, zoom, triggerRadius) {
  const [dataMap, setDataMap] = useState();
  const [filteringData, setFilteringData] = useState([]);
  const [search, setSearch] = useState("");
  const handleClick = useRef(null);
  const handleMouseMove = useRef(null);
  const handleMouseDown = useRef(null);
  const handleMouseUp = useRef(null);
  const handleMouseLeave = useRef(null);
  const [build, setBuild] = useAtom(buildAtom);


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

  useEffect(() => {
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [-74.5, 40],
        zoom: 9,
      });
    }

    // // Add geocoder
    // if (!document.querySelector(".mapboxgl-ctrl-geocoder")) {
    //   const geocoder = new MapboxGeocoder({
    //     accessToken: mapboxgl.accessToken,
    //     mapboxgl: mapboxgl,
    //     marker: false,
    //   });

    //   map.current.addControl(geocoder);

    //   geocoder.on("result", (e) => {
    //     const center = e.result.center;
    //     map.current.flyTo({
    //       center: center,
    //       zoom: 14,
    //     });
    //   });

    //   const filteringDiv = document.querySelector(".filtering");
    //   const mapboxglCtrlGeocoder = document.querySelector(
    //     ".mapboxgl-ctrl-geocoder.mapboxgl-ctrl"
    //   );

    //   // Apply styles to geocoder container
    //   Object.assign(mapboxglCtrlGeocoder.style, {
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     width: "100%",
    //     margin: "0 auto",
    //   });

    //   // Apply styles to geocoder input
    //   const geocoderInput = mapboxglCtrlGeocoder.querySelector("input");
    //   if (geocoderInput) {
    //     Object.assign(geocoderInput.style, {
    //       height: "2rem",
    //       padding: "0.5rem",
    //       borderRadius: "4px",
    //       width: "100%",
    //     });
    //   }

    //   filteringDiv.insertBefore(mapboxglCtrlGeocoder, filteringDiv.firstChild);
    // }

    const addCircleEvents = () => {
      let circleFeature = null;
      let centerPoint = null;
      let radius = 2000;
      let isDragging = false;
      let resizing = false;

      const createCircle = (center, radius) => {
        const options = { steps: 64, units: "meters" };
        const circle = turf.circle(center, radius, options);
        return circle;
      };

      const updateCircle = (center, radius) => {
        const updatedCircle = createCircle(center, radius);
        map.current.getSource("circle").setData(updatedCircle);
        const extremes = findExtremes()
        const new_extremes = {
          type: 'FeatureCollection',
          features: extremes.map(coord => ({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: coord // Ensure `coord` is in [longitude, latitude] format
            },
            properties: {} // Optional: You can add properties if needed
          }))
        }
        map.current.getSource("pointer").setData(new_extremes);
      };

      const addCircle = (center, radius) => {
        if (map.current.getSource("circle")) {
          return;
        }

        circleFeature = createCircle(center, radius);

        map.current.addSource("circle", {
          type: "geojson",
          data: circleFeature,
        });

        const coordinates = findExtremes()

        map.current.addSource('pointer', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: coordinates.map(coord => ({
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: coord
              }
            }))
          }
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

        map.current.addLayer({
          id: 'pointer-layer',
          type: 'circle',
          source: 'pointer',
          paint: {
            'circle-radius': 5, // Fixed radius of 10 pixels, constant across all zoom levels
            'circle-color': 'white', // Red color
            'circle-opacity': 1, // 50% opacity
            'circle-stroke-width': 2, // Border width of 2 pixels
            'circle-stroke-color': 'black', // Border color (black)
            'circle-stroke-opacity': 1
          }
        });
        removeMarkers();
        // 3
        // document.getElementById("search-buttonradius").style.display = "block";
        // document.getElementById("clear-buttonradius").style.display = "block";
      };

      handleClick.current = function (e) {
        if (!triggerRadius) {
          return;
        }

        if (resizing) {
          resizing = false;
          return;
        }

        if (circleFeature && !isDragging) {

          // const coordinates =
          //   map.current.getSource("circle")._data.geometry.coordinates[0];
          // const point = [e.lngLat.lng, e.lngLat.lat];
          // if (turf.booleanPointInPolygon(point, turf.polygon([coordinates]))) {
          //   return;
          // }
          // map.current.removeLayer("circle");
          // map.current.removeLayer("circle-outline");
          // map.current.removeSource("circle");
          // removeMarkers()
          // circleFeature = null;
          // document.getElementById("search-buttonradius").style.display = "none";
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
        map.current.dragPan.disable();
      };

      handleMouseMove.current = function (e) {
        if (!triggerRadius || !circleFeature) {
          return;
        }

        const coordinates = map.current.getSource("circle")._data.geometry.coordinates[0];
        const point = [e.lngLat.lng, e.lngLat.lat];

        if (isPointExactMatch(point, findExtremes())) {
          map.current.getCanvas().style.cursor = "move";
          map.current.dragPan.disable();
        } else {
          map.current.getCanvas().style.cursor = "";
          map.current.dragPan.enable();
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
      };

      const findExtremes = () => {
        const coords = map.current.getSource("circle")._data.geometry.coordinates[0]
        const topMost = coords[0];
        const bottomMost = coords[Math.floor(coords.length / 4)]; // Approximate
        const leftMost = coords[Math.floor(coords.length / 2)];
        const rightMost = coords[Math.floor(3 * coords.length / 4)];

        return [topMost, bottomMost, leftMost, rightMost];
      };
      const isPointExactMatch = (pointToCheck, coordinates) => {
        return coordinates.some(coord =>
          parseFloat(coord[0].toFixed(2)) === parseFloat(pointToCheck[0].toFixed(2)) &&
          parseFloat(coord[1].toFixed(2)) === parseFloat(pointToCheck[1].toFixed(2))
        );
      };


      handleMouseDown.current = function (e) {

        if (!triggerRadius || !circleFeature) {
          return;
        }

        const extremes = findExtremes()


        if (isPointExactMatch([e.lngLat.lng, e.lngLat.lat], extremes)) {

          isDragging = true;
          resizing = true;
          map.current.getCanvas().style.cursor = "nwse-resize";
          map.current.dragPan.disable();
        }

        // const coordinates =
        //   map.current.getSource("circle")._data.geometry.coordinates[0];
        // const point = [e.lngLat.lng, e.lngLat.lat];

        // if (turf.booleanPointInPolygon(point, turf.polygon([coordinates]))) {
        //   isDragging = true;
        //   resizing = true;
        //   map.current.getCanvas().style.cursor = "nwse-resize";
        //   map.current.dragPan.disable();
        // }
      };

      handleMouseUp.current = function () {
        if (!triggerRadius) {
          return;
        }
        if (isDragging) {
          isDragging = false;
          resizing = false;
          map.current.getCanvas().style.cursor = "";
          map.current.dragPan.enable();
        }
      };

      handleMouseLeave.current = function () {
        if (!triggerRadius) {
          return;
        }
        if (isDragging) {
          isDragging = false;
          resizing = false;
          map.current.getCanvas().style.cursor = "";
          map.current.dragPan.enable();
        }
      };

      map.current.on("click", handleClick.current);
      map.current.on("mousemove", handleMouseMove.current);
      map.current.on("mousedown", handleMouseDown.current);
      map.current.on("mouseup", handleMouseUp.current);
      map.current.on("mouseleave", handleMouseLeave.current);

      // 2
      // document
      //   .getElementById("search-buttonradius")
      //   .addEventListener("click", function () {
      //     removeMarkers();
      //     if (!map.current.getSource("circle")) {

      //       fetchApi(centerPoint[0], centerPoint[1], radius);
      //     }
      //   });

      //   document
      //   .getElementById("clear-buttonradius")
      //   .addEventListener("click", function () {
      //     removeMarkers();
      //     map.current.removeLayer("circle");
      //     map.current.removeLayer("circle-outline");
      //     map.current.removeSource("circle")
      //     map.current.removeLayer("pointer-layer")
      //     map.current.removeSource("pointer")
      //     document.getElementById("search-buttonradius").style.display = "none";
      //     document.getElementById("clear-buttonradius").style.display = "none";
      //   });
    };

    const removeCircleEvents = () => {
      map.current.off("click", handleClick.current);
      map.current.off("mousemove", handleMouseMove.current);
      map.current.off("mousedown", handleMouseDown.current);
      map.current.off("mouseup", handleMouseUp.current);
      map.current.off("mouseleave", handleMouseLeave.current);
    };

    if (triggerRadius) {
      addCircleEvents();
    } else {
      removeCircleEvents();
      removeMarkers();
      if (map.current.getSource("circle")) {
        map.current.removeLayer("circle");
        map.current.removeLayer("circle-outline");
        map.current.removeSource("circle");
        map.current.removeLayer("pointer-layer");
        map.current.removeSource("pointer");
      }
      // 1
      // document.getElementById("search-buttonradius").style.display = "none";
      // document.getElementById("clear-buttonradius").style.display = "none";
    }
  }, [map.current, triggerRadius]);

  // const removeMarkers = ()=>{
  //   const markers = document.querySelectorAll(".marker-map");
  //   markers.forEach((marker) => marker.remove());
  // };

  const fetchApi = async (longitude, latitude, meter_radius) => {
    const spinnerDiv = document.getElementById("spinner")

    let spinner = `
    
    <div class="absolute inset-0 bg-white bg-opacity-70 flex justify-center items-center z-50">
        <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-c-teal"></div>
    </div>

    `
    spinnerDiv.innerHTML = spinner

    const res = await fetch(`${CONFIG_APP.MAPBOX_API}/map-radius-circle`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        latitude,
        longitude,
        meter_radius,
      }),
    });


    const responseData = await res.json();
    spinnerDiv.innerHTML = ``

    // console.log(responseData);
    removeMarkers();
    setDataMap(responseData.geojson.features);
    console.log({ tes: responseData.geojson.features });
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

  const mapApi = async (responseData) => {
    console.log("bejir", responseData);
    console.log(build)
    removeMarkers();
    setDataMap(responseData.data);
    responseData.data.forEach((item, index) => {
      // Create HTML element for the marker
      const el = document.createElement("div");
      el.className = "label-marker-map";
      // Create SVG element
      const isSame =
        build &&
        item.buildingId === build.buildingId

      if (build) {
        console.log(
          isSame,
          item.latitude,
          build.latitude,
          item.longitude,
          build.longitude
        );
      }
      const svg = `
      <div class="marker-map">
      <div class="label-name-map">${item.buildingName}</div>
        <div class="label-icon-wrapper">
          <svg display="block" height="41px" width="27px" viewBox="0 0 27 41">
              <defs>
                  <radialGradient id="shadowGradient">
                      <stop offset="10%" stop-opacity="0.4"></stop>
                      <stop offset="100%" stop-opacity="0.05"></stop>
                  </radialGradient>
              </defs>
              <ellipse cx="13.5" cy="34.8" rx="10.5" ry="5.25" fill="url(#shadowGradient)"></ellipse>
              <path fill="${isSame ? "#e6051b" : "#1b72e5"
        }" d="M27,13.5C27,19.07 20.25,27 14.75,34.5C14.02,35.5 12.98,35.5 12.25,34.5C6.75,27 0,19.22 0,13.5C0,6.04 6.04,0 13.5,0C20.96,0 27,6.04 27,13.5Z"></path>
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
      console.log(item);
      marker.setLngLat([item.longitude, item.latitude]).addTo(map.current);
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
      <div class="popup-container">
        <div class="info-box">
      <h3>${item.buildingName}</h3>
      <p><strong>Address:</strong> ${item.buildingName}, ${item.streetNumber}, ${item.streetName}</p>
      <p><strong>Postal Code:</strong> ${item.postalCode}</p>
      <p><strong>Latitude:</strong> ${item.latitude}</p>
      <p><strong>Longitude:</strong> ${item.longitude}</p>
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


  // useEffect(() => {
  //   mapApi({
  //     sub_type: null,
  //     region: "CBD",
  //     micromarket: null,
  //     zoning: null,
  //     property_usage: null,
  //     building_nla: 10000,
  //     space_status: null,
  //     vacant_space: 5000,
  //     asking_rent: 15,
  //     available_date: "2024-01-01"
  //   });
  // }, []);

  // useEffect(() => {
  //   fetchApi();
  //   // if (map.current) {
  //   //   map.current?.on("load", () => {
  //   //     const draw = new MapboxDraw({
  //   //       displayControlsDefault: false,
  //   //       controls: {
  //   //         polygon: true,
  //   //         trash: true,
  //   //       },
  //   //     });

  //   //     map.current?.addControl(draw);

  //   //     // Add a circle to the map for demonstration purposes
  //   //     const center = [106.827183, -6.175394]; // Example center point
  //   //     const radius = 1000; // Example radius in meters
  //   //     const circleFeature = turf.circle(center, radius, {
  //   //       steps: 64,
  //   //       units: "meters",
  //   //     });

  //   //     draw.add({
  //   //       type: "FeatureCollection",
  //   //       features: [circleFeature],
  //   //     });
  //   //   });
  //   // }
  // }, [styleMap, localStorage.getItem("styleMap")]);

  return {
    dataMap,
    setDataMap,
    filteringData,
    setFilteringData,
    handleSearch,
    search,
    mapApi,
    setBuild,
    build
  };
}

export function removeMarkers() {
  const markers = document.querySelectorAll(".marker-map");
  markers.forEach((marker) => marker.remove());
}
