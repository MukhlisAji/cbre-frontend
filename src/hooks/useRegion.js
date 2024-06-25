import { useEffect, useState } from "react";

export function useRegion(map) {
  const [initalRegion, setInitialRegion] = useState([]);
  const RegionData = async () => {
    if (initalRegion.length > 0) {
      const res = await fetch(
        `http://103.127.134.145:3000/map-region/${
          initalRegion[initalRegion.length - 1]
        }`
      );
      const responseData = await res.json();

      if (responseData?.region?.POLYGON) {
        // setDataRegionJson(responseData.region.POLYGON);

        map.current.addSource(
          `sgregion-${initalRegion[initalRegion.length - 1]}`,
          {
            type: "geojson",
            // 'data': 'http://localhost:4000/geojson/default.geojson'
            data: responseData.region.POLYGON,
          }
        );

        map.current.addLayer({
          id: `'region-${initalRegion[initalRegion.length - 1]}'`,
          type: "fill",
          source: `sgregion-${initalRegion[initalRegion.length - 1]}`,
          paint: {
            "fill-color": ["get", "color"],
            "fill-opacity": 0.5,
          },
        });
      }
    }
  };
  useEffect(() => {
    RegionData();
  }, [initalRegion]);

  return { initalRegion, setInitialRegion };
}
