import React from "react";

const ProfileNav = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-center bg-[#DAB98A] text-black px-4 py-2 gap-6">
      {["anime", "manga", "favorite"].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 rounded ${
            activeTab === tab
              ? "bg-white text-[#DAB98A] font-semibold"
              : "hover:bg-[#caa76d] hover:text-white transition"
          }`}
        >
          {tab === "anime" && "Anime List"}
          {tab === "manga" && "Manga List"}
          {tab === "favorite" && "Favorite"}
        </button>
      ))}
    </div>
  );
};

export default ProfileNav;
