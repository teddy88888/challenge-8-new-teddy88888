// src/pages/Home.tsx
import MovieCard from "../components/MovieCard";
import type { Movie } from "../types";
import { useEffect, useState } from "react";
import api from "../utils/axios";

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const handleMoreMovies = () => {
    setPage((prev) => prev + 1);
  };
  const fetchMovies = async (pageNum: number) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/movie/popular?page=${pageNum}`);
      // Menggabungkan film lama dengan film yang baru diambil
      setMovies((prev) =>
        pageNum === 1 ? data.results : [...prev, ...data.results]
      );
    } catch (error) {
      console.error("Gagal mengambil data", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  if (loading)
    return (
      <div className="bg-black h-screen text-white flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white">
      {/* Hero Section */}
      {movies && movies.length > 0 && (
        <section className="relative h-[60vh] md:h-[80vh] w-full">
          <img
            // src={`${import.meta.env.VITE_TMDB_IMAGE_URL}${
            //   movies[0].backdrop_path
            // }`}
            src="./heroSection.png"
            className="w-380 h-350 object-cover left-200 brightness-100"
          />
          <div className="absolute bottom-20 left-6 md:left-20 max-w-xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {/* {movies[0].title} */}
            </h1>
            <p className="text-gray-300 line-clamp-3 mb-6">
              {/* {movies[0].overview} */}
            </p>
            {/* <button className="!bg-neutral-800 hover:!bg-neutral-700 border border-white/20 px-6 py-2 rounded-full transition-all duration-300 shadow-xl flex items-center gap-3">
              Watch Now
            </button> */}
          </div>
        </section>
      )}

      {/* Grid List - Responsivitas sesuai instruksi (sm:, md:, lg:) */}
      {/* <section className="p-6 md:p-20">
        <h2 className="text-2xl font-bold mb-8 italic border-l-4 border-red-600 pl-4">
          Popular Movies
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies?.map((movie: Movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section> */}
      <div className="bg-[#0f0f0f] min-h-screen pt-20">
        <div className="container mx-auto px-6">
          <h2 className="text-white text-2xl font-bold mb-8">Popular Movies</h2>

          {/* Grid Film */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.map((movie, index) => (
              <MovieCard key={`${movie.id}-${index}`} movie={movie} />
            ))}
          </div>

          {/* Tombol Load More */}
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
      </div>
      <div className="flex flex-col items-center py-10">
        <button
          onClick={handleMoreMovies}
          className="bg-transparent border border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-2 rounded-full font-bold transition-all"
        >
          LOAD MORE MOVIES
        </button>
      </div>
    </div>
  );
};

export default Home;
