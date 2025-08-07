import { Navigate, Outlet } from "react-router";
import useAuthStore from "../store/auth-store";

function AdminRoute() {
    const { user } = useAuthStore();

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (user.role !== "ADMIN") {
        return <Navigate to="/anime" />;
    }

    return <Outlet />;
}

export default AdminRoute;
