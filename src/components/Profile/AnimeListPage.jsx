import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import useAuthStore from "../../store/auth-store";

const AnimeListPage = () => {
    const [animeList, setAnimeList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyAnimeList = async () => {
            try {
                const res = await fetch("http://localhost:8899/api/mylist/anime", {
                    headers: {
                        Authorization: `Bearer ${useAuthStore.getState().token}`,
                    },
                });
                const data = await res.json();
                setAnimeList(data);
            } catch (err) {
                console.error("Error fetching my anime list:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchMyAnimeList();
    }, []);

    const filteredAnime = animeList.filter((item) =>
        item.anime?.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="min-h-screen w-full bg-[#fdf6ef] py-10 px-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center text-[#333]">My Anime List</h1>

                {/* Search Bar */}
                <div className="mb-10 max-w-md mx-auto">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search anime..."
                        className="w-full px-4 py-2 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c88a50]"
                    />
                </div>

                {/* Anime List */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
                    {filteredAnime.length === 0 ? (
                        <p className="col-span-full text-gray-600">No matching anime found.</p>
                    ) : (
                        filteredAnime.map((item) => (
                            <Link
                                to={`/anime/${item.anime.malId}`}
                                key={item.id}
                                className="relative group rounded-lg overflow-hidden shadow hover:shadow-lg transition"
                            >
                                <img
                                    src={item.anime.imageUrl}
                                    alt={item.anime.title}
                                    className="w-full h-90 object-cover rounded-lg"
                                />
                                <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white px-3 py-2 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-in-out rounded-b-lg">
                                    <h2 className="text-sm font-semibold truncate">{item.anime.title}</h2>
                                    <p className="text-xs">⭐ {item.anime.score ?? "N/A"}</p>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default AnimeListPage;
