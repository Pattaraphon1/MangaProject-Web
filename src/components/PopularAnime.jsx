import { useEffect, useState } from "react";
import { Link } from "react-router";
import useAnimeStore from "../store/anime-store";

function PopularAnime() {
  const {
    animeList,
    loading,
    error,
    fetchAnimeByPage,
    searchAnime,
    currentPage,
    totalPages,
    isSearching,
    searchQuery,
  } = useAnimeStore();

  const [input, setInput] = useState("");

  useEffect(() => {
    if (!isSearching) {
      fetchAnimeByPage(currentPage);
    }
  }, [currentPage, isSearching]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchAnimeByPage(newPage);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim()) {
      searchAnime(input.trim());
    }
  };

  const handleClearSearch = () => {
    setInput("");
    fetchAnimeByPage(1);
  };

  

  return (
    <div className="min-h-screen bg-[#e3c19e] p-6">
      {/* Search bar */}
      <form onSubmit={handleSearch} className="mb-6 flex gap-2 max-w-md mx-auto">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search anime..."
          className="flex-grow px-4 py-2 rounded border border-gray-400 focus:outline-none"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-[#c88a50] text-white rounded hover:bg-[#7a623f] transition"
        >
          Search
        </button>
        {isSearching && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
          >
            Clear
          </button>
        )}
      </form>

      {loading && <p className="text-center text-gray-700 text-xl">Loading anime...</p>}
      {error && <p className="text-center text-red-600 text-xl">Error: {error}</p>}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-9 gap-6">
            {animeList.length === 0 && (
              <p className="text-center col-span-full text-gray-700">No results found.</p>
            )}
            {animeList.map((anime) => (
              <Link
                key={anime.malId}
                to={`/anime/${anime.malId}`}
                className="relative group rounded-lg overflow-hidden shadow hover:shadow-xl transition"
              >
                <img
                  src={anime.imageUrl}
                  alt={anime.title}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white px-3 py-2 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-in-out rounded-b-lg">
                  <h2 className="text-sm font-semibold truncate">{anime.title}</h2>
                  <p className="text-xs">⭐ {anime.score ?? "N/A"}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {!isSearching && (
            <div className="flex justify-center items-center mt-10 gap-2 flex-wrap">
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-full text-sm font-medium border border-[#5a4633]
                   text-[#5a4633] hover:bg-[#5a4633] hover:text-white transition-all duration-300
                   disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ⏮ First
              </button>

              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-full text-sm font-medium border border-[#5a4633]
                   text-[#5a4633] hover:bg-[#5a4633] hover:text-white transition-all duration-300
                   disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ◀ Prev
              </button>

              <span className="px-4 py-1.5 rounded-full text-sm font-semibold text-[#5a4633]">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-full text-sm font-medium border border-[#5a4633]
                   text-[#5a4633] hover:bg-[#5a4633] hover:text-white transition-all duration-300
                   disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Next ▶
              </button>

              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-full text-sm font-medium border border-[#5a4633]
                   text-[#5a4633] hover:bg-[#5a4633] hover:text-white transition-all duration-300
                   disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Last ⏭
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default PopularAnime;
