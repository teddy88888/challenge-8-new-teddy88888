// src/components/Hero.tsx
import type { Movie } from "../types";

interface HeroProps {
  movie: Movie;
}

const Hero = ({ movie }: HeroProps) => {
  if (!movie) return null;

  const imageBaseUrl = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;
  const backdropUrl = `${imageBaseUrl}${movie.backdrop_path}`;

  return (
    <section className="relative h-[70vh] w-full flex items-center overflow-hidden">
      {/* Background Image dengan Overlay Gelap */}
      <div className="absolute inset-0 -z-10">
        <img
          src={backdropUrl}
          alt={movie.title}
          className="w-full h-full object-cover opacity-40 transition-opacity duration-700"
        />
        {/* Gradasi untuk kemiripan Figma: Gelap di kiri dan bawah */}
        <div className="absolute inset-0 bg-linear-to-t from-[#0f0f0f] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-[#0f0f0f] via-transparent to-transparent" />
      </div>

      {/* Konten Hero: Judul & Sinopsis */}
      <div className="max-w-2xl">
        <h1 className="text-6xl font-black italic uppercase mb-4">
          {movie.title}
        </h1>
        <p className="text-gray-400 text-lg italic line-clamp-3">
          {movie.overview}
        </p>
      </div>

      <div className="flex gap-4 pt-4">
        <button className="bg-red-600 hover:bg-red-700 text-gray px-8 py-3 rounded-md font-bold transition-all shadow-lg hover:scale-105">
          WATCH NOW
        </button>
        <button className="bg-gray-500/30 hover:bg-gray-500/50 backdrop-blur-md text-white border border-gray-500 px-8 py-3 rounded-md font-bold transition-all">
          MORE INFO
        </button>
      </div>
    </section>
  );
};

export default Hero;
