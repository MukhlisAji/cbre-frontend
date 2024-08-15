import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import data from "../utils/data.json";
import { CONFIG_APP } from "../config/app";

export function useConfig() {
  mapboxgl.accessToken = CONFIG_APP.MAPBOX_KEY;
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(data.geometry.coordinates[0][0]);
  const [lat, setLat] = useState(data.geometry.coordinates[0][1]);
  const [zoom, setZoom] = useState(10);

  const [styleMap, setStyleMap] = useState(
    "mapbox://styles/rajifmahendra/clxrims5h002k01pf1imoen80"
  );

  const handleChangeStyleMap = (value) => {
    setStyleMap(value);
    localStorage.setItem("styleMap", JSON.stringify(value));
    window.location.reload();
  };

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
    function duplicatePolygonByFloors(
      featureCollection,
      index,
      floors,
      max_height
    ) {
      if (
        !featureCollection.features ||
        !Array.isArray(featureCollection.features)
      ) {
        throw new Error("Invalid GeoJSON feature collection format");
      }

      const originalPolygon = featureCollection.features[index];
      const duplicatedFeatureCollection = {
        type: "FeatureCollection",
        features: []
      };

      const heightIncrement = max_height / floors;

      for (let i = 0; i < floors; i++) {
        const base_height = i * heightIncrement;
        const height = (i + 1) * heightIncrement;

        const duplicatedPolygon = {
          type: "Feature",
          geometry: originalPolygon.geometry,
          properties: {
            base_height: base_height,
            height: height,
            index: i
          }
        };

        duplicatedFeatureCollection.features.push(duplicatedPolygon);
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

    const new_fc = duplicatePolygonByFloors(plane, 0, 10, 70);


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
          "fill-extrusion-color": [
            "match",
            ["get", "index"],
            1,
            "green",
            2,
            "green",
            "green"
          ],
          "fill-extrusion-base": ["get", "base_height"],
          "fill-extrusion-height": ["-", ["get", "height"], 1],
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
            // Kembalikan warna lantai sebelumnya ke warna semula
            map.current.setPaintProperty("extrusion", "fill-extrusion-color", [
              "match",
              ["get", "index"],
              index,
              "yellow",
              "green"
            ]);
          } else if (previousHoveredIndex === null) {
            // Ubah warna lantai yang di-hover menjadi kuning
            map.current.setPaintProperty("extrusion", "fill-extrusion-color", [
              "match",
              ["get", "index"],
              index,
              "yellow",
              "green"
            ]);
          }

          // Perbarui index lantai yang dihover
          previousHoveredIndex = index;
        }
      });

      map.current.on("mouseleave", "extrusion", () => {
        // Kembalikan semua warna ke kondisi semula ketika mouse keluar dari layer
        map.current.setPaintProperty("extrusion", "fill-extrusion-color", [
          "match",
          ["get", "index"],
          1,
          "green",
          2,
          "green",
          "green"
        ]);

        previousHoveredIndex = null;
        map.current.getCanvas().style.cursor = "";
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
  };
}