import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import useAuthStore from "../../store/auth-store";

const MangaListPage = () => {
    const [mangaList, setMangaList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyMangaList = async () => {
            try {
                const res = await fetch("http://localhost:8899/api/mylist/manga", {
                    headers: {
                        Authorization: `Bearer ${useAuthStore.getState().token}`,
                    },
                });
                const data = await res.json();
                setMangaList(data);
            } catch (err) {
                console.error("Error fetching my manga list:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchMyMangaList();
    }, []);

    const filteredManga = mangaList.filter((item) =>
        item.manga?.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="min-h-screen w-full bg-[#fdf6ef] py-10 px-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center text-[#333]">My Manga List</h1>

                {/* Search Bar */}
                <div className="mb-10 max-w-md mx-auto">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search manga..."
                        className="w-full px-4 py-2 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c88a50]"
                    />
                </div>

                {/* Manga List */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
                    {filteredManga.length === 0 ? (
                        <p className="col-span-full text-gray-600">No matching manga found.</p>
                    ) : (
                        filteredManga.map((item) => (
                            <Link
                                to={`/manga/${item.manga.malId}`}
                                key={item.id}
                                className="relative group rounded-lg overflow-hidden shadow hover:shadow-lg transition"
                            >
                                <img
                                    src={item.manga.imageUrl}
                                    alt={item.manga.title}
                                    className="w-full h-90 object-cover rounded-lg"
                                />
                                <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white px-3 py-2 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-in-out rounded-b-lg">
                                    <h2 className="text-sm font-semibold truncate">{item.manga.title}</h2>
                                    <p className="text-xs">⭐ {item.manga.score ?? "N/A"}</p>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default MangaListPage;
