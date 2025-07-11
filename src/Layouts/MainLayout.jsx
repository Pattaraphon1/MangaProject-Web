// src/layouts/MainLayout.jsx
import { Outlet } from "react-router";
import GuestNav from "../components/Navbar/GuestNav";
import UsersNav from "../components/Navbar/UsersNav";
import useAuthStore from "../store/auth-store";


function MainLayout() {
  const { isLoggedIn } = useAuthStore();

  return (
    <div>
      {isLoggedIn ? <UsersNav /> : <GuestNav />}
      <Outlet />
    </div>
  );
}

export default MainLayout;
