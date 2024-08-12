import axios from "axios";
import { useEffect, useState } from "react";
import { CONFIG_APP } from "../../map-viewer/config/app";

export function useTest({
  sub_type,
  region,
  micromarket,
  zoning,
  property_usage,
  building_nla,
  space_status,
  vacant_space,
  asking_rent,
  available_date,
}) {
  const [data, setData] = useState(null);
  useEffect(() => {
    //api master
    axios(`${CONFIG_APP.MAPBOX_API}/test2`, {
      method: "POST",
      data: {
        sub_type: sub_type || "",
        region: region || "",
        micromarket: micromarket || "",
        zoning: zoning || "",
        property_usage: property_usage || "",
        building_nla: building_nla || null,
        space_status: space_status || "",
        vacant_space: vacant_space || null,
        asking_rent: asking_rent || null,
        available_date: available_date || "",
      },
    }).then((res) => setData(res));
  }, [
    sub_type,
    region,
    micromarket,
    zoning,
    property_usage,
    building_nla,
    space_status,
    vacant_space,
    asking_rent,
    available_date,
  ]);
  return {
    data,
    setData,
  };
}
