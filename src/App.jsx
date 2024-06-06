import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import data from './utils/data.json';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_KEY;



function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(data.geometry.coordinates[0][0]);
  const [lat, setLat] = useState(data.geometry.coordinates[0][1]);
  const [zoom, setZoom] = useState(9);
  const [showMRT, setShowMRT] = useState(false);
  const [dataJson, setDataJson] = useState([]);
  const [filteringData, setFilteringData] = useState([])
  const [search, setSearch] = useState('')

  const handleSearch = (e) => {
    setSearch(e?.target?.value)
    const lowerSearch = e?.target?.value?.toLowerCase();
    const filtering = dataJson?.filter((item) => {
      const lowerTitle = item?.properties?.BUILDINGNAME?.toLowerCase();

      return lowerTitle?.includes(lowerSearch)
    })
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
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>

      <div style={{ position: "absolute", top: "10px", left: "10px", backgroundColor: "white", padding: "2px", color: "white", zIndex: 999, width: '300px', borderRadius: '5px' }}>
        <input onChange={handleSearch} placeholder="Search Location" type="text" style={{ padding: '10px', outline: 'none', border: '1px solid rgba(0,0,0,.8)', width: '100%', borderRadius: '5px' }} />
      </div>
      {filteringData.length > 0 && <div style={{ position: 'absolute', top: "55px", left: "10px", backgroundColor: "white", padding: "2px", color: "white", zIndex: 999, width: '300px', height: 'max-content', maxHeight: '100px', overflow: 'auto', borderRadius: '5px', paddingInline: '5px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

          {filteringData.map((item, index) => (
            <p onClick={() => handleClick(item.geometry.coordinates)} key={index} style={{ color: 'black', cursor: 'pointer' }}>
              {item.properties.BUILDINGNAME}
            </p>
          ))}

        </div>

      </div>}
      {!filteringData.length && search.length > 0 && <div style={{ position: 'absolute', top: "55px", left: "10px", backgroundColor: "white", padding: "2px", color: "white", zIndex: 999, width: '300px', height: '200px' , overflow: 'auto', borderRadius: '5px', paddingInline: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{color: 'black'}}>Not Found</p>
        </div>}

      {/* Todo: Fix Style so it looks better */}
      <div style={{ position: "absolute", bottom: "10px", right: "10px", backgroundColor: "gray", padding: "10px", color: "white", width: "200px", height: "200px", zIndex: 99999, cursor: "pointer" }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', gap: '10px' }}>
          <button onClick={() => setShowMRT(prev => !prev)}>{showMRT ? "Hide" : "Show"} Line</button>

        </div>
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

export default App;
