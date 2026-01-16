import { useQuery } from "@tanstack/react-query";
import api from "../utils/axios";

export const useSearchMovies = (query) => {
  return useQuery({
    queryKey: ["search", query],
    queryFn: async () => {
      // Hilangkan ': string' dan as Movie[]
      const { data } = await api.get(`/search/movie?query=${query}`);
      return data.results;
    },
    enabled: !!query,
  });
};
