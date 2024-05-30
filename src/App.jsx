import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "./App.css";
import data from './utils/data.json'

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_KEY;

function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  // const [lng, setLng] = useState(106.65555980845397);
  const [lng, setLng] = useState(data.geometry.coordinates[0][0]);
  const [lat, setLat] = useState(data.geometry.coordinates[0][1]);
  // const [lat, setLat] = useState(-6.128988772162629);
  const [zoom, setZoom] = useState(9);


  // const locations = [
  //   { lng: 103.80824563734359, lat: 1.3537707416903118 },
  //   { lng: 103.81933304621771, lat: 1.319257524554672 },
  //   { lng: 103.77880321089287, lat: 1.308529466979948 },
  //   { lng: 106.79788435814964, lat: -6.247180552811656 },
  //   { lng: 98.67985320237807, lat: 3.5909641368311895 }
  // ];

  // const LineValue = {
  //   type: "Feature",
  //   geometry: {
  //     coordinates: [
  //       [
  //         103.80824563734359, 1.3537707416903118
  //       ],
  //       [
  //         103.81933304621771, 1.319257524554672
  //       ],
  //       [
  //         103.77880321089287, 1.308529466979948
  //       ],
  //       [
  //         106.79788435814964, -6.247180552811656
  //       ],
  //       [
  //         98.67985320237807, 3.5909641368311895
  //       ]
  //     ],
  //     type: "LineString"
  //   }
  // }

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
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

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    });

    map.current.addControl(geocoder, 'top-left');

    // Noted: Enable if want to use navigate
    // map.current.addControl(
    //   new MapboxDirections({
    //     accessToken: mapboxgl.accessToken,
    //   }),
    //   "top-left"
    // );

    data.geometry.coordinates.forEach((location) => {
      new mapboxgl.Marker()
        .setLngLat([location[0], location[1]])
        .addTo(map.current);
    });
    
      new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .addTo(map.current);
    // // Add line layer
    // map.current.on("load", () => {
    //   map.current.addSource("line", {
    //     type: "geojson",
    //     data
    //   });

    //   map.current.addLayer({
    //     id: "polygon-fill",
    //     type: "fill",
    //     source: "polygon",
    //     layout: {},
    //     paint: {
    //       "fill-color": "rgba(237, 64, 104, 1)",
    //       "fill-opacity": 0.4,
    //     },
    //   });

    //   map.current.addLayer({
    //     id: "line-layer",
    //     type: "line",
    //     source: "line",
    //     layout: {
    //       "line-join": "round",
    //       "line-cap": "round"
    //     },
    //     paint: {
    //       "line-color": "#cc234a",
    //       "line-width": 1
    //     }
    //   });
    // });

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
        id: "polygon-fill",
        type: "fill",
        source: "polygon",
        layout: {},
        paint: {
          "fill-color": "rgba(237, 64, 104, 1)",
          "fill-opacity": 0.4,
        },
      });

      map.current.addLayer({
        id: "line-layer",
        type: "line",
        source: "polygon",
        layout: {
          "line-join": "round",
          "line-cap": "round"
        },
        paint: {
          "line-color": "#cc234a",
          "line-width": 2
        }
      });
    });
  }, []);

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <div className="App">
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

export default App;
