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
  const [isMap3D, setIsMap3D] = useState(false);
  const [zoom, setZoom] = useState(10);
  const { showMRT, setShowMRT } = useMRTLine(map)

  const [styleMap, setStyleMap] = useState(
    "mapbox://styles/rajifmahendra/clxrims5h002k01pf1imoen80"
  );

  const handleChangeStyleMap = (value) => {
    setStyleMap(value);
    localStorage.setItem("styleMap", JSON.stringify(value));
    window.location.reload();
  };

  function toggle3D() {
    if (!map.current) return;

    const layers = map.current.getStyle().layers;
    const labelLayerId = layers.find(
      (layer) => layer.type === "symbol" && layer.layout["text-field"]
    )?.id;
    const control = document.querySelector("#control-building-map").parentNode;
    control.innerHTML = isMap3D ?
      `<img id="control-building-map" src="2d.svg" alt="2D"/>`
      :
      `<img id="control-building-map" src="3d.svg" alt="3D"/>`;

    control.addEventListener("click", () => setIsMap3D(!isMap3D));

    if (isMap3D) {
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
          labelLayerId
        );
      }
      map.current.flyTo({
        zoom: 17,
        pitch: 70,
        essential: true,
      });
    } else {
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

  useEffect(() => {
    toggle3D();
  }, [isMap3D])

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      //style: "mapbox://styles/mapbox/streets-v12",
      style: JSON.parse(localStorage.getItem("styleMap")),
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
    map.current.on("click", "polygon-fill", (e) => {
      const coordinates = e.lngLat;
      const { title, description } = e.features[0].properties;
      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(`<p>${description}</p>`)
        .addTo(map.current);
    });

    // Add Building
    function duplicatePolygonByFloors(featureCollection, index, floors, max_height, gap_height = 0.5) {
      if (
        !featureCollection.features ||
        !Array.isArray(featureCollection.features)
      ) {
        throw new Error("Invalid GeoJSON feature collection format");
      }

      // Validasi index
      if (index < 0 || index >= featureCollection.features.length) {
        throw new Error(`Invalid index: ${index}. Index must be between 0 and ${featureCollection.features.length - 1}`);
      }

      const originalPolygon = featureCollection.features[index];
      const duplicatedFeatureCollection = {
        type: "FeatureCollection",
        features: []
      };

      const heightIncrement = max_height / floors;

      for (let i = 0; i < floors; i++) {
        const base_height = i * (heightIncrement + gap_height);
        const height = base_height + heightIncrement;

        const duplicatedPolygon = {
          type: "Feature",
          geometry: originalPolygon.geometry,
          properties: {
            base_height: base_height,
            height: height,
            index: i,
            color: "#99d188"
          }
        };

        //gap
        const gapPolygon = {
          type: "Feature",
          geometry: originalPolygon.geometry,
          properties: {
            base_height: height,
            height: height + gap_height,
            index: i,
            color: "white"
          }
        };

        duplicatedFeatureCollection.features.push(duplicatedPolygon);
        duplicatedFeatureCollection.features.push(gapPolygon);
      }

      return duplicatedFeatureCollection;
    }

    const plane = {
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

    const new_fc = duplicatePolygonByFloors(plane, 0, 10, 70, 1);


    map.current.on("load", () => {
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


      // Add Building
      map.current.addSource("plane", {
        type: "geojson",
        data: new_fc
      });

      map.current.addLayer({
        id: "extrusion",
        type: "fill-extrusion",
        source: "plane",
        paint: {
          "fill-extrusion-color": ["get", "color"],
          "fill-extrusion-base": ["get", "base_height"],
          "fill-extrusion-height": ["get", "height"],
          "fill-extrusion-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            15,
            0.5,
            16.5,
            1
          ]
        }
      });
      let previousHoveredIndex = null;

      map.current.on("mousemove", "extrusion", (e) => {
        map.current.getCanvas().style.cursor = "pointer";

        if (e.features.length > 0) {
          const feature = e.features[0];
          const index = feature.properties.index;

          if (previousHoveredIndex !== null && previousHoveredIndex !== index) {
            // Kembalikan warna lantai sebelumnya ke hijau
            map.current.setPaintProperty("extrusion", "fill-extrusion-color", [
              "case",
              ["==", ["get", "color"], "#99d188"],
              ["match", ["get", "index"], previousHoveredIndex, "#99d188", "#99d188"],
              ["get", "color"]
            ]);
          }

          // Ubah warna lantai yang di-hover menjadi kuning
          map.current.setPaintProperty("extrusion", "fill-extrusion-color", [
            "case",
            ["==", ["get", "color"], "#99d188"],
            ["match", ["get", "index"], index, "yellow", "#99d188"],
            ["get", "color"]
          ]);

          // Perbarui index lantai yang dihover
          previousHoveredIndex = index;
        }
      });

      // Mengembalikan semua lantai ke warna hijau saat mouse keluar dari gedung
      map.current.on("mouseleave", "extrusion", () => {
        map.current.getCanvas().style.cursor = "";

        if (previousHoveredIndex !== null) {
          // Kembalikan semua lantai ke warna hijau
          map.current.setPaintProperty("extrusion", "fill-extrusion-color", [
            "case",
            ["==", ["get", "color"], "#99d188"],
            "#99d188",
            ["get", "color"]
          ]);

          previousHoveredIndex = null;
        }
      });

      // Event listener untuk klik
      map.current.on("click", "extrusion", (e) => {
        const properties = e.features[0].properties;
        console.log(`LT ${properties.index + 1}`);
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
  }, [styleMap, localStorage.getItem("styleMap")]);

  useEffect(() => {
    const customControl = {
      onAdd() {
        // this._map = map;

        // Create a container for the control
        const container = document.createElement('div');
        container.id = 'control';
        container.className = 'mapboxgl-ctrl';
        const svg = `
            <div class="control-img-wrapper">
                ${isMap3D ?
            `<img id="control-building-map" src="2d.svg" alt="2D"/>`
            :
            `<img id="control-building-map" src="3d.svg" alt="3D"/>`
          }
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
        container.querySelector("#control-building-map").parentNode.addEventListener("click", () => setIsMap3D(!isMap3D));
        return container;
      },

      onRemove() {
        document.getElementById("control").remove()
      }
    };

    // Add the custom control to the map
    map.current.addControl(customControl, 'top-right');

    document
      .getElementById("mrt")
      .addEventListener("click", function () {
        setShowMRT(prev => !prev);
      });
  }, [])


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

    if (zoom > 14) {
      const markerName = document.querySelectorAll(".label-name-map");
      markerName.forEach((item) => {
        item.style.display = "block";
      });
    } else if (zoom <= 14) {
      const markerName = document.querySelectorAll(".label-name-map");
      markerName.forEach((item) => {
        item.style.display = "none";
      });
    }
  }, [zoom]);

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