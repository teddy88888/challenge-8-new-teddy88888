import { useSearchParams } from "react-router-dom";
import { useSearchMovies } from "../hooks/useSearch";
import MovieCard from "../components/MovieCard";
import type { Movie } from "../types";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || ""; // Gunakan string kosong jika null
  const { data: results } = useSearchMovies(query);

  return (
    <div className="min-h-screen bg-[#0f0f0f] pt-32 px-6">
      <h1 className="text-white mb-6">Hasil untuk: "{query}"</h1>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {/* Tambahkan optional chaining ?. agar tidak error saat results undefined */}
        {results?.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
