// src/layouts/MainLayout.jsx
import { Outlet } from "react-router";
import GuestNav from "../components/Navbar/GuestNav";
import UsersNav from "../components/Navbar/UsersNav";
import useAuthStore from "../store/auth-store";
import { ToastContainer } from "react-toastify";

function MainLayout() {
  const { isLoggedIn } = useAuthStore();

  return (
    <div>
      {isLoggedIn ? <UsersNav /> : <GuestNav />}
      <Outlet />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default MainLayout;
