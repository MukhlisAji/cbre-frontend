import { useQuery } from "@tanstack/react-query";

export function useCoordinate() {
    const query = useQuery({
        queryKey: ["coordinate"],
        queryFn: async() => {
            const res = fetch(`http://103.127.134.145:3000/map`).then(res => res.json()).then(res => res)
            return res
        }
    })
    return query
}