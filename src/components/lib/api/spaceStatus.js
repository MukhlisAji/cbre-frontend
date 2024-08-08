import { useEffect, useState } from "react";
import { CONFIG_APP } from "../../map-viewer/config/app";

export function spaceStatus() {
  const [data, setData] = useState(null);
  useEffect(() => {
    //api master
    fetch(`${CONFIG_APP.MAPBOX_API}/test`)
      .then((res) => res.json())
      .then((res) => setData(res));
  });
  return { data, setData };
}
