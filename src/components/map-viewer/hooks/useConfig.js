import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import data from "../utils/data.json";
import { CONFIG_APP } from "../config/app";
import { useMRTLine } from "./useMRT";

export function useConfig() {
  mapboxgl.accessToken = CONFIG_APP.MAPBOX_KEY;
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(data.geometry.coordinates[0][0]);
  const [lat, setLat] = useState(data.geometry.coordinates[0][1]);
  const [zoom, setZoom] = useState(10);
  const { showMRT, setShowMRT } = useMRTLine(map)
  const  [show3d, setShow3d]= useState(true)
  const [styleMap, setStyleMap] = useState(
    "mapbox://styles/rajifmahendra/clxrims5h002k01pf1imoen80"
  );

  const handleChangeStyleMap = (value) => {
    setStyleMap(value);
    localStorage.setItem("styleMap", JSON.stringify(value));
    window.location.reload();
  };

  function toggle3D(enable3D) {
    if (!map.current) return;
  

    if (enable3D) {
      // Jika 3D diaktifkan
      if (!map.current.getLayer("3d-buildings")) {
        map.current.addLayer(
          {
            id: "3d-buildings",
            source: "composite",
            "source-layer": "building",
            filter: ["==", "extrude", "true"],
            type: "fill-extrusion",
            minzoom: 15,
            paint: {
              "fill-extrusion-color": "#fff",
              "fill-extrusion-height": [
                "interpolate",
                ["linear"],
                ["zoom"],
                15,
                0,
                15.05,
                ["get", "height"],
              ],
              "fill-extrusion-base": [
                "interpolate",
                ["linear"],
                ["zoom"],
                15,
                0,
                15.05,
                ["get", "min_height"],
              ],
              "fill-extrusion-opacity": 0.8,
            },
          },
        );
      }
      map.current.flyTo({
        zoom: 17,
        pitch: 70,
        essential: true,
      });
    } else {
      // Jika 3D dinonaktifkan
      if (map.current.getLayer("3d-buildings")) {
        map.current.removeLayer("3d-buildings");
      }
      map.current.flyTo({
        zoom: 15,
        pitch: 0,
        essential: true,
      });
    }

    
  }

  function addMapControls() {
    map.current.addControl(new mapboxgl.NavigationControl());
    map.current.addControl(new mapboxgl.FullscreenControl());
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
      })
    );
  }

  function setupMapLayers() {
    const plane = createPlaneFeature();
    const new_fc = duplicatePolygonByFloors(plane, 0, 10, 70, 1);

    // map.current.addSource("polygon", {
    //   type: "geojson",
    //   data: {
    //     type: "Feature",
    //     geometry: {
    //       type: "Polygon",
    //       coordinates: [data.geometry.coordinates],
    //     },
    //   },
    // });
    // map.current.addLayer({
    //   id: "line-layer",
    //   type: "line",
    //   source: "polygon",
    //   layout: {
    //     "line-join": "round",
    //     "line-cap": "round",
    //   },
    //   paint: {
    //     "line-color": "#cc234a",
    //     "line-width": 2,
    //   },
    // });

    map.current.addSource("plane", { type: "geojson", data: new_fc });

    map.current.addLayer({
      id: "extrusion",
      type: "fill-extrusion",
      source: "plane",
      paint: {
        "fill-extrusion-color": ["get", "color"],
        "fill-extrusion-base": ["get", "base_height"],
        "fill-extrusion-height": ["get", "height"],
        "fill-extrusion-opacity": [
          "interpolate", ["linear"], ["zoom"], 15, 0.5, 16.5, 1
        ],
      },
    });
  }

  function setupMapInteractions() {
    let previousHoveredIndex = null;

    map.current.on("mousemove", "extrusion", (e) => {
      map.current.getCanvas().style.cursor = "pointer";

      if (e.features.length > 0) {
        const index = e.features[0].properties.index;
        updateLayerColorOnHover(index, previousHoveredIndex);
        previousHoveredIndex = index;
      }
    });

    map.current.on("mouseleave", "extrusion", () => {
      map.current.getCanvas().style.cursor = "";
      resetLayerColors();
    });

    map.current.on("click", "extrusion", (e) => {
      const index = e.features[0].properties.index;
      console.log(`LT ${index + 1}`);
    });
  }

  function updateLayerColorOnHover(index, previousIndex) {
    if (previousIndex !== null && previousIndex !== index) {
      map.current.setPaintProperty("extrusion", "fill-extrusion-color", [
        "case",
        ["==", ["get", "color"], "#99d188"],
        ["match", ["get", "index"], previousIndex, "#99d188", "#99d188"]],
        ["get", "color"]
      );
    }

    map.current.setPaintProperty("extrusion", "fill-extrusion-color", [
      "case",
      ["==", ["get", "color"], "#99d188"],
      ["match", ["get", "index"], index, "yellow", "#99d188"]],
      ["get", "color"]
    );
  }

  function resetLayerColors() {
    map.current.setPaintProperty("extrusion", "fill-extrusion-color", [
      "case",
      ["==", ["get", "color"], "#99d188"],
      "#99d188",
      ["get", "color"]
    ]);
  }

  function updateLabelVisibility() {
    const currentZoom = map.current.getZoom().toFixed(2);
    const displayStyle = currentZoom < 12 ? "none" : "flex";
    document.querySelectorAll(".tes").forEach(item => item.style.display = displayStyle);
  }

  function setupCustomControl() {
    const customControl = {
      onAdd() {
        const container = document.createElement('div');
        container.id = 'control';
        container.className = 'mapboxgl-ctrl';
        const svg = `
            <div class="control-img-wrapper" id ="2d-3d-container">
                <img id="control-2d" src="2d.svg" alt="2D"/>
            </div>
            <div class="control-img-wrapper">
                <img id="mrt" src="mrt.svg" alt="MRT"/>
            </div>
            <div class="control-img-wrapper">
                <img id="house" src="house.svg" alt="House"/>
            </div>
        `;

        // Append the buttons to the container
        container.innerHTML = svg;
        container.querySelector("#control-2d").addEventListener("click", () => setShow3d(prev=>!prev));
        return container;
      },
      onRemove() {
        document.getElementById("control").remove();
      }
    };

    map.current.addControl(customControl, 'top-right');

    document.getElementById("mrt").addEventListener("click", () => {
      setShowMRT(prev => !prev);
    });
  }

  function updateMarkerVisibility() {
    document.querySelectorAll(".marker-testing").forEach(item => {
      item.style.display = zoom < 14 ? "none" : "flex";
    });

    document.querySelectorAll(".container-marker-name-testing").forEach(item => {
      item.style.display = zoom < 15 ? "none" : "flex";
    });

    document.querySelectorAll(".label-name-map").forEach(item => {
      item.style.display = zoom > 14 ? "block" : "none";
    });
  }

  function createPlaneFeature() {
    return {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            coordinates: [
              [
                [103.84517017500667, 1.2754928191363604],
                [103.84513721544442, 1.2754522635716654],
                [103.84570513405743, 1.2749732009204422],
                [103.84608036599838, 1.275439589958097],
                [103.84595866915294, 1.275571395540922],
                [103.84517017500667, 1.2754928191363604]
              ]
            ],
            type: "Polygon"
          }
        }
      ]
    };
  }

  useEffect(() => {
    // Initialize map if not already initialized
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: JSON.parse(localStorage.getItem("styleMap")),
      center: [lng, lat],
      zoom: zoom,
    });

    // Add controls to the map
    addMapControls();

    // Load event listener for map
    map.current.on("load", () => {
      setupMapLayers();
      setupMapInteractions();
    });

    // Label visibility based on zoom level
    map.current.on("zoom", updateLabelVisibility);

  }, [styleMap, localStorage.getItem("styleMap")]);

  useEffect(() => {
    // Custom control setup
    setupCustomControl();
  }, []);

  useEffect(() => {
    // Marker visibility and label display based on zoom
    updateMarkerVisibility();
  }, [zoom]);

  useEffect(() => {
  
    if (!map.current.isStyleLoaded()){
      return
    }
    // Marker visibility and label display based on zoom
    console.log(show3d)
    toggle3D((show3d))
    if (!show3d){
      const container = document.getElementById('2d-3d-container')
      container.innerHTML = ` <img id="control-2d" src="3d.svg" alt="3D"/>`
    }else{
      const container = document.getElementById('2d-3d-container')
      container.innerHTML = ` <img id="control-2d" src="2d.svg" alt="2D"/>`
    }
    document.querySelector("#control-2d").addEventListener("click", () => setShow3d(prev=>!prev));
  }, [show3d]);

  return {
    map,
    mapContainer,
    lat,
    setLat,
    lng,
    setLng,
    zoom,
    setZoom,
    styleMap,
    setStyleMap,
    handleChangeStyleMap,
    toggle3D
  };
}