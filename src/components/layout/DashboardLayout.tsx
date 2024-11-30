import { Navigate, Outlet } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useAuthStore } from "@/stores";
import Navbar from "../shared/Navbar";

const DashboardLayout = () => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="bg-neutral-50 h-screen w-full flex flex-col justify-between">
      <Navbar />
      <Card className="w-full rounded-none !h-[calc(100vh-var(--navbar-height))] overflow-hidden">
        <Outlet />
      </Card>
    </div>
  );
};

export default DashboardLayout;
