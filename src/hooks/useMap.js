import mapboxgl from "mapbox-gl";
import { useEffect, useState } from "react";

export function useMap(styleMap, map, zoom) {
  const [dataMap, setDataMap] = useState();
  const [filteringData, setFilteringData] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e?.target?.value);
    const lowerSearch = e?.target?.value?.toLowerCase();
    const filtering = dataMap?.filter((item) => {
      const lowerTitle = item?.properties?.BUILDINGNAME?.toLowerCase();

      return lowerTitle?.includes(lowerSearch);
    });
    if (filteringData.length > 0) {
      map.current.setCenter(filtering?.[0]?.geometry?.coordinates);
      map.current.setZoom(15);
    }
    setFilteringData(filtering);
    if (e?.target?.value.length === 0) {
      setFilteringData([]);
    }
  };

  const fetchApi = async () => {
    const res = await fetch(`http://103.127.134.145:3000/map`);
    // const res = await fetch(`http://103.127.134.145:3000/map-region/SG04`)
    const responseData = await res.json();
    setDataMap(responseData.geojson.features);

    responseData.geojson.features.forEach((location) => {
      // Buat elemen HTML untuk marker
      const el = document.createElement("div");
      el.className = "marker";

      // Buat elemen HTML untuk label
      const label = document.createElement("div");
      label.className = "label";
      label.textContent = location.properties.BUILDINGNAME;

      // Tambahkan marker ke map
      new mapboxgl.Marker(el)
        .setLngLat(location.geometry.coordinates)
        .addTo(map.current);

      // Tambahkan label ke marker
      el.appendChild(label);
      const marker = new mapboxgl.Marker()
        .setLngLat(location.geometry.coordinates)
        .addTo(map.current);
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
      <div class="popup-container">
        <div class="info-box">
      <h3>${location.properties.BUILDINGNAME}</h3>
      <p><strong>Address:</strong> ${location.properties.BUILDINGNAME}, ${location.properties.BUILDINGADDRESS_POSTCODE}</p>
      <p><strong>Building Status:</strong> ${location.properties.BUILDINGSTATUS_EN}</p>
      <p><strong>Gross Floor Area:</strong> ${location.properties.GROSS_FLOOR_AREA} sq ft</p>
      <p><strong>Net Lettable Area:</strong> ${location.properties.NET_LETTABLE_AREA} sq ft</p>
      <p><strong>Location:</strong> ${location.properties.MICROMARKET}</p>
    </div>
    </div>
    `);

      marker.setPopup(popup);
      const mName = document.querySelectorAll(".label");
      mName.forEach((item) => {
        item.style.display = "none";
      });

      if (zoom > 14) {
        const mName = document.querySelectorAll(".label");
        mName.forEach((item) => {
          item.style.display = "block";
        });
      }
    });
  };

  useEffect(() => {
    fetchApi();
  }, [styleMap, localStorage.getItem("styleMap")]);

  return {
    dataMap,
    setDataMap,
    filteringData,
    setFilteringData,
    handleSearch,
    search,
  };
}
