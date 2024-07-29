import { useEffect, useState } from "react";
import { CONFIG_APP } from "../config/app";

export function useZoning(map) {
  const [initialZoning, setInitialZoning] = useState([]);
  const ZoningData = async () => {
    if (initialZoning.length > 0) {
      initialZoning.forEach(async (item) => {
        const res = await fetch(`${CONFIG_APP.MAPBOX_API}/data/zoning`, {
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
                  id: `zoning-${formatStringZoning(item)}`,
                  name: `Zoning ${item}`
                },
                type: "Feature",
                id: `zoning-${formatStringZoning(item)}`
              }
            ]
          };

          console.log(combinedGeojson);

          if (!map.current.getLayer(`zoning-${formatStringZoning(item)}`)) {
            if (!map.current.getSource(`sgzoning-${formatStringZoning(item)}`)) {
              // Tambahkan source ke Mapbox
              map.current.addSource(`sgzoning-${formatStringZoning(item)}`, {
                type: "geojson",
                data: combinedGeojson,
              });

              // Tambahkan layer untuk menampilkan titik
              map.current.addLayer({
                id: `zoning-${formatStringZoning(item)}`,
                type: "fill",
                source: `sgzoning-${formatStringZoning(item)}`,
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

  const resetZoning = () => {
    if (initialZoning.length > 0) {
      initialZoning.map((item) => {
        if (map.current.getLayer(`zoning-${formatStringZoning(item)}`)) {
          map.current.removeLayer(`zoning-${formatStringZoning(item)}`);
          if (map.current.getSource(`sgzoning-${formatStringZoning(item)}`)) {
            map.current.removeSource(`sgzoning-${formatStringZoning(item)}`);
          }
        }
      });
    }
  };

  const triggerZoning = (code) => {
    console.log(map.current.getLayer(`zoning-${formatStringZoning(code)}`));
    if (map.current.getLayer(`zoning-${formatStringZoning(code)}`)) {
      map.current.removeLayer(`zoning-${formatStringZoning(code)}`);
      if (map.current.getSource(`sgzoning-${formatStringZoning(code)}`)) {
        map.current.removeSource(`sgzoning-${formatStringZoning(code)}`);
        const findCode = initialZoning.find((item) => item === code);
        if (findCode) {
          setInitialZoning(initialZoning.filter((item) => item !== code));
        }
      }
    } else {
      setInitialZoning([...initialZoning, code]);
    }
  };

  useEffect(() => {
    ZoningData();
  }, [initialZoning]);

  function formatStringZoning(str) {
    let noSpaces = str.split(' ').join('');
    let replacedSlashes = noSpaces.split('/').join('-');
    let lowerCaseString = replacedSlashes.toLowerCase();
    return lowerCaseString;
  }

  return {
    initialZoning,
    setInitialZoning,
    resetZoning,
    triggerZoning,
  };
}
