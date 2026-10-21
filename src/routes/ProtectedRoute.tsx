import { Navigate, Outlet, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
    user: string | null;
}

export default function ProtectedRoute({ user }: ProtectedRouteProps) {
    const location = useLocation();

    if (!user) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return <Outlet />;
}