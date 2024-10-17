import axios from "axios";
import { useEffect, useState } from "react";
import { CONFIG_APP } from "../../map-viewer/config/app";

export const api = {
  spaceStatus: () => {
    const [data, setData] = useState(null);
    useEffect(() => {
      //api master
      axios(`${CONFIG_APP.MAPBOX_API}/master/space-status`).then((res) =>
        setData(res.data)
      );
    }, []);
    return {
      data,
      setData,
    };
  },
  zoning: () => {
    const [data, setData] = useState(null);
    useEffect(() => {
      //api master
      axios(`${CONFIG_APP.MAPBOX_API}/master/zoning`).then((res) =>
        setData(res.data)
      );
    }, []);
    return {
      data,
      setData,
    };
  },
  propertyUsage: () => {
    const [data, setData] = useState(null);
    useEffect(() => {
      //api master
      axios(`${CONFIG_APP.MAPBOX_API}/master/property-usage`).then((res) =>
        setData(res.data)
      );
    }, []);
    return {
      data,
      setData,
    };
  },
  micromarket: () => {
    const [data, setData] = useState(null);
    useEffect(() => {
      //api master
      axios(`${CONFIG_APP.MAPBOX_API}/master/micromarket`).then((res) =>
        setData(res.data)
      );
    }, []);
    return {
      data,
      setData,
    };
  },
};
