import { useEffect, useState } from "react";

export function useRegion(map) {
  const [initialRegion, setInitialRegion] = useState([]);
  const RegionData = async () => {
    if (initialRegion.length > 0) {
      const res = await fetch(
        `http://103.127.134.145:3000/map-region/${
          initialRegion[initialRegion.length - 1]
        }`
      );
      const responseData = await res.json();

      if (responseData?.region?.POLYGON) {
        // setDataRegionJson(responseData.region.POLYGON);

        map.current.addSource(
          `sgregion-${initialRegion[initialRegion.length - 1]}`,
          {
            type: "geojson",
            // 'data': 'http://localhost:4000/geojson/default.geojson'
            data: responseData.region.POLYGON,
          }
        );

        map.current.addLayer({
          id: `region-${initialRegion[initialRegion.length - 1]}`,
          type: "fill",
          source: `sgregion-${initialRegion[initialRegion.length - 1]}`,
          paint: {
            "fill-color": ["get", "color"],
            "fill-opacity": 0.5,
          },
        });
      }
    }
  };

  const resetRegion = () => {
    console.log({ initialRegion, map: map.current });
    console.log(map.current.getStyle());
    if (initialRegion.length > 0) {
      const regionId = initialRegion[initialRegion.length - 1];
      const layerId = `region-${regionId}`;
      const sourceId = `sgregion-${regionId}`;

      initialRegion.map((item) => {
        if (map.current.getLayer(`region-${item}`)) {
          map.current.removeLayer(`region-${item}`);
          if (map.current.getSource(`sgregion-${item}`)) {
            map.current.removeSource(`sgregion-${item}`);
          }
        }
      });
    }

    // window.location.reload();
  };

  useEffect(() => {
    RegionData();
  }, [initialRegion]);

  return { initialRegion, setInitialRegion, resetRegion };
}
