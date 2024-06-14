import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import FilterLine from "./components/FilterLine";
import NotFound from "./components/NotFound";
import SearchList from "./components/SearchList";
import SearchLocation from "./components/SearchLocation";
import data from './utils/data.json';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_KEY;



function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(data.geometry.coordinates[0][0]);
  const [lat, setLat] = useState(data.geometry.coordinates[0][1]);
  const [zoom, setZoom] = useState(10);
  const [showMRT, setShowMRT] = useState(false);
  const [dataJson, setDataJson] = useState([]);
  const [filteringData, setFilteringData] = useState([])
  const [search, setSearch] = useState('')

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
    STC: "#748477"
  };

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
    setSearch(e?.target?.value)
    const lowerSearch = e?.target?.value?.toLowerCase();
    const filtering = dataJson?.filter((item) => {
      const lowerTitle = item?.properties?.BUILDINGNAME?.toLowerCase();

      return lowerTitle?.includes(lowerSearch)
    })
    if (filteringData.length > 0) {
      map.current.setCenter(filtering?.[0]?.geometry?.coordinates)
      map.current.setZoom(15)
    }
    setFilteringData(filtering)
    if (e?.target?.value.length === 0) {

      setFilteringData([])
    }
  }

  const handleClick = (coordinate) => {
    map.current.setCenter(coordinate)
    map.current.setZoom(15)
  }

  const fetchApi = async () => {
    const res = await fetch(`http://103.127.134.145:3000/map`)
    const responseData = await res.json()
    setDataJson(responseData.geojson.features)
    responseData.geojson.features.forEach((location) => {
      const marker = new mapboxgl.Marker()
        .setLngLat(location.geometry.coordinates)
        .addTo(map.current);
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
        <div>
        <h3>${location.properties.BUILDINGNAME}</h3>
        <h4>${location.properties.BUILDINGADDRESS_POSTCODE}</h4>
        <h5>${location.properties.BUILDINGSTREETNAME}</h5>
        </div>`
        );

      marker.setPopup(popup);
    });
  }

  const MRTLineData = async () => {
    const res = await fetch('http://103.127.134.145:3000/map-transportation/line')
    const responseData = await res.json()
    const geoJson = responseData.geojson;
    map.current.addSource('line', {
      'type': 'geojson',
      'data': geoJson
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
  }

  const MRTStationData = async () => {
    const res = await fetch('http://103.127.134.145:3000/map-transportation/label')
    const responseData = await res.json()
    responseData?.geojson?.features?.forEach((station) => {
      // Buat elemen HTML untuk custom marker menggunakan SVG
      // const svg = `
      //     <svg height="10" width="10" viewBox="0 0 24 24" fill="#030bfc">
      //       <circle cx="12" cy="12" r="10" stroke="white" stroke-width="2" fill="#030bfc" />
      //     </svg>
      //   `;
      const svg = `
          <div class="marker-testing" style="padding: 2px 20px; background-color: ${getColor(station.properties.lines[0])}; border-radius: 15px; display: flex; align-items: center; justify-content: center; color:white">
            ${station?.properties?.lines?.[0]}
          </div>
        `;
      const el = document.createElement('div');
      el.innerHTML = svg;
      const marker = new mapboxgl.Marker(el)
      // console.log(getColor(station.properties.lines[0]))

      // Tambahkan custom marker ke peta

      marker.setLngLat(station.geometry.coordinates)
        .addTo(map.current);
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
        <div>
      <h3>${station?.properties?.name}</h3>
        </div>`
        );
      if (zoom < 11) {
        const markerLabel = document.querySelectorAll(".marker-testing")
        markerLabel.forEach((item) => {
          item.style.display = "none"
        })
      }

      marker.setPopup(popup);

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
    // MRTStationData()

    map.current.on('click', 'polygon-fill', (e) => {
      const coordinates = e.lngLat;
      const { title, description } = e.features[0].properties;

      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(<p>${description}</p>)
        .addTo(map.current);
    });

    //     const geocoder = new MapboxGeocoder({
    //       accessToken: mapboxgl.accessToken,
    //       mapboxgl: mapboxgl,
    //     });

    //     map.current.addControl(geocoder, 'top-left');
    // console.log(dataJson)
    //     geocoder.on('result', (e) => {
    //       console.log('Input changed: result haha', e);
    //      const findItem = dataJson.find((item) => item.geometry.coordinates == e.geometry.coordinates)
    //      e?.geometry?.marker?.coordinates?.remove()
    //      if(!findItem) {
    //       alert("Not Found!")
    //       return
    //      }

    //       // const markerToRemove = prevMarkers.find(({ coordinates: coords }) => 
    //       //   coords[0] === coordinates[0] && coords[1] === coordinates[1]);
    //       // if (markerToRemove) {
    //       //   markerToRemove.marker.remove();
    //       // }
    //     });

    //     geocoder.on('results', async (e) => {

    //       console.log('Input changed: results', e.query[0]);
    //       const res = await fetch(`http://103.127.134.145:3000/map?q=${e.query[0]}`)
    //       const responseData = await res.json()
    //       if(responseData.data.length === 0 && e.query[0].length > 0) {
    //         alert('Not Found!')
    //         return
    //       }
    //       map.current.setCenter([responseData.data?.[0]?.LONGITUDE, responseData.data?.[0]?.LATITUDE])
    //       map.current.setZoom(13)


    //     });


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

      // map.current.addLayer({
      //   id: "polygon-fill",
      //   type: "fill",
      //   source: "polygon",
      //   layout: {},
      //   paint: {
      //     "fill-color": "rgba(237, 64, 104, 1)",
      //     "fill-opacity": 0.4,
      //   },
      // });

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


      // MRTLineData()
      // fetch('http://103.127.134.145:3000/map-transportation/line')
      // .then(response => response.json())
      // .then(data => {
      //     const geojsonData = data.geojson;
      //     console.log(geojsonData)
      //     map.current.addSource('line', {
      //       'type': 'geojson',
      //       'data': geojsonData
      //   });
      //   map.current.addLayer({
      //     id: 'line',
      //     type: 'line',
      //     source: 'line',
      //     layout: {
      //         'line-join': 'round',
      //         'line-cap': 'round'
      //     },
      //     paint: {
      //         'line-color': ['get', 'color'],
      //         'line-width': 4
      //     }
      // });
      // });
    });
    map.current.on('zoom', () => {
      const currentZoom = map.current.getZoom().toFixed(2);
      const markerLabels = document.querySelectorAll(".marker-testing");
      markerLabels.forEach((item) => {
        item.style.display = currentZoom < 11 ? "none" : "flex";
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

  useEffect(() => {
    if (zoom > 11) {
      MRTStationData()
    }

  }, [zoom])

  useEffect(() => {
    if (showMRT) {
      MRTLineData()
    } else {
      if (map.current.getLayer('line')) {
        map.current.removeLayer('line');
      }
      if (map.current.getSource('line')) {
        map.current.removeSource('line');
      }
    }
  }, [showMRT])

  return (

    <div className="App">


      <SearchLocation onSearchChange={handleSearch} />
      {filteringData.length > 0 && <SearchList onClickAction={handleClick} filteringData={filteringData} />}
      {!filteringData.length && search.length > 0 && <NotFound />}

      {/* Todo: Fix Style so it looks better */}
      <FilterLine onClickAction={() => setShowMRT(!showMRT)} />
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>

      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

export default App;
