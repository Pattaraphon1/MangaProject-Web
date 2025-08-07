import { Link, NavLink, useNavigate } from 'react-router'
import HomeIcon from '../../icons'
import useAuthStore from '../../store/auth-store';
import useUserStore from '../../store/user-store';

function UsersNav() {
  const logout = useAuthStore((state) => state.logout);
  const isAdmin = useAuthStore((state) => state.isAdmin)
  const resetUserStore = useUserStore((state)=> state.resetUserStore);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    resetUserStore();
    navigate("/login");
  };


  return (
    <div className="flex items-center justify-center bg-[#DAB98A] text-black px-2 py-2 h-13 gap-35">

      <div className="flex gap-4">
        <Link to="/" className="w-9"><HomeIcon /></Link>
      </div>

      <div className="flex gap-4">
        <NavLink to="/manga" className="hover:text-[#0000ff]">Manga</NavLink>
        <NavLink to="/anime" className="hover:text-[#0000ff]">Anime</NavLink>
        <NavLink to="/news" className="hover:text-[#0000ff]">News</NavLink>
      </div>

      <div className="flex items-center gap-4">
        <NavLink to="/users" className="hover:text-[#0000ff]">Profile</NavLink>

        {isAdmin && <NavLink to="/admin-anime" className="hover:text-[#0000ff]">Admin</NavLink>}
        <button onClick={handleLogout} className="bg-white text-black rounded-md p-2
    hover:bg-gray-300 hover:scale-105 hover:cursor-pointer hover:duration-300">
          Logout
        </button>
      </div>

    </div>
  )
}

export default UsersNav