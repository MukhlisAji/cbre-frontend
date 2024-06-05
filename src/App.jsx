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
  const [lng, setLng] = useState(data.geometry.coordinates[0][0]);
  const [lat, setLat] = useState(data.geometry.coordinates[0][1]);
  const [zoom, setZoom] = useState(9);


  const fetchApi = async () => {
    const res = await fetch(`http://103.127.134.145:3000/map`)
    const responseData = await res.json()
    console.log(responseData)
    responseData.geojson.features.forEach((location) => {
      const marker = new mapboxgl.Marker()
        .setLngLat([location.geometry.coordinates[0], location.geometry.coordinates[1]])
        .addTo(map.current);
      const popup = new mapboxgl.Popup()
      marker.getElement().addEventListener('click', () => {
        popup
          .setHTML(`
              <h3>${location.properties.BUILDINGNAME}</h3>
            `)
          .addTo(map.current);
      });
    });
  }

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
    fetchApi()

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    });

    map.current.addControl(geocoder, 'top-left');

    geocoder.on('result', (e) => {
      console.log('Input changed: result', e);
    });

    geocoder.on('results', async (e) => {

      console.log('Input changed: results', e.query[0]);
      const res = await fetch(`http://103.127.134.145:3000/map?q=${e.query[0]}`)
      const responseData = await res.json()
      map.current.setCenter([responseData.data?.[0].LONGITUDE, responseData.data?.[0].LATITUDE])
      map.current.setZoom(13)


    });


    // Noted: Enable if want to use navigate
    // map.current.addControl(
    //   new MapboxDirections({
    //     accessToken: mapboxgl.accessToken,
    //   }),
    //   "top-left"
    // );

    // data.geometry.coordinates.forEach((location) => {
    //   new mapboxgl.Marker()
    //     .setLngLat([location[0], location[1]])
    //     .addTo(map.current);
    // });

    // new mapboxgl.Marker()
    //   .setLngLat([lng, lat])
    //   .addTo(map.current);
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

      fetch('http://103.127.134.145:3000/map-mrt')
      .then(response => response.json())
      .then(data => {
          const geojsonData = data.geojson;
          console.log(geojsonData)
          map.current.addSource('line', {
            'type': 'geojson',
            'data': geojsonData
        });
        map.current.addLayer({
          id: 'line',
          type: 'line',
          source: 'line',
          layout: {
              'line-join': 'round',
              'line-cap': 'round'
          },
          paint: {
              'line-color': ['get', 'color'],
              'line-width': 4
          }
      });
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

  //   const fetchApi = async() => {
  //     const res = await fetch(`http://103.127.134.145:3000/map?lat=${lat}&lon=${lng}&zoom=${zoom}`)
  //     const data = await res.json()
  //     console.log(data)
  //   }

  //   useEffect(() => {
  // fetchApi()
  //   },[lng, lat, zoom])

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
