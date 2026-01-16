import { useNavigate } from "react-router-dom";
import type { Movie } from "../types";

const MovieCard = ({ movie }: { movie: Movie }) => {
  const navigate = useNavigate();
  const imageBaseUrl = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

  return (
    <div
      onClick={() => navigate(`/movie/${movie.id}`)} // Pindah halaman lewat fungsi
      className="cursor-pointer group relative overflow-hidden rounded-xl border border-gray-800 transition-all hover:scale-105"
    >
      <img
        src={`${imageBaseUrl}${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-full object-cover"
      />
      {/* Konten hover tetap sama */}
    </div>
  );
};
export default MovieCard;
