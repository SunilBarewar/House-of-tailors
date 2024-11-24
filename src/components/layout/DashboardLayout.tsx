import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Card } from "../ui/card";
import { useAuthStore } from "@/stores";

const DashboardLayout = () => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="bg-neutral-50 h-screen w-full flex flex-col justify-between">
      <Navbar />
      <Card className="w-full rounded-none !h-[calc(100vh-var(--navbar-height)-8px)] overflow-hidden">
        <Outlet />
      </Card>
    </div>
  );
};

export default DashboardLayout;
