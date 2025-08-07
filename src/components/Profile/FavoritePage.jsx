import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import useAuthStore from "../../store/auth-store";

const FavoritePage = () => {
    const [favorites, setFavorites] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const res = await fetch("http://localhost:8899/api/favorite", {
                    headers: {
                        Authorization: `Bearer ${useAuthStore.getState().token}`,
                    },
                });
                const data = await res.json();
                setFavorites(data);
            } catch (err) {
                console.error("Error fetching favorites:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, []);

    const favoriteAnime = favorites.filter(
        (fav) => fav.anime && fav.anime.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const favoriteManga = favorites.filter(
        (fav) => fav.manga && fav.manga.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="min-h-screen w-full bg-[#fdf6ef] py-10 px-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center">My Favorites</h1>

                {/* Search bar */}
                <div className="mb-10 max-w-md mx-auto">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search anime or manga..."
                        className="w-full px-4 py-2 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c88a50]"
                    />
                </div>

                {/* Favorite Anime */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4 text-[#5a4633]">Favorite Anime</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
                        {favoriteAnime.length === 0 ? (
                            <p className="col-span-full text-gray-600">No matching anime found.</p>
                        ) : (
                            favoriteAnime.map((fav) => (
                                <Link
                                    to={`/anime/${fav.anime.malId}`}
                                    key={fav.id}
                                    className="relative group rounded-lg overflow-hidden shadow hover:shadow-lg transition"
                                >
                                    <img
                                        src={fav.anime.imageUrl}
                                        alt={fav.anime.title}
                                        className="w-full h-90 object-cover rounded-lg"
                                    />
                                    <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white px-3 py-2 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-in-out rounded-b-lg">
                                        <h2 className="text-sm font-semibold truncate">{fav.anime.title}</h2>
                                        <p className="text-xs">⭐ {fav.anime.score ?? "N/A"}</p>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </section>

                {/* Favorite Manga */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4 text-[#5a4633]">Favorite Manga</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
                        {favoriteManga.length === 0 ? (
                            <p className="col-span-full text-gray-600">No matching manga found.</p>
                        ) : (
                            favoriteManga.map((fav) => (
                                <Link
                                    to={`/manga/${fav.manga.malId}`}
                                    key={fav.id}
                                    className="relative group rounded-lg overflow-hidden shadow hover:shadow-lg transition"
                                >
                                    <img
                                        src={fav.manga.imageUrl}
                                        alt={fav.manga.title}
                                        className="w-full h-90 object-cover rounded-lg"
                                    />
                                    <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white px-3 py-2 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-in-out rounded-b-lg">
                                        <h2 className="text-sm font-semibold truncate">{fav.manga.title}</h2>
                                        <p className="text-xs">⭐ {fav.manga.score ?? "N/A"}</p>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default FavoritePage;
