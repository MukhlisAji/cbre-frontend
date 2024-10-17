import { useQuery } from "@tanstack/react-query";
import { CONFIG_APP } from "../config/app";

// create coordinat
export function useCoordinate() {
    const query = useQuery({
        queryKey: ["coordinate"],
        queryFn: async() => {
            const res = fetch(`${CONFIG_APP.MAPBOX_API}/map`).then(res => res.json()).then(res => res)
            return res
        }
    })
    return query
}