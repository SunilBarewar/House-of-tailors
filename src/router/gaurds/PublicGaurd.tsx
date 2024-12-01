import { pathNames } from "@/constants/pathname";
import { useAuthStore } from "@/stores";
import { Navigate, Outlet } from "react-router-dom";

const PublicGaurd = () => {
  const user = useAuthStore((state) => state.user);

  return user ? <Navigate to={pathNames.CONVERSATIONS} /> : <Outlet />;
};

export default PublicGaurd;
