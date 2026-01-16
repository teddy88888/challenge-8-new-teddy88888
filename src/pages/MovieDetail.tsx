import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMovieDetail } from "../hooks/useMovies";
import type { Video } from "../types";

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: movie, isLoading, isError } = useMovieDetail(id!);
  const [showModal, setShowModal] = useState(false);
  const trailerKey = movie?.videos?.results?.find(
    (vid: Video) => vid.type === "Trailer" && vid.site === "YouTube"
  )?.key;
  // DEBUG: Hapus ini jika sudah berhasil muncul
  console.log("Cek Data API:", movie);

  if (isLoading)
    return <div className="bg-[#0f0f0f] h-screen">Memuat Detail...</div>;
  if (isError || !movie)
    return (
      <div className="min-h-screen bg-[#0f0f0f] text-white p-20">
        Gagal memuat data.
      </div>
    );

  const imageBase = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

  return (
    <>
      <div className="min-h-screen bg-[#0f0f0f] text-white pt-24 pb-20">
        <div className="container mx-auto px-6 md:px-20">
          <div className="flex flex-col md:flex-row gap-12">
            {/* Poster */}
            <div className="shrink-0">
              <img
                src={`${imageBase}${movie.poster_path}`}
                className="w-72 rounded-2xl shadow-2xl border border-gray-800"
                alt={movie.title}
              />
            </div>

            {/* Konten Detail */}
            <div className="flex-1">
              <h1 className="text-5xl font-black italic underline decoration-red-600 decoration-4 underline-offset-8 uppercase tracking-tighter mb-10">
                {movie.title}
              </h1>

              {/* Letakkan di bawah Judul atau Rating di MovieDetail.tsx */}
              <div className="flex flex-wrap gap-2 my-4">
                {movie?.genres && movie.genres.length > 0 ? (
                  movie.genres.map((genre: { id: number; name: string }) => (
                    <span
                      key={genre.id}
                      className="bg-gray-800 text-gray-300 text-[10px] md:text-xs font-bold px-3 py-1 rounded-full border border-gray-700 uppercase tracking-widest"
                    >
                      {genre.name}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500 text-xs italic">
                    Genre tidak tersedia
                  </span>
                )}
              </div>

              {/* SEKSI SINOPSIS */}
              <div className="bg-white/5 p-6 rounded-xl border-l-4 border-red-600">
                <h2 className="text-red-600 font-bold text-sm uppercase tracking-widest mb-3 italic">
                  Sinopsis Cerita
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed italic font-light">
                  {/* Pastikan menggunakan 'overview' (huruf kecil semua) */}
                  {movie?.overview ||
                    "Maaf, sinopsis untuk film ini belum tersedia dalam database kami."}
                </p>
              </div>

              <div className="mt-8 flex gap-4">
                <button
                  onClick={() =>
                    trailerKey
                      ? setShowModal(true)
                      : alert("Trailer tidak tersedia")
                  }
                  className="bg-red-600 hover:bg-red-700 px-10 py-3 rounded-full font-bold shadow-lg transition-all hover:scale-105"
                >
                  WATCH TRAILER
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 p-4">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
            {/* Tombol Close */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute -top-12 right-0 text-white text-xl font-bold hover:text-red-500"
            >
              TUTUP [X]
            </button>

            {/* Iframe YouTube */}
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title="YouTube video player"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieDetail;
