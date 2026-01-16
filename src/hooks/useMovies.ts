// src/hooks/useMovies.ts
import { useQuery } from "@tanstack/react-query";
import api from "../utils/axios";
import type { Movie } from "../types";

export const useTrendingMovies = () => {
  return useQuery<Movie[]>({
    queryKey: ["movies", "trending"],
    queryFn: async () => {
      const { data } = await api.get("/trending/movie/day");
      return data.results;
    },
  });
};

// src/hooks/useMovies.ts
export const useMovieDetail = (id: string) => {
  return useQuery({
    queryKey: ['movie', id],
    queryFn: async () => {
      // Tambahkan videos dan credits agar data lengkap dalam satu kali panggil
      const { data } = await api.get(`/movie/${id}?append_to_response=videos,credits`);
      return data;
    },
  });
};