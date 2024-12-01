import { useAuthStore } from "@/stores";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = () => {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();
  console.log("user logged in", user);

  const GoToLoginPage = () => {
    console.log("GoToLoginPage");
    return <Navigate to="/login" state={{ from: location }} />;
  };
  return user ? <Outlet /> : <GoToLoginPage />;
};

export default RequireAuth;
