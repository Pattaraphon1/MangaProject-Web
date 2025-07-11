// src/routes/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router";
import useAuthStore from "../store/auth-store";


function ProtectedRoute() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
}

export default ProtectedRoute;
