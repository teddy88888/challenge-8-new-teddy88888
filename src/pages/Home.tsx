import MovieCard from "../components/MovieCard";
import type { Movie } from "../types";
import { useEffect, useState } from "react";
import api from "../utils/axios";

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchMovies = async (pageNum: number) => {
    setLoading(true);

    try {
      const { data } = await api.get(`/movie/popular?page=${pageNum}`);

      console.log("Data TMDB:", data);
      console.log("Film pertama:", data.results?.[0]);
      console.log("Backdrop:", data.results?.[0]?.backdrop_path);

      setMovies((prev) =>
        pageNum === 1 ? data.results : [...prev, ...data.results],
      );
    } catch (error) {
      console.error("Gagal mengambil data film:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  if (loading && movies.length === 0) {
    return (
      <div className="bg-black h-screen text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const heroMovie = movies.find((movie) => movie.backdrop_path);

  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white">
      {/* =========================
          HERO SECTION
      ========================== */}
      {heroMovie && (
        <section className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">
          {/* HERO IMAGE DARI TMDB API */}
          <img
            src={`https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`}
            alt={heroMovie.title}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(event) => {
              console.error(
                "Gambar Hero gagal dimuat:",
                event.currentTarget.src,
              );
            }}
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Gradient kiri */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />

          {/* Gradient bawah */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent" />

          {/* Hero Content */}
          <div className="relative z-10 h-full flex items-end px-6 md:px-20 pb-20">
            <div className="max-w-2xl">
              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tight mb-5">
                {heroMovie.title}
              </h1>

              {/* Rating & Release */}
              <div className="flex items-center gap-4 mb-5">
                <span className="bg-red-600 px-3 py-1 rounded-md font-bold">
                  ⭐ {heroMovie.vote_average?.toFixed(1)}
                </span>

                {heroMovie.release_date && (
                  <span className="text-gray-300">
                    {heroMovie.release_date.slice(0, 4)}
                  </span>
                )}
              </div>

              {/* Overview */}
              <p className="text-gray-300 text-sm md:text-base leading-relaxed line-clamp-3 mb-7">
                {heroMovie.overview}
              </p>

              {/* Button */}
              <button className="bg-gray-600 hover:bg-gray-700 text-black px-8 py-3 rounded-full font-bold transition-all duration-300">
                ▶ WATCH NOW
              </button>
            </div>
          </div>
        </section>
      )}

      {/* =========================
          POPULAR MOVIES
      ========================== */}
      <section className="bg-[#0f0f0f] pt-20 pb-10">
        <div className="container mx-auto px-6">
          <h2 className="text-white text-2xl font-bold mb-8">Popular Movies</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.map((movie, index) => (
              <MovieCard key={`${movie.id}-${index}`} movie={movie} />
            ))}
          </div>

          {/* Load More */}
          <div className="flex justify-center py-12">
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={loading}
              className="border-2 border-red-600 text-red-600 px-10 py-2 rounded-full font-bold hover:bg-red-600 hover:text-white transition-all disabled:opacity-50"
            >
              {loading ? "LOADING..." : "MORE MOVIES"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
