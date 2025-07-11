import { Navigate, Outlet } from "react-router";
import useAuthStore from "../store/auth-store";


function GuestRoute() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return isLoggedIn ? <Navigate to="/users" replace /> : <Outlet />;
}

export default GuestRoute;
