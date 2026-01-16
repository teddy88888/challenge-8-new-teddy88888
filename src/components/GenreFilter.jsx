// src/components/GenreFilter.jsx
import { useQuery } from "@tanstack/react-query";
import api from "../utils/axios";

const GenreFilter = ({ selectedGenre, onSelectGenre }) => {
  const { data: genres } = useQuery({
    queryKey: ["genres"],
    queryFn: async () => {
      const { data } = await api.get("/genre/movie/list");
      return data.genres;
    },
  });

  return (
    <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide mb-8">
      <button
        onClick={() => onSelectGenre(null)}
        className={`px-6 py-2 rounded-full border transition-all whitespace-nowrap ${
          !selectedGenre
            ? "bg-red-600 border-red-600"
            : "border-gray-600 hover:border-red-600"
        }`}
      >
        All Genres
      </button>
      {genres?.map((genre) => (
        <button
          key={genre.id}
          onClick={() => onSelectGenre(genre.id)}
          className={`px-6 py-2 rounded-full border transition-all whitespace-nowrap ${
            selectedGenre === genre.id
              ? "bg-red-600 border-red-600"
              : "border-gray-600 hover:border-red-600"
          }`}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
};
export default GenreFilter;