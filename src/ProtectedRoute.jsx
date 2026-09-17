import { Navigate } from "react-router";

export default function ProtectedRoute({
    children,
    allowedRoles = [],
}) {
    const token = localStorage.getItem("token");

    const userString = localStorage.getItem("user");

    let user = null;

    try {
        user = userString ? JSON.parse(userString) : null;
    } catch (error) {
        user = null;
    }

    // Not logged in
    if (!token || !user) {
        return <Navigate to="/" replace />;
    }

    // Role check
    if (
        allowedRoles.length > 0 &&
        !allowedRoles.includes(user.role_id)
    ) {
        return <Navigate to="/home" replace />;
    }

    return children;
}