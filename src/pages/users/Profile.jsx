import React, { useEffect, useState } from "react";
import ProfileHeader from "../../components/ProfileHeader";
import ProfileNavbar from "../../components/Navbar/ProfileNav";
import EditProfileModal from "../../components/EditProfileModal";
import useAuthStore from "../../store/auth-store";
import FavoritePage from "../../components/Profile/FavoritePage";
import MangaListPage from "../../components/Profile/MangaListPage";
import AnimeListPage from "../../components/Profile/AnimeListPage";


const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("anime");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {fetchCurrentUser} = useAuthStore();

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
  fetchCurrentUser();
}, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <ProfileHeader onEditClick={handleEditClick} />

      <ProfileNavbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="p-4">
        {activeTab === "anime" && <AnimeListPage/>}
        {activeTab === "manga" && <MangaListPage />}
        {activeTab === "favorite" && <FavoritePage />}
      </div>

      {/* Modal แก้ไขโปรไฟล์ */}
      <EditProfileModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default ProfilePage;
