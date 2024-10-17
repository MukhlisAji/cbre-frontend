import { atom } from "jotai";
// input
export const mapAtom = atom({
  sub_type: "",
  region: "",
  micromarket: "",
  zoning: "",
  property_usage: "",
  building_nla: null,
  space_status: "",
  vacant_space: null,
  asking_rent: null,
  available_date: "",
});
