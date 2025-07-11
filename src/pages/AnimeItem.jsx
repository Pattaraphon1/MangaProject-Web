import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

function AnimeItem() {
  const { id } = useParams();
  const [anime, setAnime] = useState({});
  const [characters, setCharacters] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [characterPics, setCharacterPics] = useState([]);
  const [animeRelations, setAnimeRelations] = useState([]);
  const [mangaRelations, setMangaRelations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
        const data = await res.json();
        setAnime(data.data);
      } catch (error) {
        console.error("Error fetching anime:", error);
      }
    };

    const fetchCharacters = async () => {
      try {
        const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/characters`);
        const data = await res.json();
        setCharacters(data.data);
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };

    const fetchRelationsWithImages = async () => {
      try {
        const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/relations`);
        const data = await res.json();

        const grouped = {
          anime: [],
          manga: [],
        };

        for (const group of data.data) {
          const entriesWithImages = await Promise.all(
            group.entry.map(async (entry) => {
              try {
                const detailRes = await fetch(`https://api.jikan.moe/v4/${entry.type.toLowerCase()}/${entry.mal_id}`);
                const detailData = await detailRes.json();
                return {
                  ...entry,
                  image_url: detailData.data.images?.jpg?.image_url || null,
                  type: entry.type,
                  relation: group.relation,
                };
              } catch {
                return null;
              }
            })
          );

          const filtered = entriesWithImages.filter(e => e && e.image_url);

          if (grouped.anime && group.entry[0]?.type === "anime") {
            grouped.anime.push(...filtered);
          } else if (grouped.manga && group.entry[0]?.type === "manga") {
            grouped.manga.push(...filtered);
          }
        }

        setAnimeRelations(grouped.anime);
        setMangaRelations(grouped.manga);

      } catch (err) {
        console.error("Error fetching relations:", err);
      }
    };


    fetchAnime();
    fetchCharacters();
    fetchRelationsWithImages();
  }, [id]);

  const openCharacterModal = async (char) => {
    try {
      const [infoRes, picsRes] = await Promise.all([
        fetch(`https://api.jikan.moe/v4/characters/${char.mal_id}`),
        fetch(`https://api.jikan.moe/v4/characters/${char.mal_id}/pictures`)
      ]);
      const info = await infoRes.json();
      const pics = await picsRes.json();
      setSelectedCharacter(info.data);
      setCharacterPics(pics.data); // ใช้ภาพจาก endpoint จริง :contentReference[oaicite:1]{index=1}
      setIsModalOpen(true);
      console.log("Selected character:", selectedCharacter);
      console.log("Character pics:", characterPics);
    } catch (err) {
      console.error(err);
    }
  };

  const {
    title, synopsis, trailer, duration, aired, season, images, rank,
    score, scored_by, popularity, status, rating, source
  } = anime;

  return (
    <div className="min-h-screen bg-[#e8caa0] text-[#101827] px-6 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1">
          <img
            src={images?.jpg?.large_image_url}
            alt={title}
            className="rounded-xl shadow-lg w-full"
          />
          <div className="mt-6 space-y-2 text-sm">
            <p><strong>Format:</strong> TV</p>
            <p><strong>Episodes:</strong> {anime.episodes || "N/A"}</p>
            <p><strong>Duration:</strong> {duration}</p>
            <p><strong>Status:</strong> {status}</p>
            <p><strong>Start Date:</strong> {aired?.from?.split("T")[0]}</p>
            <p><strong>End Date:</strong> {aired?.to?.split("T")[0]}</p>
            <p><strong>Season:</strong> {season}</p>
            <p><strong>Rating:</strong> {rating}</p>
            <p><strong>Source:</strong> {source}</p>
          </div>
        </div>

        <div className="col-span-3">
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <p className="text-[#101827] text-sm mb-6">
            {showMore ? synopsis : synopsis?.substring(0, 350) + "..."}
            <button
              onClick={() => setShowMore(!showMore)}
              className="ml-2 text-blue-700 transition-all duration-500 
             hover:text-transparent hover:bg-gradient-to-r 
             hover:from-blue-800 hover:to-blue-400 hover:bg-clip-text"
            >
              {showMore ? "Show Less" : "Read More"}
            </button>
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-6">
            <p><strong>Score:</strong> {score}</p>
            <p><strong>Rank:</strong> #{rank}</p>
            <p><strong>Popularity:</strong> #{popularity}</p>
            <p><strong>Rated By:</strong> {scored_by}</p>
          </div>

          {(animeRelations.length > 0 || mangaRelations.length > 0) && (
            <div className="mb-10">
              <h2 className="text-xl font-bold mb-3">Related Works</h2>
              <div className="flex flex-wrap gap-6">
                {/* Anime Section */}
                {animeRelations.length > 0 && (
                  <div>
                    <p className="text-sm font-semibold mb-2 text-gray-700">Anime</p>
                    <div className="flex flex-wrap gap-4">
                      {animeRelations.map((entry) => (
                        <a
                          key={`anime-${entry.mal_id}`}
                          href={`/anime/${entry.mal_id}`}
                          className="w-24"
                          title={entry.name}
                        >
                          <img
                            src={entry.image_url}
                            alt={entry.name}
                            className="rounded-lg shadow-md w-full h-36 object-cover hover:scale-105 transition"
                          />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Manga Section */}
                {mangaRelations.length > 0 && (
                  <div>
                    <p className="text-sm font-semibold mb-2 text-gray-700">Manga</p>
                    <div className="flex flex-wrap gap-4">
                      {mangaRelations.map((entry) => (
                        <a
                          key={`manga-${entry.mal_id}`}
                          href={`/manga/${entry.mal_id}`}
                          className="w-24"
                          title={entry.name}
                        >
                          <img
                            src={entry.image_url}
                            alt={entry.name}
                            className="rounded-lg shadow-md w-full h-36 object-cover hover:scale-105 transition"
                          />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}




          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Trailer</h2>
            {trailer?.embed_url ? (
              <iframe
                src={trailer.embed_url}
                title="Anime Trailer"
                allowFullScreen
                className="w-full h-[400px] rounded-lg"
              />
            ) : (
              <p className="text-gray-400">Trailer not available.</p>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Characters</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {characters.slice(0, 12).map((char) => (
                <div
                  onClick={() => openCharacterModal(char.character)}
                  key={char.character.mal_id} className="flex items-start space-x-3 bg-[#1f2937] p-3 rounded-lg cursor-pointer hover:scale-105 transition">
                  <img
                    src={char.character.images?.jpg?.image_url}
                    alt={char.character.name}
                    className="w-14 h-20 object-cover rounded-md"
                  />
                  <div className="text-sm">
                    <p className="font-medium text-white">{char.character.name}</p>
                    <p className="text-gray-400">{char.role}</p>
                    <p className="text-gray-500 text-xs">
                      {char.voice_actors?.[0]?.name ?? "Unknown"} ({char.voice_actors?.[0]?.language ?? ""})
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
      {isModalOpen && selectedCharacter && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">{selectedCharacter.name}</h2>
              <button className="cursor-pointer" onClick={() => setIsModalOpen(false)}>✕</button>
            </div>

            {/* Carousel รูปจริง */}
            <div className="flex overflow-x-auto space-x-2 p-4">
              {characterPics.length > 0 ? (
                characterPics.map((pic, i) => (
                  <img
                    key={i}
                    src={pic.jpg?.image_url || pic.webp?.image_url}
                    alt={`Character pic ${i + 1}`}
                    className="h-40 rounded-md object-cover"
                  />
                ))
              ) : (
                <img
                  src={selectedCharacter.images?.jpg?.image_url}
                  alt={selectedCharacter.name}
                  className="h-40 rounded-md mx-auto"
                />
              )}
            </div>


            {/* ข้อมูลสั้น ๆ */}
            <div className="p-4 text-sm text-gray-700">
              <p><strong>Kanji:</strong> {selectedCharacter.name_kanji || "-"}</p>
              <p><strong>Favorites:</strong> {selectedCharacter.favorites ?? "–"}</p>
              <p><strong>Role:</strong> {selectedCharacter.nicknames?.[0] || "-"}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AnimeItem;
