import { Link, NavLink, useNavigate } from 'react-router'
import HomeIcon from '../../icons'
import useAuthStore from '../../store/auth-store';

function UsersNav() {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();               // ออกจากระบบ Zustand
    navigate("/login");     // กลับหน้า Login
  };

  return (
    <div className="flex items-center justify-center bg-[#DAB98A] text-black px-2 py-2 h-13 gap-35">

      <div className="flex gap-4">
        <Link to="/" className="w-9"><HomeIcon /></Link>
      </div>

      <div className="flex gap-4">
        <NavLink to="/manga">Manga</NavLink>
        <NavLink to="/anime">Anime</NavLink>
        <NavLink to="/news">News</NavLink>
      </div>

      <div className="flex items-center gap-4">
        <NavLink to="/users">Profile</NavLink>
        <button onClick={handleLogout} className="bg-white text-black rounded-md p-2
    hover:bg-gray-300 hover:scale-105 hover:cursor-pointer hover:duration-300">
          Logout
        </button>
      </div>

    </div>
  )
}

export default UsersNav