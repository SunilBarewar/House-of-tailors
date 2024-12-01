import { useAuthStore } from "@/stores";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = () => {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default RequireAuth;
