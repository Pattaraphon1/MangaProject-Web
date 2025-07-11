import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

function MangaItem() {
  const { id } = useParams();
  const [manga, setManga] = useState({});
  const [characters, setCharacters] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [characterPics, setCharacterPics] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [coverPics, setCoverPics] = useState([]);

  useEffect(() => {
    const fetchManga = async () => {
      try {
        const res = await fetch(`https://api.jikan.moe/v4/manga/${id}`);
        const data = await res.json();
        setManga(data.data);
      } catch (error) {
        console.error("Error fetching manga:", error);
      }
    };


    const fetchCharacters = async () => {
      try {
        const res = await fetch(`https://api.jikan.moe/v4/manga/${id}/characters`);
        const data = await res.json();
        setCharacters(data.data);
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };

    const fetchCoverPics = async () => {
      try {
        const res = await fetch(`https://api.jikan.moe/v4/manga/${id}/pictures`);
        const data = await res.json();
        setCoverPics(data.data); // มีหลายภาพของ manga เล่มนั้น
      } catch (err) {
        console.error("Error fetching covers:", err);
      }
    };

    fetchManga();
    fetchCharacters();
    fetchCoverPics();
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
    title,
    synopsis,
    images,
    rank,
    score,
    popularity,
    authors,
    serialization,
    chapters,
    volumes,
    published,
    type,
    status
  } = manga;

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
            <p><strong>Type:</strong> {type}</p>
            <p><strong>Status:</strong> {status}</p>
            <p><strong>Volumes:</strong> {volumes || "N/A"}</p>
            <p><strong>Chapters:</strong> {chapters || "N/A"}</p>
            <p><strong>Start Date:</strong> {published?.from?.split("T")[0]}</p>
            <p><strong>End Date:</strong> {published?.to?.split("T")[0]}</p>
            <p><strong>Serialization:</strong> {serialization?.[0]?.name || "N/A"}</p>
            <p><strong>Author:</strong> {authors?.[0]?.name || "Unknown"}</p>
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
            <p><strong>Score:</strong> {score ?? "N/A"}</p>
            <p><strong>Rank:</strong> #{rank ?? "N/A"}</p>
            <p><strong>Popularity:</strong> #{popularity ?? "N/A"}</p>
          </div>

          <div className="my-6">
            <h2 className="text-xl font-semibold mb-2">Covers & Illustrations</h2>
            <div className="flex overflow-x-auto space-x-3 p-2">
              {coverPics.length > 0 ? coverPics.map((pic, idx) => (
                <img
                  key={idx}
                  src={pic.webp?.image_url || pic.jpg?.image_url}
                  alt={`Cover ${idx + 1}`}
                  className="h-48 rounded-md object-cover flex-shrink-0"
                />
              )) : (
                <p className="text-gray-500">No covers available.</p>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Characters</h2>
            {characters.length === 0 ? (
              <p className="text-gray-500">No characters available.</p>
            ) : (
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
                    </div>
                  </div>
                ))}
              </div>
            )}
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

export default MangaItem;
