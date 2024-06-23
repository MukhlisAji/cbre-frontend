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
  const [dataRegionJson, setDataRegionJson] = useState([]);
  const [filteringData, setFilteringData] = useState([])
  const [search, setSearch] = useState('')
  const [initalRegion, setInitialRegion] = useState([])

  var filterdata = [
    {
      "REGIONCODE": "SG03",
      "REGIONNAME": "North West"
    },
    {
      "REGIONCODE": "SG04",
      "REGIONNAME": "South East"
    },
    {
      "REGIONCODE": "SG05",
      "REGIONNAME": "South West"
    }
  ]

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

  const code2Color = (code) =>
    colorMap[code.match(/[a-z]+/i)[0].toUpperCase()] || "gray";

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
    // const res = await fetch(`http://103.127.134.145:3000/map-region/SG04`)
    const responseData = await res.json()
    setDataJson(responseData.geojson.features)
    // if (responseData?.region?.POLYGON) {
    //   var filterdata = [
    //     {
    //       "REGIONCODE": "SG03",
    //       "REGIONNAME": "North West"
    //     },
    //     {
    //       "REGIONCODE": "SG04",
    //       "REGIONNAME": "South East"
    //     },
    //     {
    //       "REGIONCODE": "SG05",
    //       "REGIONNAME": "South West"
    //     }
    //   ]

    //   filterdata.forEach(function (d) {
    //     const target = document.getElementById("filter");
    //     target.innerHTML += "<button>" + d.REGIONNAME + "</button>";
    //   });
    //   setDataRegionJson(responseData.region.POLYGON)
    //   map.current.addSource('sgregion', {
    //     'type': 'geojson',
    //     // 'data': 'http://localhost:4000/geojson/default.geojson'
    //     'data': responseData.region.POLYGON
    //   });
    //   map.current.addLayer({
    //     'id': 'region',
    //     'type': 'fill',
    //     'source': 'sgregion',
    //     'paint': {
    //       'fill-color': ['get', 'color'],
    //       'fill-opacity': 0.5
    //     }
    //   });
    // }
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
  const RegionData = async () => {
    if (initalRegion.length > 0) {
      const res = await fetch(`http://103.127.134.145:3000/map-region/${initalRegion[initalRegion.length - 1]}`)
      const responseData = await res.json()
      // if (responseData?.REGIONNAME !== initalRegion) {
      //   map.current.removeLayer({
      //     'id': `'region-${initalRegion}'`,
      //     'type': 'fill',
      //     'source': `sgregion-${initalRegion}`,
      //   })
      // }
      // console.log(initalRegion)
      if (responseData?.region?.POLYGON) {

        setDataRegionJson(responseData.region.POLYGON)

        // initalRegion.forEach((item) => {
        //   console.log(item, 'tes-item')
        //   map.current.addSource(`sgregion-${item}`, {
        //     'type': 'geojson',
        //     // 'data': 'http://localhost:4000/geojson/default.geojson'
        //     'data': responseData.region.POLYGON
        //   });

        //   map.current.addLayer({
        //     'id': `'region-${item}'`,
        //     'type': 'fill',
        //     'source': `sgregion-${item}`,
        //     'paint': {
        //       'fill-color': ['get', 'color'],
        //       'fill-opacity': 0.5
        //     }
        //   });
        // })
        map.current.addSource(`sgregion-${initalRegion[initalRegion.length - 1]}`, {
          'type': 'geojson',
          // 'data': 'http://localhost:4000/geojson/default.geojson'
          'data': responseData.region.POLYGON
        });

        map.current.addLayer({
          'id': `'region-${initalRegion[initalRegion.length - 1]}'`,
          'type': 'fill',
          'source': `sgregion-${initalRegion[initalRegion.length - 1]}`,
          'paint': {
            'fill-color': ['get', 'color'],
            'fill-opacity': 0.5
          }
        });


      }
    }
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


    // Add click event listener to the map
    map.on('click', 'region', function (e) {
      var features = map.queryRenderedFeatures(e.point);
      if (!features.length) {
        return;
      }

      var f = features[0];
      $("#console-output").html(``);
      $("#console-output").html(`> Hey, you're click on -> Region ` + f.properties.name);
    });
  }


  const generatedColor = (color) => {
    if (color == '#fa9e0d') {
      return "#000;"
    }
    return null
  }
  const generatedRounded = (index, length) => {
    if (index === 0 && length === 1) {
      return "border-radius: 100px"
    } else if (index === length - 1) {
      return "border-top-right-radius: 100px; border-bottom-right-radius: 100px"
    } else if (index === 1 && length === 3) {
      return 'border-radius: 0px'
    } else if (index === 0 && length === 3) {
      return "border-top-left-radius: 100px; border-bottom-left-radius: 100px"
    }
  }

  const MRTStationData = async () => {
    const res = await fetch('http://103.127.134.145:3000/map-transportation/label')
    const responseData = await res.json()
    responseData?.geojson?.features?.forEach((station) => {

      const element = document.createElement('div');
      element.innerHTML = `<div class="marker-name-testing" style="margin-top:30px">${station?.properties?.name}</div>`;
      const markerNameLabel = new mapboxgl.Marker(element)
      markerNameLabel.setLngLat(station.geometry.coordinates)
        .addTo(map.current);

      // if (zoom < 15) {
      //   const markerNameLabel = document.querySelectorAll(".marker-name-testing")
      //   markerNameLabel.forEach((item) => {
      //     item.style.display = "none"
      //   })
      // } else if (zoom >= 15) {
      //   const markerNameLabel = document.querySelectorAll(".marker-name-testing")
      //   markerNameLabel.forEach((item) => {
      //     item.style.display = "block"
      //   })
      // }

      if (station.properties.lines) {
        const values = station.properties.lines.filter(value => value);
        let output = "";

        output += `<div class="marker-testing" >`;
        values.forEach((value, index, array) => {
          const prefix = value.match(/^[A-Z]+/)[0];
          const separated = value.replace(/([A-Z]+)(\d+)/, "$1 $2");
          const color = colorMap[prefix] || "gray";

          if (color) {
            // output += <span class="${color}">${separated}</span>;
            output += `<span class="${color}" style="padding: 0.3em 5px;line-height: 1; background-color: ${color}; color: ${generatedColor(color)}; ${generatedRounded(index, array.length)};">${separated}</span>`;
          }
        });
        output += `</div>`;
        const el = document.createElement('div');
        el.innerHTML = output;
        const marker = new mapboxgl.Marker(el)

        const name = document.createElement("p")
        name.innerHTML = `<p class="marker-name" style="font-size: 28px">${station.properties.BUILDINGNAME}</p>`
        const markerName = new mapboxgl.Marker(name)
        markerName.setLngLat(station.geometry.coordinates)


        // Tambahkan custom marker ke peta

        marker.setLngLat(station.geometry.coordinates)
          .addTo(map.current);


      }
      const markerLabel = document.querySelectorAll(".marker-testing")
      markerLabel.forEach((item) => {
        item.style.display = "none"
      })

      const markerName = document.querySelectorAll(".marker-name-testing")
      markerName.forEach((item) => {
        item.style.display = "none"
      })




      if (zoom < 15) {
        const mLabel = document.querySelectorAll(".marker-testing")
        mLabel.forEach((item) => {
          item.style.display = "none"
        })
      }

      if (zoom < 17) {
        const mName = document.querySelectorAll(".marker-name-testing")
        mName.forEach((item) => {
          item.style.display = "none"
        })
      }

      //   marker.setPopup(popup);
      // })

    });
  }

  const handleReset = () => {
    if (initalRegion.length > 0) {
      initalRegion.forEach(item => {

        const layerId = `region-${item}`;
        const sourceId = `sgregion-${item}`;

        // TODO : BUG 
        // Remove the layer if it exists
        if (map.current.getLayer(layerId)) {
          map.current.removeLayer(layerId);
        }

        // TODO : BUG 
        // Remove the source if it exists
        if (map.current.getSource(sourceId)) {
          map.current.removeSource(sourceId);
        }



      })
    }
  }

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      //style: "mapbox://styles/mapbox/streets-v12",
      style: "mapbox://styles/rajifmahendra/clxrims5h002k01pf1imoen80",
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
          "line-cap": "round"
        },
        paint: {
          "line-color": "#cc234a",
          "line-width": 2
        }
      });


    });

    // label
    map.current.on('zoom', () => {
      const currentZoom = map.current.getZoom().toFixed(2);
      const markerLabels = document.querySelectorAll(".tes");
      markerLabels.forEach((item) => {
        item.style.display = currentZoom < 12 ? "none" : "flex";
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
  }, []);



  useEffect(() => {
    MRTStationData()


  }, [])

  useEffect(() => {
    if (zoom < 15) {
      const markerLabel = document.querySelectorAll(".marker-testing")
      markerLabel.forEach((item) => {
        item.style.display = "none"
      })
    } else if (zoom >= 15) {
      const markerLabel = document.querySelectorAll(".marker-testing")
      markerLabel.forEach((item) => {
        item.style.display = "flex"
      })
    }

    if (zoom < 17) {
      const markerName = document.querySelectorAll(".marker-name-testing")
      markerName.forEach((item) => {
        item.style.display = "none"
      })
    } else if (zoom >= 17) {
      const markerName = document.querySelectorAll(".marker-name-testing")
      markerName.forEach((item) => {
        item.style.display = "block"
      })
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

  useEffect(() => {
    RegionData()
  }, [initalRegion])


  return (

    <div className="App">


      <SearchLocation onSearchChange={handleSearch} />
      {filteringData.length > 0 && <SearchList onClickAction={handleClick} filteringData={filteringData} />}
      {!filteringData.length && search.length > 0 && <NotFound />}

      {/* Todo: Fix Style so it looks better */}

      <FilterLine onClickAction={() => setShowMRT(!showMRT)} />
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        {/* Filtering Region Button */}
        <div id="filter">

          {/* BUTTON TODO IS ALREADY BUG */}
          <button onClick={handleReset}>RESET</button>
          {filterdata.map((item, index) => (
            <button key={index} onClick={() => setInitialRegion(prev => {

              return [...prev, item.REGIONCODE]
            })}>
              {item.REGIONNAME}
            </button>
          ))}
        </div>
      </div>

      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

export default App;
