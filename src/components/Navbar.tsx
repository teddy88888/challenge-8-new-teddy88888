import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0f0f0f]/80 backdrop-blur-md border-b border-white/10 px-6 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-5xl font-black text-red-600 tracking-tighter"
        >
          CMOVIE
        </Link>

        <form
          onSubmit={handleSearch}
          className="relative w-full max-w-xs md:max-w-md ml-4"
        >
          <input
            type="text"
            placeholder="Cari film favorit..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-full py-5 px-10 text-2xl text-red focus:outline-none focus:border-red-600 transition-all"
          />
          <button
            type="submit"
            className="absolute right-2 top-0 text-black-200 h-full rounded-b-md flex-5 justify-center"
          >
            🔍
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
