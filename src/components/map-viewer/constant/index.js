import {
  NortWest,
  SouthEast,
  SouthWest,
  StyleNavigationDay,
  StyleSatelliteStreet,
  StyleStreet,
  StyleNavigationNight, ZooningStyle
} from "../utils";

export const StyleList = [
  // {
  //   value: "mapbox://styles/rajifmahendra/clxrims5h002k01pf1imoen80",
  //   label: "Style Default"
  // },
  {
    value: "mapbox://styles/mapbox/streets-v12",
    label: "Style Street",
    icon: StyleStreet,
  },
  {
    value: "mapbox://styles/mapbox/satellite-streets-v12",
    label: "Style Satellite Street",
    icon: StyleSatelliteStreet,
  },
  {
    value: "mapbox://styles/rajifmahendra/clxsl7nxe00mo01o7di1f2fvw",
    label: "Zooning Style",
    icon: ZooningStyle,
  },
  {
    value: "mapbox://styles/mapbox/navigation-day-v1",
    label: "Style Navigation Day",
    icon: StyleNavigationDay,
  },
  {
    value: "mapbox://styles/mapbox/navigation-night-v1",
    label: "Style Navigation Night",
    icon: StyleNavigationNight,
  },
];

export const filterdata = [
  {
    REGIONCODE: "SG03",
    REGIONNAME: "North West",
    ICON: NortWest,
  },
  {
    REGIONCODE: "SG04",
    REGIONNAME: "South East",
    ICON: SouthEast,
  },
  {
    REGIONCODE: "SG05",
    REGIONNAME: "South West",
    ICON: SouthWest,
  },
];

export const colorMap = {
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
  STC: "#748477",
};
