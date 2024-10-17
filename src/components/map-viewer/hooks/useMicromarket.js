import { useEffect, useState } from "react";
import { CONFIG_APP } from "../config/app";

export function useMicromarket(map) {
  const [initialMicromarket, setInitialMicromarket] = useState([]);
  const MicromarketData = async () => {
    if (initialMicromarket.length > 0) {
      initialMicromarket.forEach(async (item) => {
        const res = await fetch(`${CONFIG_APP.MAPBOX_API}/data/micromarket`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ value: item }) // Kirim data dalam body dengan nama field "value"
        });
        const responseData = await res.json();

        if (responseData?.geojson) {
          const allCoordinates = responseData.geojson.features.map(feature => feature.geometry.coordinates);

          // Buat objek geojson baru dengan tipe "Polygon"
          const combinedGeojson = {
            type: "FeatureCollection",
            features: [
              {
                geometry: {
                  type: "Polygon",
                  coordinates: [allCoordinates] // Gabungkan semua koordinat menjadi satu array
                },
                properties: {
                  color: "#00ff00", // Set warna default ke hijau
                  id: `micromarket-${formatStringMicromarket(item)}`,
                  name: `Micromarket ${item}`
                },
                type: "Feature",
                id: `micromarket-${formatStringMicromarket(item)}`
              }
            ]
          };

          console.log(combinedGeojson);

          if (!map.current.getLayer(`micromarket-${formatStringMicromarket(item)}`)) {
            if (!map.current.getSource(`sgmicromarket-${formatStringMicromarket(item)}`)) {
              // Tambahkan source ke Mapbox
              map.current.addSource(`sgmicromarket-${formatStringMicromarket(item)}`, {
                type: "geojson",
                data: combinedGeojson,
              });

              // Tambahkan layer untuk menampilkan titik
              map.current.addLayer({
                id: `micromarket-${formatStringMicromarket(item)}`,
                type: "fill",
                source: `sgmicromarket-${formatStringMicromarket(item)}`,
                paint: {
                  "fill-color": ["get", "color"],
                  "fill-opacity": 0.5,
                },
              });
            }
          }

        }
      });
    }
  };

  const resetMicromarket = () => {
    if (initialMicromarket.length > 0) {
      initialMicromarket.map((item) => {
        if (map.current.getLayer(`micromarket-${formatStringMicromarket(item)}`)) {
          map.current.removeLayer(`micromarket-${formatStringMicromarket(item)}`);
          if (map.current.getSource(`sgmicromarket-${formatStringMicromarket(item)}`)) {
            map.current.removeSource(`sgmicromarket-${formatStringMicromarket(item)}`);
          }
        }
      });
    }
  };

  const triggerMicromarket = (code) => {
    console.log(map.current.getLayer(`micromarket-${formatStringMicromarket(code)}`));
    if (map.current.getLayer(`micromarket-${formatStringMicromarket(code)}`)) {
      map.current.removeLayer(`micromarket-${formatStringMicromarket(code)}`);
      if (map.current.getSource(`sgmicromarket-${formatStringMicromarket(code)}`)) {
        map.current.removeSource(`sgmicromarket-${formatStringMicromarket(code)}`);
        const findCode = initialMicromarket.find((item) => item === code);
        if (findCode) {
          setInitialMicromarket(initialMicromarket.filter((item) => item !== code));
        }
      }
    } else {
      setInitialMicromarket([...initialMicromarket, code]);
    }
  };

  useEffect(() => {
    MicromarketData();
  }, [initialMicromarket]);

  function formatStringMicromarket(str) {
    let noSpaces = str.split(' ').join('');
    let replacedSlashes = noSpaces.split('/').join('-');
    let lowerCaseString = replacedSlashes.toLowerCase();
    return lowerCaseString;
  }

  return {
    initialMicromarket,
    setInitialMicromarket,
    resetMicromarket,
    triggerMicromarket,
  };
}
