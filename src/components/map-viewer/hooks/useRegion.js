import { useEffect, useState } from "react";
import { filterdata } from "../constant";
import { CONFIG_APP } from "../config/app";

export function useRegion(map) {
  const [initialRegion, setInitialRegion] = useState([]);
  const RegionData = async () => {
    if (initialRegion.length > 0) {
      initialRegion.forEach(async (item) => {
        const res = await fetch(
          `${CONFIG_APP.MAPBOX_API}/map-region/${item}`
        );
        const responseData = await res.json();

        if (responseData?.region?.POLYGON) {
          // setDataRegionJson(responseData.region.POLYGON);


          if (!map.current.getLayer(`region-${item}`)) {
            if (!map.current.getSource(`sgregion-${item}`)) {
              map.current.addSource(`sgregion-${item}`, {
                type: "geojson",
                // 'data': 'http://localhost:4000/geojson/default.geojson'
                data: responseData.region.POLYGON,
              });

              map.current.addLayer({
                id: `region-${item}`,
                type: "fill",
                source: `sgregion-${item}`,
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

  const resetRegion = () => {
    if (initialRegion.length > 0) {
      initialRegion.map((item) => {
        if (map.current.getLayer(`region-${item}`)) {
          map.current.removeLayer(`region-${item}`);
          if (map.current.getSource(`sgregion-${item}`)) {
            map.current.removeSource(`sgregion-${item}`);
          }
        }
      });
    }
  };

  const showRegion = (code) => {
    if (map.current.getLayer(`region-${code}`)) {
      map.current.removeLayer(`region-${code}`);
      if (map.current.getSource(`sgregion-${code}`)) {
        map.current.removeSource(`sgregion-${code}`);
        const findCode = initialRegion.find((item) => item === code);
        if (findCode) {
          setInitialRegion(initialRegion.filter((item) => item !== code));
        }
      }
    } else {
      setInitialRegion([...initialRegion, code]);
    }
  };

  const showAllRegion = () => {
    if (initialRegion.length >= 3) {
      resetRegion();
      setInitialRegion([]);
    } else {
      console.log("tes");
      setInitialRegion(filterdata.map((data) => data.REGIONCODE));
    }
  };

  useEffect(() => {
    RegionData();
  }, [initialRegion]);

  return {
    initialRegion,
    setInitialRegion,
    resetRegion,
    showRegion,
    showAllRegion,
  };
}
