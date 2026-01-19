import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMovieDetail } from "../hooks/useMovies";
import type { Video } from "../types";
import { useNavigate } from "react-router-dom";

const MovieDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: movie, isLoading, isError } = useMovieDetail(id!);
  const [showModal, setShowModal] = useState(false);
  const trailerKey = movie?.videos?.results?.find(
    (vid: Video) => vid.type === "Trailer" && vid.site === "YouTube",
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
        <div className="container mx-auto px-6 md:px-20 mb-10">
          <button
            onClick={() => navigate("/")}
            className="bg-neutral-800! hover:bg-neutral-700! border border-white/20 px-6 py-2 rounded-full transition-all duration-300 shadow-xl flex items-center gap-3"
          >
            <span className="text-white opacity-100!">❮</span>
            <span className="text-white opacity-100! font-sans italic text-xs uppercase tracking-widest">
              Kembali ke Beranda
            </span>
          </button>
        </div>
        <div className="container mx-auto px-6 md:px-20"></div>
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

            {/* SEKSI CAST AND CREW */}
            <div className="mt-12">
              <h2 className="text-red-600 font-bold text-lg italic uppercase tracking-widest border-l-4 border-red-600 pl-4 mb-6">
                Cast and Crew
              </h2>

              {/* Container Scroll Horizontal untuk Cast */}
              <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
                {movie?.credits?.cast?.slice(0, 10).map((person: any) => (
                  <div
                    key={person.id}
                    className="flex-shrink-0 w-24 text-center group"
                  >
                    <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden border-2 border-gray-800 group-hover:border-red-600 transition-all">
                      <img
                        src={
                          person.profile_path
                            ? `${imageBase}${person.profile_path}`
                            : "https://via.placeholder.com/200x200?text=No+Photo"
                        }
                        className="w-full h-full object-cover"
                        alt={person.name}
                      />
                    </div>
                    <p className="text-white text-xs font-bold line-clamp-1">
                      {person.name}
                    </p>
                    <p className="text-gray-500 text-[10px] italic line-clamp-1">
                      {person.character}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <button
                onClick={() => setShowModal(true)}
                style={{ backgroundColor: "#EF4444" }} // Ini akan memaksa warna menjadi abu-abu
                className="text-white px-10 py-3 rounded-full font-bold hover:opacity-80 transition-all flex items-center gap-2"
              >
                <span>▶</span> WATCH TRAILER
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 p-4">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
            <div className="container left-0 top-0 mb-0 px-100 md:px-80">
              <button
                onClick={() => navigate("/")}
                className="!bg-neutral-800 hover:!bg-neutral-700 border border-white/20 px-6 py-2 rounded-full transition-all duration-300 shadow-xl flex items-center gap-3"
              >
                <span className="text-white !opacity-100">❮</span>
                <span className="text-white !opacity-100 font-sans italic text-xs uppercase tracking-widest">
                  Kembali ke Beranda
                </span>
              </button>
            </div>
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
