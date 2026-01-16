import { useNavigate } from "react-router-dom";
import type { Movie } from "../types";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const navigate = useNavigate();
  const imageBaseUrl =
    import.meta.env.VITE_TMDB_IMAGE_BASE_URL ||
    "https://image.tmdb.org/t/p/w500";

  return (
    <div
      onClick={() => navigate(`/movie/${movie.id}`)}
      className="cursor-pointer group relative overflow-hidden rounded-xl bg-[#1a1a1a] transition-all duration-500 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,0,0,0.3)] border border-white/5"
    >
      {/* Gambar Poster */}
      <img
        src={`${imageBaseUrl}${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-full object-cover"    
      />
      
      {/* Overlay Informasi (Muncul saat di-hover) */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-t from-black via-black/40 to-transparent">
        <h3 className="text-white text-sm font-bold italic leading-tight uppercase tracking-tighter">
          {movie.title}
        </h3>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-red-600 text-[10px] font-black italic">
            ★ {movie.vote_average.toFixed(1)}
          </span>
          <span className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">
            Detail →
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
