import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import data from "../utils/data.json";

export function useConfig() {
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_KEY;
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
