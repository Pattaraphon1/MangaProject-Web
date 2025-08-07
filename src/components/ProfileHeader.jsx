import React from "react";
import useUserStore from "../store/user-store";
import useAuthStore from "../store/auth-store";

const ProfileHeader = ({ onEditClick }) => {
//   const  currentUser  = useUserStore((state)=> state.currentUser);
  const user = useAuthStore((state)=>state.user)
  const currentUser = useAuthStore((state)=>state.currentUser)

//   const user = currentUser || { username: "Loading...", profilePic: "" };

  return (
    <div className="flex items-center justify-between bg-[#f5e4c6] p-4 rounded-t-lg">
      <div className="flex items-center gap-4">
        <img
          src={"/src/assets/narutosvg.png"}
          alt="Profile"
          className="w-14 h-14 rounded-full object-cover"
        />
        <div className="text-lg font-semibold">{currentUser?.username || user?.username}</div>
      </div>
      <button
        onClick={onEditClick}
        className="bg-[#a26e3f] text-white px-4 py-2 rounded hover:bg-[#864f2d]"
      >
        Edit Profile
      </button>
    </div>
  );
};

export default ProfileHeader;
